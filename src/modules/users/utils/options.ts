import { RoleType } from "../../../types";

export const getUserRoleOptions = () => [RoleType.ADMIN, RoleType.USER];

export const getPermissionRoleOptions = () => [
  ...getUserRoleOptions(),
  RoleType.ALL
];
