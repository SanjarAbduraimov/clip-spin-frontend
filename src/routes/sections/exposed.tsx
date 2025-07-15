import { RouteObject } from "react-router-dom";

import TermsOfService from "@/pages/TermsOfService";

export const exposed: RouteObject[] = [
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
  },
];
