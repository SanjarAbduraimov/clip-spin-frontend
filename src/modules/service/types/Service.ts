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

export interface AvatarData {
  _id: string;
  avatar_id: string;
  avatar_name: string;
  gender: "male" | "female" | string;
  preview_image_url: string;
  preview_video_url: string;
  premium: boolean;
}
export interface AvatarDataMapper {
  _id: string;
  avatar_id: string;
  avatar_name: string;
  gender: "male" | "female" | string;
  preview_image_url: string;
  preview_video_url: string;
}
