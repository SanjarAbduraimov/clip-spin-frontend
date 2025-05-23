import { Project, Presenter, Transcription } from "@/types";

// Mock projects data
export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Product Demo",
    status: "complete",
    createdAt: new Date().toISOString(),
    sourceUrl: "https://www.youtube.com/watch?v=example1",
    sourceType: "YouTube",
    transcription: {
      id: "t1",
      text: "This is a sample transcription for the product demo video.",
      timestamps: [
        { start: 0, end: 5, text: "This is a sample" },
        { start: 5, end: 10, text: "transcription for the product" },
        { start: 10, end: 15, text: "demo video." },
      ],
      language: "en",
    },
    outputUrl: "https://example.com/output1.mp4",
    presenterSettings: {
      type: "ai",
      presenterId: "presenter1",
    },
    outputSettings: {
      resolution: "1080p",
      aspectRatio: "16:9",
      format: "MP4",
      audioQuality: "high",
    },
  },
  {
    id: "2",
    name: "Marketing Video",
    status: "processing",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    sourceUrl: "https://www.tiktok.com/@example/video/123456",
    sourceType: "TikTok",
    transcription: {
      id: "t2",
      text: "Sample transcription for marketing video.",
      timestamps: [
        { start: 0, end: 5, text: "Sample transcription" },
        { start: 5, end: 10, text: "for marketing video." },
      ],
      language: "en",
    },
    presenterSettings: {
      type: "human",
      presenterId: "presenter2",
    },
    outputSettings: {
      resolution: "720p",
      aspectRatio: "9:16",
      format: "MP4",
      audioQuality: "standard",
    },
  },
  {
    id: "3",
    name: "Tutorial Video",
    status: "queued",
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    sourceUrl: "https://www.instagram.com/p/example-post/",
    sourceType: "Instagram",
    presenterSettings: {
      type: "ai",
      presenterId: "ai-1",
    },
    outputSettings: {
      resolution: "1080p",
      aspectRatio: "1:1",
      format: "MP4",
      audioQuality: "high",
    },
  },
  {
    id: "4",
    name: "Product Walkthrough",
    status: "failed",
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    sourceFile: "product-walkthrough.mp4",
    sourceType: "TikTok",
    transcription: {
      id: "t4",
      text: "Welcome to our product walkthrough. Today we will show you how to use our new software.",
      timestamps: [
        { start: 0, end: 5, text: "Welcome to our product walkthrough." },
        { start: 5, end: 10, text: "Today we will show you" },
        { start: 10, end: 15, text: "how to use our new software." },
      ],
      language: "en",
    },
    presenterSettings: {
      type: "human",
      presenterId: "human-1",
    },
    outputSettings: {
      resolution: "4K",
      aspectRatio: "16:9",
      format: "MP4",
      audioQuality: "high",
    },
  },
  {
    id: "5",
    name: "Social Media Promo",
    status: "complete",
    createdAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    completedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    sourceUrl: "https://www.youtube.com/watch?v=example2",
    sourceType: "YouTube",
    transcription: {
      id: "t5",
      text: "Check out our latest features! We have added new tools to help you create amazing videos.",
      timestamps: [
        { start: 0, end: 5, text: "Check out our latest features!" },
        { start: 5, end: 10, text: "We have added new tools" },
        { start: 10, end: 15, text: "to help you create amazing videos." },
      ],
      language: "en",
    },
    outputUrl: "https://example.com/output5.mp4",
    presenterSettings: {
      type: "ai",
      presenterId: "ai-2",
    },
    outputSettings: {
      resolution: "1080p",
      aspectRatio: "4:5",
      format: "MP4",
      audioQuality: "standard",
    },
  },
];

// Mock transcription data
export const mockTranscriptions: Record<string, Transcription> = {
  "1": {
    id: "t1",
    text: "This is a sample transcription for the product demo video.",
    timestamps: [
      { start: 0, end: 5, text: "This is a sample" },
      { start: 5, end: 10, text: "transcription for the product" },
      { start: 10, end: 15, text: "demo video." },
    ],
    language: "en",
  },
  "2": {
    id: "t2",
    text: "Sample transcription for marketing video.",
    timestamps: [
      { start: 0, end: 5, text: "Sample transcription" },
      { start: 5, end: 10, text: "for marketing video." },
    ],
    language: "en",
  },
  "4": {
    id: "t4",
    text: "Welcome to our product walkthrough. Today we will show you how to use our new software.",
    timestamps: [
      { start: 0, end: 5, text: "Welcome to our product walkthrough." },
      { start: 5, end: 10, text: "Today we will show you" },
      { start: 10, end: 15, text: "how to use our new software." },
    ],
    language: "en",
  },
  "5": {
    id: "t5",
    text: "Check out our latest features! We have added new tools to help you create amazing videos.",
    timestamps: [
      { start: 0, end: 5, text: "Check out our latest features!" },
      { start: 5, end: 10, text: "We have added new tools" },
      { start: 10, end: 15, text: "to help you create amazing videos." },
    ],
    language: "en",
  },
};

// Mock presenter data
export const mockPresenters: Presenter[] = [
  {
    id: "ai-1",
    name: "Alex",
    type: "ai",
    thumbnailUrl: "https://example.com/presenters/alex.jpg",
    description: "Professional AI presenter with a friendly tone",
    tags: ["professional", "friendly", "male"],
  },
  {
    id: "ai-2",
    name: "Sophia",
    type: "ai",
    thumbnailUrl: "https://example.com/presenters/sophia.jpg",
    description: "Engaging AI presenter with a warm personality",
    tags: ["engaging", "warm", "female"],
  },
  {
    id: "ai-3",
    name: "Jordan",
    type: "ai",
    thumbnailUrl: "https://example.com/presenters/jordan.jpg",
    description: "Energetic AI presenter perfect for product demonstrations",
    tags: ["energetic", "enthusiastic", "non-binary"],
  },
  {
    id: "human-1",
    name: "Michael",
    type: "human",
    thumbnailUrl: "https://example.com/presenters/michael.jpg",
    description: "Professional human presenter with broadcast experience",
    tags: ["professional", "experienced", "male"],
  },
  {
    id: "human-2",
    name: "Emma",
    type: "human",
    thumbnailUrl: "https://example.com/presenters/emma.jpg",
    description: "Charismatic human presenter with a natural delivery style",
    tags: ["charismatic", "natural", "female"],
  },
  {
    id: "human-3",
    name: "David",
    type: "human",
    thumbnailUrl: "https://example.com/presenters/david.jpg",
    description:
      "Technical human presenter specializing in software demonstrations",
    tags: ["technical", "precise", "male"],
  },
  {
    id: "human-4",
    name: "Sarah",
    type: "human",
    thumbnailUrl: "https://example.com/presenters/sarah.jpg",
    description: "Conversational human presenter with a relatable style",
    tags: ["conversational", "relatable", "female"],
  },
];
