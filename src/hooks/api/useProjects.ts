import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createProjectFromUrl,
  deleteProject,
  duplicateProject,
  generateVideo,
  getProjects,
  updateProject,
  uploadVideoFile,
} from "@/api";
import { mockProjects } from "@/api/mockData";
import { Project } from "@/types";

// Hook to fetch all projects
export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
};

// Hook to fetch a single project by ID
export const useProject = (id: string) => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData<Project>(["project", id]) || mockProjects[0];
};

// Hook to create a new project from URL
export const useCreateProjectFromUrl = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      name,
      url,
      source,
    }: {
      name: string;
      url: string;
      source: string;
    }) => createProjectFromUrl(name, url, source),
    onSuccess: (response: Project) => {
      queryClient.setQueryData(["projects"], (prev: Project[]) => [
        ...prev,
        response,
      ]);
    },
  });
};

// Hook to upload a video file and create a project
export const useUploadVideoFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, file }: { name: string; file: File }) =>
      uploadVideoFile(name, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

// Hook to update a project
export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) =>
      updateProject(id, data),
    onSuccess: (updatedProject) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({
        queryKey: ["project", updatedProject.id],
      });
    },
  });
};

// Hook to generate a video from a project
export const useGenerateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => generateVideo(id),
    onSuccess: (updatedProject) => {
      queryClient.invalidateQueries({
        queryKey: ["project", updatedProject.id],
      });
    },
  });
};

// Hook to delete a project
export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

// Hook to duplicate a project
export const useDuplicateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, newName }: { id: string; newName?: string }) =>
      duplicateProject(id, newName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
