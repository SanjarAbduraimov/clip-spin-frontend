import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  createProjectFromUrl,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "@/api";
import { useAuthContext } from "@/auth/hooks/useAuthContext";
import { Project, projectResponseToProject, ProjectType } from "@/types";

export const useProjects = () => {
  const { authenticated } = useAuthContext();

  const res = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    enabled: authenticated,
    select: (data) => data.map(projectResponseToProject),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!authenticated) return;
      res.refetch();
    }, 700);

    return () => clearInterval(interval);
  }, [authenticated]);

  return res;
};

export const useProject = (id: string) => {
  const res = useQuery({
    queryKey: ["projects", id],
    queryFn: () => getProject(id),
    select: (data) => projectResponseToProject(data),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      res.refetch();
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return res;
};

export const useCreateProjectFromUrl = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      name,
      url,
      type,
    }: {
      name: string;
      url: string;
      type: ProjectType;
    }) => createProjectFromUrl(name, url, type),
    onSuccess: (data) => {
      navigate(`/project/${data._id}`);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

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

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useDuplicateProject = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  return useMutation({
    mutationFn: (project: Project) =>
      createProjectFromUrl(project.name, project.sourceUrl!, project.type),
    onSuccess: (data) => {
      navigate(`/project/${data._id}`);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
