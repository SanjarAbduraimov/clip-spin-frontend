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
