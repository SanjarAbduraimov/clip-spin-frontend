// Project Types

export type VideoSource = "youtube" | "tiktok" | "instagram" | "upload";

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
