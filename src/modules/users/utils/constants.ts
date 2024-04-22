import { pageTitles } from './texts';

export enum GroupSelectRole {
  ADMIN = `Naudotojas`,
  USER = 'Administratorius',
}

export enum FilterFields {
  NAME = `name`,
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
}

export enum SortFields {
  NAME = `name`,
  CREATED_AT = '-createdAt',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
}

export enum Resources {
  GROUPS = 'groups',
  GROUPS_FLAT = 'groups/flat',
  GROUP = 'group',
  APP = 'app',
  APPS = 'apps',
  USERS = 'users',
  PERMISSIONS = 'permissions',
  MUNICIPALITIES = `permissions/municipalities`,
  USERS_APP = `apps/users`,
}
export enum Populations {
  MUNICIPALITIES = 'municipalities',
  CHILDREN = 'children',
  INHERITED_APPS = 'inheritedApps',
  PARENT = 'parent',
  USERS_COUNT = 'usersCount',
}
