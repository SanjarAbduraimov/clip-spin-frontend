import { Check, Loader2 } from "lucide-react";
import { ReactNode } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/Alert";
import { Badge } from "@/components/Badge";
import { Project, ProjectProgress, ProjectStatus } from "@/types";

const generatingVideoProjectProgressStatuses = [
  ProjectProgress.GENERATING_SCRIPT,
  ProjectProgress.SCRIPT_GENERATED,
  ProjectProgress.GENERATING_IMAGES,
  ProjectProgress.IMAGES_GENERATED,
  ProjectProgress.GENERATING_VIDEO,
  ProjectProgress.VIDEO_GENERATED,
  ProjectProgress.SAVING_RESULTS,
];

interface WorkflowProps {
  project: Project;
}
export const Workflow = ({ project }: WorkflowProps) => {
  return (
    <div className="">
      {/* Progress bar with steps */}
      <div className="relative">
        {/* Step indicators */}
        <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:px-4">
          {/* Step 1: Video Source */}
          <div className="flex flex-col sm:w-1/3 sm:items-center">
            <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white shadow-sm">
              <Check size={14} />
            </div>
            <p className="text-sm font-medium">Video Source</p>
            <p className="text-xs text-gray-500 sm:text-center">
              Video URL provided
            </p>
          </div>

          {/* Step 2: Suggested Ideas */}
          <div className="flex flex-col sm:w-1/3 sm:items-center">
            <div
              className={`mb-2 flex h-7 w-7 items-center justify-center rounded-full shadow-sm ${project.suggestedIdeas.length > 0 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}
            >
              {checkIsSuggestedIdeasGenerating(project) && (
                <Loader2 size={14} className="animate-spin" />
              )}
              {project.suggestedIdeas.length > 0 ? (
                <Check size={14} />
              ) : (
                !checkIsSuggestedIdeasGenerating(project) && (
                  <span className="text-xs font-medium">2</span>
                )
              )}
            </div>
            <p
              className={`text-sm font-medium ${project.suggestedIdeas.length === 0 ? "text-gray-500" : ""}`}
            >
              {project.progress === ProjectProgress.ANALYZING_INPUT
                ? "Analyzing input"
                : "Suggested Ideas"}
            </p>
            <p className="text-xs text-gray-500 sm:text-center">
              {project.suggestedIdeas.length > 0
                ? "Suggested ideas generated"
                : "Pending suggestions"}
            </p>
          </div>

          {/* Step 3: Video Generation */}
          <div className="flex flex-col sm:w-1/3 sm:items-center">
            <div
              className={`mb-2 flex h-7 w-7 items-center justify-center rounded-full shadow-sm ${project.status === ProjectStatus.COMPLETED ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}
            >
              {checkIsVideoGenerating(project) && (
                <Loader2 size={14} className="animate-spin" />
              )}
              {project.status === ProjectStatus.COMPLETED ? (
                <Check size={14} />
              ) : (
                !checkIsVideoGenerating(project) && (
                  <span className="text-xs font-medium">3</span>
                )
              )}
            </div>
            <p
              className={`text-sm font-medium ${project.status !== ProjectStatus.COMPLETED && "text-gray-500"}`}
            >
              Video Generation
            </p>
            <p className="text-xs text-gray-500 sm:text-center">
              {getVideoGenerationStepTexts(project)}
            </p>
          </div>
        </div>
      </div>

      {checkIsVideoGenerating(project) && (
        <Alert className="mt-5 border-yellow-200 bg-yellow-50">
          <Loader2
            size={16}
            className="h-4 w-4 animate-spin stroke-yellow-800"
          />
          <AlertTitle className="text-yellow-800">
            Project is being processed!
          </AlertTitle>
          <AlertDescription className="text-yellow-700">
            Your final video for &quot;{project.name}&quot; project is
            generating. Check your project status in ~10 minutes.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

function checkIsSuggestedIdeasGenerating(project: Project) {
  if (
    project.status === ProjectStatus.FAILED ||
    project.status === ProjectStatus.CANCELLED ||
    project.status === ProjectStatus.COMPLETED
  ) {
    return false;
  }

  if (project.progress === ProjectProgress.ANALYZING_INPUT) {
    return true;
  }

  return false;
}

function checkIsVideoGenerating(project: Project) {
  if (
    project.status === ProjectStatus.FAILED ||
    project.status === ProjectStatus.CANCELLED ||
    project.status === ProjectStatus.COMPLETED
  ) {
    return false;
  }

  if (generatingVideoProjectProgressStatuses.includes(project.progress)) {
    return true;
  }

  return false;
}

function getVideoGenerationStepTexts(project: Project): ReactNode {
  if (project.status === ProjectStatus.COMPLETED) {
    return "Video generated successfully";
  }

  if (checkIsVideoGenerating(project)) {
    return "Generating final video...";
  }

  if (project.status === ProjectStatus.FAILED) {
    return <Badge variant="outline-error">Failed</Badge>;
  }

  return "Generate final video";
}
