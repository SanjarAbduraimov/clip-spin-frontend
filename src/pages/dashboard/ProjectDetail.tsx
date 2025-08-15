import {
  ArrowLeft,
  Copy,
  Download,
  EyeIcon,
  Share2,
  Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { errorMessages } from "@/modules/project/constants";
import { getProjectStatusLabel } from "@/modules/project/libs/getProjectStatusLabel";

import { useAuthContext } from "@/auth/hooks/useAuthContext";
import { AuthUserType, Roles } from "@/auth/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/Alert";
import { Badge } from "@/components/Badge";
import { Button, IconButton } from "@/components/Button";
import { Card, CardContent, CardFooter } from "@/components/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import { PageLoading } from "@/components/PageLoading";
import { Skeleton } from "@/components/Skeleton";
import { useDeleteProject, useDuplicateProject, useProject } from "@/hooks/api";
import { useShareProject } from "@/hooks/useShareProject";
import { useToast } from "@/hooks/useToast";
import {
  Project,
  ProjectProgress,
  ProjectProgressLabels,
  ProjectStatus,
  ProjectStatusColors,
  ProjectType,
  ProjectTypeLabels,
} from "@/types";

import { SelectScript } from "./SelectScript";
import { UploadVideoDialog } from "./UploadVideoDialog";
import { Workflow } from "./Workflow";

const initialLoadingProjectProgressStatuses = [
  ProjectProgress.FETCHING_INPUT,
  ProjectProgress.INPUT_FETCHED,
];

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { user } = useAuthContext();

  const { data: project, isLoading } = useProject(projectId || "");
  const deleteProjectMutation = useDeleteProject();
  const duplicateProjectMutation = useDuplicateProject();
  const { shareProject } = useShareProject();

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

  if (
    project?.status === ProjectStatus.IN_PROGRESS &&
    initialLoadingProjectProgressStatuses.includes(project.progress)
  ) {
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

  if (!user) {
    navigate("/auth/sign-in");
    return null;
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
    <div className="container mx-auto max-w-[960px] px-4">
      <Card className="my-8">
        <CardContent className="p-4 md:p-6">
          <div className="mb-8 flex flex-col items-start gap-2 md:flex-row">
            <IconButton
              variant="ghost"
              size="sm"
              className="mr-2"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={16} />
            </IconButton>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">{project.name}</h1>
                <Badge className="whitespace-nowrap">
                  {ProjectTypeLabels[project.type]}
                </Badge>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <Badge
                  className="whitespace-nowrap"
                  size="sm"
                  variant={ProjectStatusColors[project.status]}
                >
                  {getProjectStatusLabel(project)}
                </Badge>
              </div>
            </div>
            <div className="md:ml-auto">
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

          <Workflow project={project} />

          {project.status === ProjectStatus.FAILED && (
            <Alert className="mt-8" variant="destructive">
              <AlertTitle>Video not generated</AlertTitle>
              <AlertDescription>
                {errorMessages[project.errorCause]}
              </AlertDescription>
            </Alert>
          )}

          {project.status !== ProjectStatus.FAILED && (
            <div className="mt-8 flex flex-col gap-8 md:flex-row">
              <div className="shrink-0">
                <div className="mb-6">
                  <h3 className="mb-4 text-xl font-semibold">
                    {project.outputUrl ? "Generated Video" : "Original Video"}
                  </h3>
                  <div>
                    <div className="mx-auto max-w-[400px] overflow-hidden rounded-lg bg-black">
                      <div className="aspect-[9/16] overflow-hidden">
                        {project.sourceType === "youtube" &&
                        !project.outputUrl ? (
                          <iframe
                            src={project.source?.replace("shorts", "embed")}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="YouTube video player"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <video
                            src={getVideoUrl(project)}
                            controls
                            autoPlay
                            className="h-full w-full object-cover"
                          >
                            <track kind="captions" src="" label="English" />
                          </video>
                        )}
                      </div>
                    </div>
                  </div>
                  {project.status === ProjectStatus.COMPLETED && (
                    <CardFooter className="mt-4 grid grid-cols-3 gap-2">
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
                      <Button
                        variant="outline"
                        onClick={() => shareProject(project)}
                      >
                        <Share2 size={16} className="mr-2" />
                        Share
                      </Button>
                    </CardFooter>
                  )}
                </div>
              </div>

              <div className="grow">
                {checkEditTranscriptionButtonVisibility(project) ? (
                  <SelectScript project={project} />
                ) : (
                  project.selectedIdea && (
                    <Alert className="mt-4 bg-bg-quaternary">
                      <div className="mb-2 flex items-baseline justify-between">
                        <AlertTitle className="text-lg">Script</AlertTitle>
                      </div>
                      {project.selectedIdea}
                      {checkUploadButtonVisibility(project, user) && (
                        <UploadVideoDialog
                          project={project}
                          button={
                            <Button
                              className="ml-auto mt-2 block"
                              variant="outline"
                            >
                              Upload Video
                            </Button>
                          }
                        />
                      )}
                    </Alert>
                  )
                )}

                {/* Optimized Copy Section */}
                {project.status === ProjectStatus.COMPLETED &&
                  project.optimizedCopy && (
                    <Alert className="mt-4 bg-bg-quaternary">
                      <div className="mb-2 flex items-baseline justify-between">
                        <AlertTitle className="text-lg">
                          Optimized Copy
                        </AlertTitle>
                        <IconButton
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(project.optimizedCopy || "");
                            toast({
                              title: "Copied!",
                              description: "Optimized copy has been copied to clipboard",
                            });
                          }}
                        >
                          <Copy size={16} />
                        </IconButton>
                      </div>
                      <div className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                        {project.optimizedCopy}
                      </div>
                    </Alert>
                  )}

                {/* Hashtags Section */}
                {project.status === ProjectStatus.COMPLETED &&
                  project.hashtags &&
                  project.hashtags.trim().length > 0 && (
                    <Alert className="mt-4 bg-bg-quaternary">
                      <div className="mb-2 flex items-baseline justify-between">
                        <AlertTitle className="text-lg">Hashtags</AlertTitle>
                        <IconButton
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const hashtagsText = project.hashtags
                              ?.split(/[\s,#]+/)
                              .filter((hashtag) => hashtag.trim().length > 0)
                              .map((hashtag) => `#${hashtag.trim()}`)
                              .join(" ");
                            navigator.clipboard.writeText(hashtagsText || "");
                            toast({
                              title: "Copied!",
                              description: "Hashtags have been copied to clipboard",
                            });
                          }}
                        >
                          <Copy size={16} />
                        </IconButton>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.hashtags
                          .split(/[\s,#]+/)
                          .filter((hashtag) => hashtag.trim().length > 0)
                          .map((hashtag) => (
                            <Badge
                              key={hashtag}
                              variant="outline"
                              className="border-blue-300 bg-blue-50 text-blue-600 dark:border-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                            >
                              #{hashtag.trim()}
                            </Badge>
                          ))}
                      </div>
                    </Alert>
                  )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

function checkEditTranscriptionButtonVisibility(project: Project): boolean {
  if (project.selectedIdea) {
    return false;
  }

  if (project.status === ProjectStatus.COMPLETED) {
    return false;
  }

  if (project.progress === ProjectProgress.INPUT_ANALYZED) {
    return true;
  }

  return false;
}

// function checkGenerateVideoButtonVisibility(project: Project): boolean {
//   if (
//     project.progress === ProjectProgress.INPUT_ANALYZED &&
//     project.type !== ProjectType.professional
//   ) {
//     return true;
//   }

//   return false;
// }

function getVideoUrl(project: Project) {
  if (project.status === ProjectStatus.COMPLETED) {
    return project.outputUrl;
  }

  return project.sourceUrl;
}

function checkUploadButtonVisibility(
  project: Project,
  user: AuthUserType,
): boolean {
  if (project.status === ProjectStatus.COMPLETED) {
    return false;
  }

  if (
    project.progress === ProjectProgress.INPUT_ANALYZED &&
    project.type === ProjectType.professional &&
    user.role === Roles.ADMIN
  ) {
    return true;
  }

  return false;
}

// Check component moved to the top of the file

export default ProjectDetail;
