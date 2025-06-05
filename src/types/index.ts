// Project Types

import { BadgeProps } from "@/components/Badge";

export type VideoSource = "YouTube" | "TikTok" | "Instagram";

export type VideoFormat = "MP4" | "MOV";

export type AspectRatio = "16:9" | "9:16" | "1:1" | "4:5";

export type Resolution = "720p" | "1080p" | "4K";

export type AudioQuality = "standard" | "high";

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

export enum ProjectType {
  slide_show = "slide_show",
  text_audiogram = "text_audiogram",
}

export enum ProjectStatus {
  PENDING = "pending",
  CANCELLED = "cancelled",
  FAILED = "failed",
  COMPLETED = "completed",
}

export enum ProjectProgress {
  FETCHING_INPUT = "fetching_input",
  ANALYZING_INPUT = "analyzing_input",
  GENERATING_SCRIPT = "generating_script",
  GENERATING_IMAGES = "generating_images",
  GENERATING_VIDEO = "generating_video",
}

export interface ProjectResponse {
  data: {
    _id: string;
    title: string;
    input_video_url: string;
    input_summary: string;
    status: ProjectStatus;
    progress: ProjectProgress;
    result: {
      video_url: string;
    };
  };
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  progress: ProjectProgress;
  createdAt: string;
  completedAt?: string;
  sourceUrl?: string;
  sourceFile?: string;
  sourceType: VideoSource;
  type: ProjectType;
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
  data: {
    _id: string;
  };
}

export const ProjectTypeLabels = {
  [ProjectType.slide_show]: "Slide Show",
  [ProjectType.text_audiogram]: "Text Audiogram",
};

export const ProjectStatusColors: Record<ProjectStatus, BadgeProps["variant"]> =
  {
    [ProjectStatus.PENDING]: "outline-warning",
    [ProjectStatus.CANCELLED]: "outline-error",
    [ProjectStatus.FAILED]: "outline-error",
    [ProjectStatus.COMPLETED]: "outline-success",
  };

export const ProjectStatusLabels = {
  [ProjectStatus.PENDING]: "Pending",
  [ProjectStatus.CANCELLED]: "Cancelled",
  [ProjectStatus.FAILED]: "Failed",
  [ProjectStatus.COMPLETED]: "Completed",
};

export const ProjectProgressLabels = {
  [ProjectProgress.FETCHING_INPUT]: "Fetching input",
  [ProjectProgress.ANALYZING_INPUT]: "Analyzing input",
  [ProjectProgress.GENERATING_SCRIPT]: "Generating script",
  [ProjectProgress.GENERATING_IMAGES]: "Generating images",
  [ProjectProgress.GENERATING_VIDEO]: "Generating video",
};

export function projectResponseToProject(
  projectResponse: ProjectResponse["data"],
): Project {
  let sourceType: VideoSource = "YouTube";

  if (
    projectResponse.input_video_url.includes("youtube.com") ||
    projectResponse.input_video_url.includes("youtu.be")
  ) {
    sourceType = "YouTube";
  } else if (projectResponse.input_video_url.includes("instagram.com")) {
    sourceType = "Instagram";
  } else if (
    projectResponse.input_video_url.includes("tiktok.com") ||
    projectResponse.input_video_url.includes("vm.tiktok.com")
  ) {
    sourceType = "TikTok";
  }

  return {
    id: projectResponse._id,
    name: projectResponse.title,
    status: projectResponse.status,
    createdAt: projectResponse._id,
    progress: projectResponse.progress,
    completedAt: new Date().toISOString(),
    sourceUrl: projectResponse.input_video_url,
    sourceFile: undefined,
    sourceType,
    type: ProjectType.slide_show,
    originalDuration: undefined,
    generatedDuration: undefined,
    transcription: {
      id: "",
      text: projectResponse.input_summary,
      timestamps: [],
      language: "en",
    },
    outputSettings: undefined,
    presenterSettings: undefined,
    outputUrl: projectResponse.result?.video_url,
  };
}
