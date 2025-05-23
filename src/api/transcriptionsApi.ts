import { Transcription } from "@/types";

import { mockTranscriptions } from "./mockData";

// Get transcription for a project
export const getTranscription = async (projectId: string) => {
  return new Promise<Transcription>((resolve, reject) => {
    setTimeout(() => {
      const transcription = mockTranscriptions[projectId];
      if (transcription) {
        resolve({ ...transcription });
      } else {
        reject(new Error("Transcription not found"));
      }
    }, 700);
  });
};

// Update transcription text
export const updateTranscription = async (
  projectId: string,
  transcriptionData: Partial<Transcription>,
) => {
  return new Promise<Transcription>((resolve, reject) => {
    setTimeout(() => {
      if (mockTranscriptions[projectId]) {
        mockTranscriptions[projectId] = {
          ...mockTranscriptions[projectId],
          ...transcriptionData,
        };
        resolve({ ...mockTranscriptions[projectId] });
      } else {
        reject(new Error("Transcription not found"));
      }
    }, 800);
  });
};

// Generate transcription from video
export const generateTranscription = async (projectId: string) => {
  return new Promise<Transcription>((resolve) => {
    setTimeout(() => {
      const newTranscription: Transcription = {
        id: `t-${projectId}-${Date.now()}`,
        text: "This is an automatically generated transcription for your video.",
        timestamps: [
          { start: 0, end: 5, text: "This is an automatically" },
          { start: 5, end: 10, text: "generated transcription" },
          { start: 10, end: 15, text: "for your video." },
        ],
        language: "en",
      };
      mockTranscriptions[projectId] = newTranscription;
      resolve({ ...newTranscription });
    }, 2500); // Longer delay to simulate processing
  });
};

// Export transcription as plain text
export const exportTranscription = async (
  projectId: string,
  // format parameter is used in the actual implementation but not in the mock
) => {
  return new Promise<Blob>((resolve, reject) => {
    setTimeout(() => {
      const transcription = mockTranscriptions[projectId];
      if (transcription) {
        // Create a text blob with the transcription content
        const textContent = transcription.text;
        const blob = new Blob([textContent], { type: "text/plain" });
        resolve(blob);
      } else {
        reject(new Error("Transcription not found"));
      }
    }, 600);
  });
};
