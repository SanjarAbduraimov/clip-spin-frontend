import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getTranscription,
  updateTranscription,
  generateTranscription,
  exportTranscription,
} from "@/api";
import { Transcription } from "@/types";

// Hook to fetch transcription for a project
export const useTranscription = (projectId: string) => {
  return useQuery({
    queryKey: ["transcription", projectId],
    queryFn: () => getTranscription(projectId),
    enabled: !!projectId,
  });
};

// Hook to update transcription
export const useUpdateTranscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      transcriptionData,
    }: {
      projectId: string;
      transcriptionData: Partial<Transcription>;
    }) => updateTranscription(projectId, transcriptionData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["transcription", variables.projectId],
      });
      queryClient.invalidateQueries({
        queryKey: ["project", variables.projectId],
      });
    },
  });
};

// Hook to generate transcription
export const useGenerateTranscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => generateTranscription(projectId),
    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({
        queryKey: ["transcription", projectId],
      });
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });
    },
  });
};

// Hook to export transcription
export const useExportTranscription = () => {
  return useMutation({
    mutationFn: ({
      projectId,
      format = "txt",
    }: {
      projectId: string;
      format?: "txt";
    }) => exportTranscription(projectId, format),
    onSuccess: (blob) => {
      // Create a download link for the exported file
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "transcription.txt";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
  });
};
