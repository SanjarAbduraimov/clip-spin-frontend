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
  talking_head = "talking_head",
  professional = "professional",
}

export enum ProjectStatus {
  QUEUED = "queued",
  IN_PROGRESS = "in_progress",
  CANCELLED = "cancelled",
  FAILED = "failed",
  COMPLETED = "completed",
  // PENDING = "pending",
  // CANCELLED = "cancelled",
  // FAILED = "failed",
  // COMPLETED = "completed",
}

export enum ProjectProgress {
  FETCHING_INPUT = "fetching_input",
  INPUT_FETCHED = "input_fetched",

  ANALYZING_INPUT = "analyzing_input",
  INPUT_ANALYZED = "input_analyzed",

  GENERATING_SCRIPT = "generating_script",
  SCRIPT_GENERATED = "script_generated",

  GENERATING_IMAGES = "generating_images",
  IMAGES_GENERATED = "images_generated",

  GENERATING_VIDEO = "generating_video",
  VIDEO_GENERATED = "video_generated",

  SAVING_RESULTS = "saving_results",
  RESULTS_SAVED = "results_saved",
  // FETCHING_INPUT = "fetching_input",
  // ANALYZING_INPUT = "analyzing_input",
  // GENERATING_SCRIPT = "generating_script",
  // SUMMARY_GENERATED = "summary_generated",
  // GENERATING_IMAGES = "generating_images",
  // GENERATING_VIDEO = "generating_video",
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

export interface ProjectUpdateBody {
  title: string;
  input_summary: string;
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
    [ProjectStatus.QUEUED]: "default",
    [ProjectStatus.IN_PROGRESS]: "outline-warning",
    [ProjectStatus.CANCELLED]: "outline-error",
    [ProjectStatus.FAILED]: "outline-error",
    [ProjectStatus.COMPLETED]: "outline-success",
  };

export const ProjectStatusLabels = {
  [ProjectStatus.QUEUED]: "Queued",
  [ProjectStatus.IN_PROGRESS]: "In Progress",
  [ProjectStatus.CANCELLED]: "Cancelled",
  [ProjectStatus.FAILED]: "Failed",
  [ProjectStatus.COMPLETED]: "Completed",
};

export const ProjectProgressLabels = {
  [ProjectProgress.FETCHING_INPUT]: "Fetching input",
  [ProjectProgress.INPUT_FETCHED]: "Input fetched",
  [ProjectProgress.ANALYZING_INPUT]: "Analyzing input",
  [ProjectProgress.INPUT_ANALYZED]: "Input analyzed",
  [ProjectProgress.GENERATING_SCRIPT]: "Generating script",
  [ProjectProgress.SCRIPT_GENERATED]: "Script generated",
  [ProjectProgress.GENERATING_IMAGES]: "Generating images",
  [ProjectProgress.IMAGES_GENERATED]: "Images generated",
  [ProjectProgress.GENERATING_VIDEO]: "Generating video",
  [ProjectProgress.VIDEO_GENERATED]: "Video generated",
  [ProjectProgress.SAVING_RESULTS]: "Saving results",
  [ProjectProgress.RESULTS_SAVED]: "Results saved",
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
