import { mapResponseToProject, Project, ProjectCreateResponse } from "@/types";

import axiosInstance from "./axios";
import { mockProjects } from "./mockData";

// Get all projects for the current user
export const getProjects = async () => {
  return new Promise<Project[]>((resolve) => {
    setTimeout(() => {
      resolve([...mockProjects]);
    }, 800);
  });
};

// Get a specific project by ID
export const getProject = async (id: string) => {
  return new Promise<Project>((resolve, reject) => {
    setTimeout(() => {
      const project = mockProjects.find((p) => p.id === id);
      if (project) {
        resolve({ ...project });
      } else {
        reject(new Error("Project not found"));
      }
    }, 600);
  });
};

// Create a new project from URL
export const createProjectFromUrl = async (
  name: string,
  url: string,
  source: string,
): Promise<Project> => {
  return axiosInstance
    .post<ProjectCreateResponse>("/webhook/start-analysis", {
      "Project Name": name,
      "Content URL": url,
      Source: source,
    })
    .then((response) => mapResponseToProject(response.data));
};

// Upload a video file and create a project
export const uploadVideoFile = async (name: string, file: File) => {
  return new Promise<Project>((resolve) => {
    setTimeout(() => {
      const newProject: Project = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        status: "processing",
        createdAt: new Date().toISOString(),
        sourceFile: file.name,
        sourceType: "TikTok",
        outputSettings: {
          resolution: "1080p",
          aspectRatio: "16:9",
          format: "MP4",
          audioQuality: "high",
        },
      };
      mockProjects.push(newProject);
      resolve({ ...newProject });
    }, 2000);
  });
};

// Update project settings
export const updateProject = async (id: string, data: Partial<Project>) => {
  return new Promise<Project>((resolve, reject) => {
    setTimeout(() => {
      const index = mockProjects.findIndex((p) => p.id === id);
      if (index !== -1) {
        mockProjects[index] = {
          ...mockProjects[index],
          ...data,
        };
        resolve({ ...mockProjects[index] });
      } else {
        reject(new Error("Project not found"));
      }
    }, 800);
  });
};

// Start video generation process
export const generateVideo = async (id: string) => {
  return new Promise<Project>((resolve, reject) => {
    setTimeout(() => {
      const index = mockProjects.findIndex((p) => p.id === id);
      if (index !== -1) {
        mockProjects[index] = {
          ...mockProjects[index],
          status: "complete",
          outputUrl: `https://example.com/output-${id}.mp4`,
          completedAt: new Date().toISOString(),
        };
        resolve({ ...mockProjects[index] });
      } else {
        reject(new Error("Project not found"));
      }
    }, 3000);
  });
};

// Delete a project
export const deleteProject = async (id: string) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      const index = mockProjects.findIndex((p) => p.id === id);
      if (index !== -1) {
        mockProjects.splice(index, 1);
        resolve();
      } else {
        reject(new Error("Project not found"));
      }
    }, 600);
  });
};

// Duplicate a project
export const duplicateProject = async (id: string, newName?: string) => {
  return new Promise<Project>((resolve, reject) => {
    setTimeout(() => {
      const project = mockProjects.find((p) => p.id === id);
      if (project) {
        const duplicatedProject: Project = {
          ...project,
          id: Math.random().toString(36).substr(2, 9),
          name: newName || `${project.name} (Copy)`,
          status: "queued",
          createdAt: new Date().toISOString(),
          outputUrl: undefined,
        };
        mockProjects.push(duplicatedProject);
        resolve({ ...duplicatedProject });
      } else {
        reject(new Error("Project not found"));
      }
    }, 1000);
  });
};
