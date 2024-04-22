import { Resources } from "./constants";
import { routes } from "./routes";

export const getGroupTabs = (id: string) => [
  {
    label: "Nariai",
    value: Resources.USERS,
    route: routes.groupUsers(id)
  },
  {
    label: "Grupės",
    value: Resources.GROUPS,
    route: routes.viewGroup(id)
  }
];
