import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import { PaymentCancel } from "@/modules/subscription/ui/PaymentCancel";
import { PaymentError } from "@/modules/subscription/ui/PaymentError";
import { PaymentSuccess } from "@/modules/subscription/ui/PaymentSuccess";

import { AdminGuard } from "@/auth/guard/adminGuard";
import { Pricing, Usage } from "@/pages/dashboard";
import Users from "@/pages/Protected/Users";
import { ProjectType } from "@/types";

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
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "payment/success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment/cancel",
        element: <PaymentCancel />,
      },
      {
        path: "payment/error",
        element: <PaymentError />,
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
      {
        path: "usage",
        element: <Usage />,
      },
      {
        path: "users",
        element: (
          <AdminGuard>
            <Users />
          </AdminGuard>
        ),
      },
    ],
  },
];
