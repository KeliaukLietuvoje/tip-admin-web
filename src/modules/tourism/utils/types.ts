import { FeatureCollection, Tenant, User } from '../../../types';
import { HistoryTypes, RoleType, Season, StatusTypes } from './constants';

export interface AuthState {
  loggedIn: boolean;
}

export interface TenantFilters {
  name?: string;
  code?: string;
}

export interface DeleteInfoProps {
  deleteButtonText: string;
  deleteDescriptionFirstPart: string;
  deleteDescriptionSecondPart: string;
  deleteTitle: string;
  deleteName: string;
  deleteFunction?: () => void;
}

export interface UserFilters {
  firstName?: string;
  lastName?: string;
  tenant?: Tenant[];
  role?: { id: RoleType; label: string };
}

export interface UserFilterProps {
  firstName?: string;
  lastName?: string;
  role?: string;
  tenant?: { $in: (string | undefined)[] };
}

export interface Category {
  id?: number;
  name: string;
  nameEn: string;
  parent?: Category;
  children?: Category[];
}

export interface Info {
  id?: number;
  name: string;
  nameEn?: string;
}

export interface VisitDuration {
  from: string;
  to: string;
  isAllDay: boolean;
}

export interface Form {
  id: number;
  visitDuration: VisitDuration;
  visitInfo: Info;
  seasons: Season[];
  description: string;
  name: string;
  descriptionLT: string;
  nameLT: string;
  urlLT: string;
  audioLT: string;
  url: string;
  audio: string;
  additionalInfos: Info[];
  status: string;
  geom: FeatureCollection;
  isPaid: boolean;
  isActive: boolean;
  isPublic: boolean;
  isAdaptedForForeigners: boolean;
  categories: Category[];
  subCategories: Category[];
  createdBy?: User;
  tenant?: Tenant;
  createdAt?: Date;
  canEdit?: boolean;
  canValidate?: boolean;
  photos?: any[];
}

export interface FormHistory {
  type: HistoryTypes;
  comment: string;
  createdBy: User;
  createdAt: Date;
}

export interface Group {
  id?: string;
  parent?: Group;
  children?: Group[];
  name: string;
}

export interface FormFiltersProps {
  tenant?: string | number;
  createdAt?: { $gte?: Date; $lt?: Date };
  status?: { $in: StatusTypes[] };
  code?: string;
  nameLT?: string;
}

export interface FormFilters {
  createdFrom?: string;
  code?: string;
  status?: { id: StatusTypes; label: string }[];
  nameLT?: string;
  createdTo?: string;
  tenant?: Tenant;
  createdBy?: User;
}
