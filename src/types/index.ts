// Project Types

export type VideoSource = "YouTube" | "TikTok" | "Instagram";

export type VideoFormat = "MP4" | "MOV";

export type AspectRatio = "16:9" | "9:16" | "1:1" | "4:5";

export type Resolution = "720p" | "1080p" | "4K";

export type AudioQuality = "standard" | "high";

export type ProjectStatus = "queued" | "processing" | "complete" | "failed";

export type PresenterType = "ai" | "human";

export interface Transcription {
  id: string;
  text: string;
  timestamps: Array<{
    start: number;
    end: number;
    text: string;
  }>;
  language: string;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  createdAt: string;
  completedAt?: string;
  sourceUrl?: string;
  sourceFile?: string;
  sourceType: VideoSource;
  originalDuration?: number;
  generatedDuration?: number;
  transcription?: Transcription;
  outputSettings?: {
    resolution: Resolution;
    aspectRatio: AspectRatio;
    audioQuality: AudioQuality;
    format: VideoFormat;
  };
  presenterSettings?: {
    type: PresenterType;
    presenterId: string;
  };
  outputUrl?: string;
}

export interface Presenter {
  id: string;
  name: string;
  type: PresenterType;
  thumbnailUrl: string;
  description: string;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  usageStats: {
    projectsCreated: number;
    projectsCompleted: number;
    totalProcessingTime: number;
  };
}

export interface ProjectCreateResponse {
  id: string;
  createdTime: string;
  fields: {
    ProjectName: string;
    InspirationalVideoURL: string;
    AnalysedProjectIdea: string;
    Status: string;
    UpdatedAt: string;
    CreatedAt: string;
    ID: number;
    InspirationalVideo: Array<{
      id: string;
      url: string;
      filename: string;
      size: number;
      type: string;
    }>;
  };
}

// Helper function to convert API response to our Project type
export const mapResponseToProject = (
  response: ProjectCreateResponse,
): Project => {
  let sourceType: VideoSource;
  const url = response.fields.InspirationalVideoURL;

  if (url.includes("instagram.com")) {
    sourceType = "Instagram";
  } else if (url.includes("tiktok.com")) {
    sourceType = "TikTok";
  } else {
    sourceType = "YouTube";
  }
  return {
    id: response.id,
    name: response.fields.ProjectName,
    status: "complete",
    createdAt: response.fields.CreatedAt,
    sourceUrl: response.fields.InspirationalVideoURL,
    sourceType,
    transcription: {
      id: "t1",
      text: response.fields.AnalysedProjectIdea,
      timestamps: [
        { start: 0, end: 5, text: "This is a sample" },
        { start: 5, end: 10, text: "transcription for the product" },
        { start: 10, end: 15, text: "demo video." },
      ],
      language: "en",
    },
    outputSettings: {
      resolution: "1080p",
      aspectRatio: "16:9",
      format: "MP4",
      audioQuality: "high",
    },
  };
};
