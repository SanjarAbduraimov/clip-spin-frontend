import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import { ProjectType } from "@/types";

// Clip Spin routes
const ClipSpinLayout = lazy(() => import("@/layout/ClipSpinLayout"));
const ClipSpinDashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const NewProject = lazy(() => import("@/pages/dashboard/NewProject"));
const ProjectDetail = lazy(() => import("@/pages/dashboard/ProjectDetail"));
const Requests = lazy(() => import("@/pages/dashboard/Requests"));

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
        element: <NewProject projectType={ProjectType.slide_show} />,
      },
      {
        path: "project/:projectId",
        element: <ProjectDetail />,
      },
      {
        path: "requests",
        element: <Requests />,
      },
    ],
  },
];
