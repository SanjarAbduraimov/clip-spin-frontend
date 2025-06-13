import {
  ArrowLeft,
  Copy,
  Download,
  Edit,
  EyeIcon,
  Share2,
  Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { getProjectStatusLabel } from "@/modules/project/libs/getProjectStatusLabel";

import { useAuthContext } from "@/auth/hooks/useAuthContext";
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
import { useToast } from "@/hooks/useToast";
import {
  Project,
  ProjectProgress,
  ProjectProgressLabels,
  ProjectStatus,
  ProjectStatusColors,
} from "@/types";

import { SelectScript } from "./SelectScript";
import { Workflow } from "./Workflow";

const initialLoadingProjectProgressStatuses = [
  ProjectProgress.FETCHING_INPUT,
  ProjectProgress.INPUT_FETCHED,
  ProjectProgress.ANALYZING_INPUT,
];

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { user } = useAuthContext();

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
    <div className="container mx-auto max-w-[960px]">
      <Card className="my-8">
        <CardContent className="p-6">
          <div className="mb-8 flex items-start">
            <IconButton
              variant="ghost"
              size="sm"
              className="mr-2"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={16} />
            </IconButton>
            <div>
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <div className="mt-2 flex items-center gap-3">
                <Badge size="sm" variant={ProjectStatusColors[project.status]}>
                  {getProjectStatusLabel(project)}
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

          <Workflow project={project} />

          <div className="mt-8 flex gap-8">
            <div className="shrink-0">
              <div className="mb-6">
                <h3 className="mb-4 text-xl font-semibold">Video Preview</h3>
                <div>
                  <div className="mx-auto max-w-[400px] overflow-hidden rounded-lg bg-black">
                    <div className="aspect-[9/16] overflow-hidden">
                      <video
                        src={getVideoUrl(project)}
                        controls
                        autoPlay
                        className="h-full w-full object-cover"
                      >
                        <track kind="captions" src="" label="English" />
                      </video>
                    </div>
                  </div>
                </div>
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
              </div>
            </div>

            <div className="grow">
              {checkEditTranscriptionButtonVisibility(project) ? (
                <SelectScript project={project} />
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  iconLeft={<Edit size={16} className="mr-2" />}
                >
                  Edit
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

function checkEditTranscriptionButtonVisibility(project: Project): boolean {
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

// function checkUploadButtonVisibility(
//   project: Project,
//   user: AuthUserType,
// ): boolean {
//   if (project.status === ProjectStatus.COMPLETED) {
//     return false;
//   }

//   if (
//     project.progress === ProjectProgress.INPUT_ANALYZED &&
//     project.type === ProjectType.professional &&
//     user.role === Roles.ADMIN
//   ) {
//     return true;
//   }

//   return false;
// }

// Check component moved to the top of the file

export default ProjectDetail;
