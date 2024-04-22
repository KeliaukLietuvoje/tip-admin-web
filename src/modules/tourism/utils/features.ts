import { pageTitles } from "./texts";

export enum Features {
  TOURISM_USERS = "TOURISM_USERS",
  TOURISM_FORMS = "TOURISM_FORMS"
}

export const featureLabels = {
  [Features.TOURISM_USERS]: pageTitles.users,
  [Features.TOURISM_FORMS]: pageTitles.forms
};
