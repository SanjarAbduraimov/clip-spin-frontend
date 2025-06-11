import {
  Project,
  ProjectCreateResponse,
  ProjectResponse,
  ProjectType,
  ProjectUpdateBody,
} from "@/types";

import axiosInstance from "./axios";

// Get all projects for the current user
export const getProjects = async () => {
  return axiosInstance
    .get<{ data: ProjectResponse["data"][] }>("/projects")
    .then((res) => res.data.data);
};

// Get a specific project by ID
export const getProject = async (id: string) => {
  return axiosInstance
    .get<{ data: ProjectResponse["data"] }>(`/projects/${id}`)
    .then((res) => res.data.data);
};

// Create a new project from URL
export const createProjectFromUrl = async (
  name: string,
  url: string,
  type: ProjectType,
): Promise<ProjectCreateResponse["data"]> => {
  return axiosInstance
    .post<ProjectCreateResponse>("/projects", {
      title: name,
      input_video_url: url,
      type,
    })
    .then((res) => res.data.data);
};

// Update project settings
export const updateProject = async (id: string, data: ProjectUpdateBody) => {
  return axiosInstance
    .put<Project>(`/projects/${id}`, data)
    .then((res) => res.data);
};

export const generateVideo = async (id: string) => {
  return axiosInstance
    .post<Project>(`/projects/${id}/generate`)
    .then((res) => res.data);
};

// Delete a project
export const deleteProject = async (id: string) => {
  return axiosInstance.delete<void>(`/projects/${id}`).then(() => {});
};
