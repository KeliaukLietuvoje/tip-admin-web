import { Module } from "../../../types";
import { Ids } from "../../../utils/constants";
import { mapSlug } from "../../../utils/functions";
import GroupUsersList from "../pages/Group";
import GroupForm from "../pages/GroupForm";
import GroupsList from "../pages/Groups";
import PermissionForm from "../pages/PermissionForm";
import PermissionsList from "../pages/Permissions";
import UserForm from "../pages/UserForm";
import UsersList from "../pages/Users";
import { Features } from "./features";
import { pageTitles } from "./texts";

export const routes = {
  users: "../naudotojai",
  user: (id: string) => `../naudotojai/${id}`,
  groups: "../grupes",
  viewGroup: (id: string) => `../grupes/${id}/perziura`,
  group: (id: string) => `../grupes/${id}`,
  editGroup: (id: string) => `../grupes/${id}/redaguoti`,
  groupUsers: (id: string) => `../grupes/${id}/nariai`,
  permissions: "../teises",
  permission: (id: string) => `../teises/${id}`,
  profile: "/profilis",
  newGroup: "../grupes/naujas",
  newPermission: "../teises/naujas",
  newUser: "../naudotojai/naujas"
};

export const config = {
  name: "Vidiniai naudotojai",
  description: "Personalo valdymas",
  slug: "/vidinis",
  type: Module.USERS,

  routes: [
    {
      name: pageTitles.users,
      slug: mapSlug(routes.users),
      permission: Features.USERS,
      sideBar: true,
      component: <UsersList />
    },
    {
      slug: mapSlug(routes.user(Ids.ID)),
      permission: Features.USERS,
      component: <UserForm />
    },
    {
      name: pageTitles.groups,
      slug: mapSlug(routes.groups),
      sideBar: true,
      permission: Features.GROUPS,
      component: <GroupsList />
    },
    {
      slug: mapSlug(routes.viewGroup(Ids.ID)),
      permission: Features.GROUPS,
      component: <GroupUsersList />
    },

    {
      slug: mapSlug(routes.group(Ids.ID)),
      permission: Features.GROUPS,
      component: <GroupForm />
    },
    {
      slug: mapSlug(routes.editGroup(Ids.ID)),
      permission: Features.GROUPS,
      component: <GroupForm />
    },
    {
      slug: mapSlug(routes.groupUsers(Ids.ID)),
      permission: Features.GROUPS,
      component: <GroupUsersList />
    },
    {
      name: pageTitles.permissions,
      slug: mapSlug(routes.permissions),
      sideBar: true,
      superAdmin: true,
      permission: Features.PERMISSIONS,
      component: <PermissionsList />
    },
    {
      slug: mapSlug(routes.permission(Ids.ID)),
      superAdmin: true,
      permission: Features.PERMISSIONS,
      component: <PermissionForm />
    }
  ]
};
