import { FC } from "react";

import { Badge } from "@/components/Badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";

import { Service } from "../types/Service";

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: FC<ServiceCardProps> = ({
  service: { name, description, icon, isInBeta },
}) => {
  return (
    <Card className="relative">
      <CardHeader>
        <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-lg bg-bg-brand-primary text-text-brand-tertiary shadow-sm [&>svg]:h-8 [&>svg]:w-8">
          {icon}
        </div>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {isInBeta && (
        <Badge
          className="absolute right-2 top-0 -translate-y-1/2"
          variant="warning"
        >
          Coming soon
        </Badge>
      )}
    </Card>
  );
};
