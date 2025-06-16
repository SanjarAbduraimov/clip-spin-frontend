import { AvatarIcon } from "@radix-ui/react-icons";
import { BabyIcon, Sparkles, UsersRound, VideoIcon } from "lucide-react";

import { ServiceType } from "./constants/ServiceType";
import { Service } from "./types/Service";

export const services: Service[] = [
  {
    id: "1",
    name: "AI Video Generation",
    description:
      "Generate AI Slideshow/AI Talking Head/Text Audiogram videos using AI",
    icon: <Sparkles />,
    isInBeta: false,
    type: ServiceType.AI_VIDEO_GENERATION,
  },
  {
    id: "2",
    name: "Professional Editor",
    description: "Video editing made by professionals",
    icon: <UsersRound />,
    isInBeta: false,
    type: ServiceType.PROFESSIONAL_EDITOR,
  },
  {
    id: "3",
    name: "Talking Baby Podcast",
    description: "Talking Baby Podcast",
    icon: <BabyIcon />,
    isInBeta: true,
    type: ServiceType.TALKING_BABY_PODCAST,
  },
  {
    id: "4",
    name: "Avatar Generator",
    description: "Generate avatars using AI",
    icon: <AvatarIcon />,
    isInBeta: true,
    type: ServiceType.AVATAR_GENERATOR,
  },
  {
    id: "5",
    name: "POV Videos",
    description: "Generate POV videos using AI",
    icon: <VideoIcon />,
    isInBeta: true,
    type: ServiceType.POV_VIDEOS,
  },
];
