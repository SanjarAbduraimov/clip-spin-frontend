import { ProjectErrorCause } from "@/types";

export const PROJECT_SETTINGS_KEY = "project_settings";

export const errorMessages: Record<ProjectErrorCause, string> = {
  [ProjectErrorCause.INVALID_URL]:
    "The URL you entered is invalid. Please check and try again.",
  [ProjectErrorCause.UNSUPPORTED_URL]:
    "This URL format is not supported. Please use a link from supported platforms.",
  [ProjectErrorCause.FAILED_TO_DOWNLOAD]:
    "We couldn't download the content from the link provided. Try a different one.",
  [ProjectErrorCause.FAILED_TO_SAVE]:
    "An error occurred while saving your data. Please try again later.",
  [ProjectErrorCause.FAILED_TO_PARSE]:
    "We couldn’t understand the input content. Make sure the link has valid video or text.",
  [ProjectErrorCause.FAILED_TO_ANALYZE]:
    "We couldn’t analyze the video. Try using a different link or content.",
  [ProjectErrorCause.FAILED_TO_GENERATE_VIDEO]:
    "Video generation failed. You won’t be charged. Please try again later.",
  [ProjectErrorCause.FAILED_TO_GENERATE_SCENES]:
    "We couldn’t generate scenes for this idea. Try rephrasing your input.",
  [ProjectErrorCause.FAILED_TO_GENERATE_SCRIPTS]:
    "Script generation failed. Please try again with a different description.",
  [ProjectErrorCause.UNKNOWN_ERROR]:
    "An unknown error occurred. Please refresh the page or try again later.",
};
