export enum RoleType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum HydroPowerPlantType {
  DAM = 'DAM',
  DERIVATIVE = 'DERIVATIVE',
  FURROWS = 'FURROWS',
  OTHER = 'OTHER',
}

export enum FormType {
  NEW = 'NEW',
  EDIT = 'EDIT',
  REMOVE = 'REMOVE',
}

export enum FormProviderType {
  OWNER = 'OWNER',
  OTHER = 'OTHER',
  MANAGER = 'MANAGER',
}
export enum SubPoolTypes {
  LT1100 = 'LT1100',
  LT1111 = 'LT1111',
  LT1120 = 'LT1120',
  LT1121 = 'LT1121',
  LT1122 = 'LT1122',
  LT1130 = 'LT1130',
  LT1140 = 'LT1140',
  LT1150 = 'LT1150',
  LT1160 = 'LT1160',
  LT1170 = 'LT1170',
  LT3400 = 'LT3400',
  LT3410 = 'LT3410',
  LT3420 = 'LT3420',
}

export enum HistoryTypes {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  REJECTED = 'REJECTED',
  RETURNED = 'RETURNED',
  APPROVED = 'APPROVED',
  DELETED = 'DELETED',
}

export enum StatusTypes {
  CREATED = 'CREATED',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  RETURNED = 'RETURNED',
  REJECTED = 'REJECTED',
}

export enum RolesTypes {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum ServerErrors {
  USER_NOT_FOUND = `Email not found.`,
  WRONG_PASSWORD = 'Wrong password.',
  USER_EXIST = 'User already exists.',
  WRONG_OLD_PASSWORD = 'Wrong old password.',
  PARAMETERS_VALIDATION_ERROR = 'Parameters validation error!',
  NOT_FOUND = 'Not found.',
  ENTITY_NOT_FOUND = 'Entity not found',
}
export enum Resources {
  TENANT_USERS = 'tenantUsers',
  PROFILES = 'profiles',
  USERS = 'users',
  TENANTS = 'tenants',
  FORMS = 'forms',
  HISTORY = 'history',
  CREATED_BY = 'createdBy',
  UPLOAD = 'upload',
  CATEGORIES = 'categories',
  ADDITIONAL_INFOS = 'additionalInfos',
  VISIT_INFOS = 'visitInfos',
}

export enum Populations {
  ROLE = 'role',
  CAN_EDIT = 'canEdit',
  CAN_VALIDATE = 'canValidate',
  PARENT = 'parent',
  SUB_CATEGORIES = 'subCategories',
  GEOM = 'geom',
  VISIT_INFO = 'visitInfo',
  TENANT = 'tenant',
  CHILDREN = 'children',
}

export enum SortFields {
  CREATED_AT = '-createdAt',
  LAST_NAME = 'lastName',
  NAME = 'name',
}

export enum TagColors {
  BLUE = 'blue',
  BROWN = 'brown',
  GREEN = 'green',
  PINK = 'pink',
  VIOLET = 'violet',
  ORANGE = 'orange',
  SKYBLUE = 'skyblue',
  GREY = 'grey',
}

export const colorsByStatus = {
  [StatusTypes.CREATED]: TagColors.SKYBLUE,
  [StatusTypes.SUBMITTED]: TagColors.VIOLET,
  [StatusTypes.APPROVED]: TagColors.GREEN,
  [StatusTypes.RETURNED]: TagColors.BLUE,
  [StatusTypes.REJECTED]: TagColors.PINK,
};

export enum Season {
  WINTER = 'WINTER',
  SUMMER = 'SUMMER',
  SPRING = 'SPRING',
  AUTUMN = 'AUTUMN',
  ALL = 'ALL',
}
