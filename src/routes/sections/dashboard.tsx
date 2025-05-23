import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Clip Spin routes
const ClipSpinLayout = lazy(() => import("@/layout/ClipSpinLayout"));
const ClipSpinDashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const NewProject = lazy(() => import("@/pages/dashboard/NewProject"));
const ProjectDetail = lazy(() => import("@/pages/dashboard/ProjectDetail"));
const TranscriptionReview = lazy(
  () => import("@/pages/dashboard/TranscriptionReview"),
);
const PresenterSelection = lazy(
  () => import("@/pages/dashboard/PresenterSelection"),
);
const OutputSettings = lazy(() => import("@/pages/dashboard/OutputSettings"));

export const dashboard: RouteObject[] = [
  {
    path: "/",
    element: <ClipSpinLayout />,
    children: [
      {
        path: "",
        element: <ClipSpinDashboard />,
      },
      {
        path: "new-project",
        element: <NewProject />,
      },
      {
        path: "project/:projectId",
        element: <ProjectDetail />,
      },
      {
        path: "project/:projectId/transcription",
        element: <TranscriptionReview />,
      },
      {
        path: "project/:projectId/presenter-selection",
        element: <PresenterSelection />,
      },
      {
        path: "project/:projectId/output-settings",
        element: <OutputSettings />,
      },
    ],
  },
];
