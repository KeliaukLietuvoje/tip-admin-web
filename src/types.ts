import { TableItemWidth } from './utils/constants';

export enum Module {
  USERS = 'USERS',
  TOURISM = 'TOURISM',
  ADMIN = 'ADMIN',
}
export type ChildrenType = string | JSX.Element | JSX.Element[] | any;

export type Column = {
  label: string | JSX.Element;
  mobileOrder?: number;
  desktopOrder?: number;
  show: boolean;
  visible?: boolean;
  width?: TableItemWidth;
};

export type Columns = {
  [key: string]: Column;
};

export enum RoleType {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SUPER_ADMIN = 'SUPER_ADMIN',
  ALL = 'ALL',
}

export interface NotFoundInfoProps {
  text?: string;
  url?: string;
  urlText?: string;
}

export interface TableRow {
  id?: string | number;
  [key: string]: any;
}

export interface TableData {
  data: TableRow[];
  total?: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;
}

export interface BreadcrumbsProps {
  homeName: string;
  breadCrumbs: any[];
  homeRoute: string;
  pathRoute: (id: string) => string;
}

export type ModulePermissions = {
  accesses: string[];
  features: string[];
};

export type UserModules = {
  [key: string]: ModulePermissions;
};

export interface TenantUser {
  id: string;
  tenant: Tenant;
  role: RoleType;
  user: User;
}

export interface User {
  id?: string;
  firstName?: string;
  role?: RoleType;
  fullName?: string;
  lastName?: string;
  email?: string;
  type?: RoleType;
  phone?: string;
  groups?: Group[];
  apps?: App[];
  permissions?: { [key in Module]: ModulePermissions };
  error?: string;
  personalCode?: string;
  [key: string]: any;
}

export type Config = {
  name: string;
  description: string;
  slug: string;
  type: Module;
  routes: RouteProps[];
};

export interface RouteProps {
  name?: string;
  icon?: any;
  slug: string;
  permission?: string;
  sideBar?: boolean | undefined;
  component?: JSX.Element;
  superAdmin?: boolean | undefined;
  admin?: boolean | undefined;
  showDropdown?: boolean;
  routes?: RouteProps[];
}

export type Configs = Config[];

export interface Error {
  message: string;
}

export interface HandleTypingProps {
  setState: React.Dispatch<React.SetStateAction<{ value: string; error: string }>>;
  value: string;
}

export interface Group {
  id: string;
  name?: string;
  parent?: Group;
  usersCount?: number;
  children?: Group[];
  apps?: App[];
  role: string;
  inheritedApps?: App[];
  permissions?: GroupPermissions[];
  error?: string;
  users?: User[];
  municipalities?: string[];
}

export interface Municipality {
  id: string;
  name: string;
}

export interface App {
  id: string;
  name: string;
  type: Module;
  code?: string;
  permissions?: {
    role?: { label?: string; value?: string };
    features?: string[];
  };
}

export interface DeleteInfoProps {
  deleteButtonText?: string;
  deleteDescriptionFirstPart?: string;
  deleteDescriptionSecondPart?: string;
  deleteTitle?: string;
  deleteName?: string;
  handleDelete?: (props?: any) => void;
}

export interface Permission {
  id?: string;
  app?: App | string;
  role?: string;
  group?: Group | string;
  features: string[];
  accesses: string[];
}

export interface MapAppsProps {
  id: string;
  name: string;
  selected: boolean;
  count: number;
}

export interface GroupPermissions {
  id?: string;
  app?: string;
  role?: string;
  group?: string;
  features?: string[];
}

export interface TransformUser {
  id?: string;
  name?: string;
  role?: string;
  groups?: string;
  phone?: string;
  email?: string;
}

export interface TransformGroup {
  id?: string;
  name?: string;
  users?: string;
  modules?: string;
}

export interface Theme {
  colors: {
    disable?: string;
    primary: string;
    secondary: string;
    tertiary: string;
    transparent: string;
    danger: string;
    success: string;
    hover: {
      primary: string;
      secondary: string;
      tertiary: string;
      transparent: string;
      danger: string;
      success: string;
      card?: string;
    };
    sideBar: string;
    border: string;
    label: string;
    error: string;
  };
}

export interface Tenant {
  id: string;
  code: string;
  name: string;
  address?: string;
  email: string;
  phone: string;
  error?: string;
  [key: string]: any;
}

export interface InfoContainerProps {
  queryName: string;
  filter: { [key: string]: any };
  emptyStateText: string;
}

export interface ReactQueryError {
  response: {
    data: {
      type: string;
      message: string;
    };
  };
}

export type FeatureCollection = {
  type: 'FeatureCollection';
  features: Feature[];
};

export type Feature = {
  type: 'Feature';
  geometry: Geometry;
  properties?: GenericObject;
};
export type Geometry = {
  type: string;
  coordinates: CoordinatesTypes;
};
export type CoordinatesPoint = number[];
export type CoordinatesMultiPoint = CoordinatesPoint[];
export type CoordinatesLineString = CoordinatesPoint[];
export type CoordinatesMultiLineString = CoordinatesLineString[];
export type CoordinatesPolygon = CoordinatesLineString[];
export type CoordinatesMultiPolygon = CoordinatesPolygon[];

export type CoordinatesTypes =
  | CoordinatesPoint
  | CoordinatesLineString
  | CoordinatesPolygon
  | CoordinatesMultiPoint
  | CoordinatesMultiLineString
  | CoordinatesMultiPolygon;

export type GenericObject = {
  [key: string]: any;
};
