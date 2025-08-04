import { ReactNode } from "react";

import { ServiceType } from "../constants/ServiceType";

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  isInBeta: boolean;
  type: ServiceType;
}

export interface VoiceData {
  _id: string;
  voice_id: string;
  name: string;
  gender: "male" | "female" | string;
  language: string;
  preview_audio: string;
  support_locale: boolean;
  support_pause: boolean;
  support_interactive_avatar: boolean;
  emotion_support: boolean;
}
export interface VoiceDataMapper {
  _id: string;
  voice_id: string;
  name: string;
  gender: "male" | "female" | string;
  preview_audio: string;
}
