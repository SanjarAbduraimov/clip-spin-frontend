import {
  Project,
  ProjectProgress,
  ProjectProgressLabels,
  ProjectStatus,
  ProjectStatusLabels,
} from "@/types";

const VIDEO_GENERATING_PROGRESS_STATUSES = [
  ProjectProgress.GENERATING_SCRIPT,
  ProjectProgress.SCRIPT_GENERATED,
  ProjectProgress.GENERATING_IMAGES,
  ProjectProgress.IMAGES_GENERATED,
  ProjectProgress.GENERATING_VIDEO,
  ProjectProgress.VIDEO_GENERATED,
  ProjectProgress.SAVING_RESULTS,
];

export const getProjectStatusLabel = (project: Project) => {
  if (project.status === ProjectStatus.IN_PROGRESS) {
    if (VIDEO_GENERATING_PROGRESS_STATUSES.includes(project.progress)) {
      return "Generating video...";
    }
    return ProjectProgressLabels[project.progress];
  }

  return ProjectStatusLabels[project.status];
};
