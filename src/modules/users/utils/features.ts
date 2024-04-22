import { pageTitles } from "./texts";

export enum Features {
  USERS = "USERS",
  GROUPS = "GROUPS",
  PERMISSIONS = "PERMISSIONS"
}

export const featureLabels = {
  [Features.USERS]: pageTitles.users,
  [Features.GROUPS]: pageTitles.groups,
  [Features.PERMISSIONS]: pageTitles.permissions
};
