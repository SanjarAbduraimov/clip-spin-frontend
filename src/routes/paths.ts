const ROOTS = {
  AUTH: "/auth",
  AUTH_DEMO: "/auth-demo",
  DASHBOARD: "/dashboard",
  CLIP_SPIN: "/",
};

export const paths = {
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  pricing: "/pricing",
  payment: "/payment",
  about: "/about-us",
  contact: "/contact-us",
  faqs: "/faqs",
  page403: "/403",
  page404: "/404",
  page500: "/500",
  components: "/components",
  clipSpin: {
    root: ROOTS.CLIP_SPIN,
    newProject: `${ROOTS.CLIP_SPIN}/new-project`,
    project: (id: string) => `${ROOTS.CLIP_SPIN}/project/${id}`,
    transcription: (id: string) =>
      `${ROOTS.CLIP_SPIN}/project/${id}/transcription`,
    presenterSelection: (id: string) =>
      `${ROOTS.CLIP_SPIN}/project/${id}/presenter-selection`,
    outputSettings: (id: string) =>
      `${ROOTS.CLIP_SPIN}/project/${id}/output-settings`,
  },
};
