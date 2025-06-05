import {
  ArrowLeft,
  Clock,
  Copy,
  Download,
  Edit,
  EyeIcon,
  Share2,
  Trash2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import { PageLoading } from "@/components/PageLoading";
import { Skeleton } from "@/components/Skeleton";
import { useDeleteProject, useDuplicateProject, useProject } from "@/hooks/api";
import { useToast } from "@/hooks/useToast";
import { formatDuration } from "@/lib/utils";
import {
  ProjectProgressLabels,
  ProjectStatus,
  ProjectStatusColors,
  ProjectStatusLabels,
} from "@/types";

// Check component for showing completed steps
const Check = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: project, isLoading } = useProject(projectId || "");
  const deleteProjectMutation = useDeleteProject();
  const duplicateProjectMutation = useDuplicateProject();

  const handleDeleteProject = () => {
    if (!projectId) return;

    // Using a confirmation dialog before deleting
    const confirmDelete = () => {
      deleteProjectMutation.mutate(projectId, {
        onSuccess: () => {
          toast({
            title: "Project deleted",
            description: "The project has been deleted successfully",
          });
          navigate("/");
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to delete the project. Please try again.",
            variant: "destructive",
          });
        },
      });
    };

    // TODO: Replace with a proper confirmation dialog component
    // eslint-disable-next-line no-alert
    if (window.confirm("Are you sure you want to delete this project?")) {
      confirmDelete();
    }
  };

  const handleDuplicateProject = () => {
    if (!projectId || !project) return;

    duplicateProjectMutation.mutate(project);
  };

  if (project?.status === "pending") {
    return (
      <PageLoading
        text={
          project.progress
            ? `${ProjectProgressLabels[project.progress]}...`
            : "Your video is in queue"
        }
      />
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="py-12 text-center">
          <p className="text-lg text-gray-500">Project not found</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate("/")}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="mr-4"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <div className="mt-2 flex items-center gap-3">
            <Badge size="sm" variant={ProjectStatusColors[project.status]}>
              {ProjectStatusLabels[project.status]}
            </Badge>
          </div>
        </div>
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDuplicateProject}>
                <Copy size={16} className="mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500"
                onClick={handleDeleteProject}
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Video Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Render video preview based on project state */}
              {project.status === ProjectStatus.COMPLETED &&
                project.outputUrl && (
                  <div className="aspect-video overflow-hidden rounded-lg bg-black">
                    <video
                      src={project.outputUrl}
                      controls
                      autoPlay
                      className="h-full w-full"
                    >
                      <track kind="captions" src="" label="English" />
                    </video>
                  </div>
                )}

              {/* Show source video if available and project is not complete or has no output URL */}
              {(project.status !== ProjectStatus.COMPLETED ||
                !project.outputUrl) &&
                (project.sourceUrl || project.sourceFile) && (
                  <div className="aspect-video overflow-hidden rounded-lg bg-black">
                    <video
                      src={project.sourceUrl || project.sourceFile}
                      controls
                      autoPlay
                      className="h-full w-full"
                    >
                      <track kind="captions" src="" label="English" />
                    </video>
                  </div>
                )}

              {/* Show placeholder when no video is available */}
              {!project.outputUrl &&
                !project.sourceUrl &&
                !project.sourceFile && (
                  <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-100">
                    <p className="text-gray-500">Video preview not available</p>
                  </div>
                )}
            </CardContent>
            {project.status === ProjectStatus.COMPLETED && (
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" asChild>
                  <a
                    href={project.sourceUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                  >
                    <EyeIcon size={16} className="mr-2" />
                    Original
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={project.outputUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Download size={16} className="mr-2" />
                    Download
                  </a>
                </Button>
                <Button variant="outline">
                  <Share2 size={16} className="mr-2" />
                  Share
                </Button>
              </CardFooter>
            )}
          </Card>

          {project.transcription && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Transcription</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    navigate(`/project/${projectId}/transcription`)
                  }
                >
                  <Edit size={16} className="mr-2" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent>
                <div className="max-h-[300px] overflow-y-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4">
                  <ReactMarkdown>{project.transcription.text}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Source</h3>
                <p className="mt-1">
                  {project.sourceType.charAt(0).toUpperCase() +
                    project.sourceType.slice(1)}
                </p>
              </div>

              {project.originalDuration && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Original Duration
                  </h3>
                  <p className="mt-1 flex items-center">
                    <Clock size={16} className="mr-2" />
                    {formatDuration(project.originalDuration)}
                  </p>
                </div>
              )}

              {project.generatedDuration && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Generated Duration
                  </h3>
                  <p className="mt-1 flex items-center">
                    <Clock size={16} className="mr-2" />
                    {formatDuration(project.generatedDuration)}
                  </p>
                </div>
              )}

              {project.presenterSettings && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Presenter
                  </h3>
                  <p className="mt-1">
                    {project.presenterSettings.type === "ai" ? "AI" : "Human"}{" "}
                    Presenter
                  </p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Output Settings
                </h3>
                <div className="mt-1 space-y-1">
                  <p>Resolution: 1920x1080</p>
                  <p>Aspect Ratio: 16:9</p>
                  <p>Format: MP4</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Workflow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                    <Check size={16} />
                  </div>
                  <div>
                    <p className="font-medium">Video Source</p>
                    <p className="text-sm text-gray-500">
                      Video uploaded or URL provided
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div
                    className={`h-8 w-8 rounded-full ${project.transcription ? "bg-green-500 text-white" : "bg-gray-200"} mr-3 flex items-center justify-center`}
                  >
                    {project.transcription ? <Check size={16} /> : "2"}
                  </div>
                  <div>
                    <p
                      className={`font-medium ${!project.transcription && "text-gray-500"}`}
                    >
                      Transcription
                    </p>
                    <p className="text-sm text-gray-500">
                      {project.transcription
                        ? "Transcription generated"
                        : "Pending transcription"}
                    </p>
                  </div>
                  {project.transcription && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto"
                      onClick={() =>
                        navigate(`/project/${projectId}/transcription`)
                      }
                    >
                      Edit
                    </Button>
                  )}
                </div>

                <div className="flex items-center">
                  <div
                    className={`h-8 w-8 rounded-full ${project.status === ProjectStatus.COMPLETED ? "bg-green-500 text-white" : "bg-gray-200"} mr-3 flex items-center justify-center`}
                  >
                    {project.status === ProjectStatus.COMPLETED ? (
                      <Check size={16} />
                    ) : (
                      "5"
                    )}
                  </div>
                  <div>
                    <p
                      className={`font-medium ${project.status !== ProjectStatus.COMPLETED && "text-gray-500"}`}
                    >
                      Video Generation
                    </p>
                    <p className="text-sm text-gray-500">
                      {(() => {
                        if (project.status === ProjectStatus.COMPLETED) {
                          return "Video generated successfully";
                        }

                        return "Generate final video";
                      })()}
                    </p>
                  </div>
                  {project.outputSettings &&
                    project.status !== ProjectStatus.COMPLETED && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto"
                        onClick={() =>
                          navigate(`/project/${projectId}/output-settings`)
                        }
                      >
                        Generate
                      </Button>
                    )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Check component moved to the top of the file

export default ProjectDetail;
