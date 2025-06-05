import { Project } from "@/types";

import { PROJECT_SETTINGS_KEY } from "../constants";

export const projectSettingsService = {
  getFromLocalDb(): Partial<Project> | null {
    const projectSettings = localStorage.getItem(PROJECT_SETTINGS_KEY);

    if (!projectSettings) {
      return null;
    }

    return JSON.parse(projectSettings) as Partial<Project>;
  },
  saveToLocalDb(projectSettings: Partial<Project>) {
    localStorage.setItem(PROJECT_SETTINGS_KEY, JSON.stringify(projectSettings));
  },
  removeFromLocalDb() {
    localStorage.removeItem(PROJECT_SETTINGS_KEY);
  },
};
