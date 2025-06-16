import { useState } from "react";

import { ServiceType } from "@/modules/service/constants/ServiceType";

import { ProjectType } from "@/types";

import NewProject from "./NewProject";
import { RecentProjects } from "./RecentProjects";
import { ServicesList } from "./ServicesList";
import { Statistics } from "./Statistics";

const Dashboard = () => {
  const [projectType, setProjectType] = useState<ProjectType>(
    ProjectType.slide_show,
  );

  const handleServiceClick = (serviceType: ServiceType) => {
    const newProjectEl = document.getElementById("new-project");
    if (newProjectEl) {
      newProjectEl.scrollIntoView({ behavior: "smooth" });
    }
    if (serviceType === ServiceType.PROFESSIONAL_EDITOR) {
      setProjectType(ProjectType.professional);
    } else if (serviceType === ServiceType.AI_VIDEO_GENERATION) {
      setProjectType(ProjectType.slide_show);
    }
  };

  return (
    <div className="container mx-auto max-w-[960px] px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <Statistics />

      <ServicesList onServiceClick={handleServiceClick} />

      <div className="my-8">
        <NewProject projectType={projectType} />
      </div>

      <RecentProjects />
    </div>
  );
};

export default Dashboard;
