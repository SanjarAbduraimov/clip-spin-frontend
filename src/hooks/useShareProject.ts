import { useCallback } from "react";

import { useToast } from "@/hooks/useToast";
import { Project } from "@/types";

interface ShareData {
  title: string;
  text: string;
  url: string;
}

interface UseShareProjectReturn {
  shareProject: (project: Project) => Promise<void>;
  canShare: boolean;
}

export const useShareProject = (): UseShareProjectReturn => {
  const { toast } = useToast();

  const canShare = typeof navigator !== "undefined" && "share" in navigator;

  const shareProject = useCallback(
    async (project: Project) => {
      const shareData: ShareData = {
        title: `Check out my video: ${project.name}`,
        text: `I created this video using Clip Spin! ${project.name}`,
        url: project.outputUrl || project.sourceUrl || window.location.href,
      };

      try {
        if (canShare && navigator.share) {
          // Use native Web Share API if available
          await navigator.share(shareData);
          toast({
            title: "Shared successfully",
            description: "Project shared successfully!",
          });
        } else {
          // Fallback to copying URL to clipboard
          await navigator.clipboard.writeText(shareData.url);
          toast({
            title: "Link copied",
            description: "Project link copied to clipboard!",
          });
        }
      } catch (error) {
        // Handle user cancellation or other errors
        if (error instanceof Error && error.name === "AbortError") {
          // User cancelled the share dialog, don't show error
          return;
        }

        // Fallback to copying URL if share fails
        try {
          await navigator.clipboard.writeText(shareData.url);
          toast({
            title: "Link copied",
            description: "Project link copied to clipboard!",
          });
        } catch (clipboardError) {
          toast({
            title: "Share failed",
            description: "Unable to share or copy link. Please try again.",
            variant: "destructive",
          });
        }
      }
    },
    [canShare, toast],
  );

  return {
    shareProject,
    canShare,
  };
};
