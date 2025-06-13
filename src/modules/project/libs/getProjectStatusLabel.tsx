import {
  Project,
  ProjectProgressLabels,
  ProjectStatus,
  ProjectStatusLabels,
} from "@/types";

export const getProjectStatusLabel = (project: Project) => {
  if (project.status === ProjectStatus.IN_PROGRESS) {
    return ProjectProgressLabels[project.progress];
  }

  return ProjectStatusLabels[project.status];
};
