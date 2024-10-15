import { Module } from '../types';

export const moduleRouteNames = {
  TOURISM: 'turizmas',
  ADMIN: 'admin',
};

export enum Resources {
  LOGIN = '/auth/login',
  REFRESH_TOKEN = '/auth/refresh',
  VERIFY_USER = '/auth/change/verify',
  SET_PASSWORD = '/auth/change/accept',
  REMIND_PASSWORD = '/auth/remind',
}

export enum ServerErrorMessages {
  USER_NOT_FOUND = `Email not found.`,
  WRONG_PASSWORD = 'Wrong password.',
  USER_EXIST = 'User already exists.',
  PARAMETERS_VALIDATION_ERROR = 'Parameters validation error!',
  NOT_FOUND = 'Not found.',
  ENTITY_NOT_FOUND = 'Entity not found',
}

export enum ServerErrorTypes {
  AUTH_USER_EXISTS = `AUTH_USER_EXISTS`,
  AUTH_USER_ASSIGNED = `AUTH_USER_ASSIGNED`,
  AUTH_COMPANY_EXISTS = 'AUTH_COMPANY_EXISTS',
  AUTH_INVALID_DATA = 'AUTH_INVALID_DATA',
  CANNOT_SEND_EMAIL = 'CANNOT_SEND_EMAIL',
  WRONG_OLD_PASSWORD = 'WRONG_OLD_PASSWORD',
}

export enum TagColors {
  BLUE = 'blue',
  BROWN = 'brown',
  GREEN = 'green',
  LIGHT_GREEN = 'lightGreen',
  PINK = 'pink',
  VIOLET = 'violet',
  ORANGE = 'orange',
  SKYBLUE = 'skyblue',
  GREY = 'grey',
}

export enum OwnerRequired {
  REQUIRED = 'REQUIRED',
  NOT_REQUIRED = 'NOT_REQUIRED',
  OPTIONAL = 'OPTIONAL',
}

export enum UrlPathToModule {
  USERS = 'vidinis',
  TOURISM = 'turizmas',
}

export const pathToModule = {
  [UrlPathToModule.USERS]: Module.USERS,
  [UrlPathToModule.TOURISM]: Module.TOURISM,
};

export enum Ids {
  ID = ':id',
  USER_ID = ':userId',
}

export enum TableItemWidth {
  MEDIUM = '76px',
  SMALL = '40px',
  LARGE = 'auto',
}

export enum ServerErrorCodes {
  NOT_FOUND = 404,
  NO_PERMISSION = 401,
}

export const mapsHost = import.meta.env.VITE_MAPS_HOST;

export const phoneNumberRegexPattern = new RegExp(`^(\\+370|8|0)(3|4|5|6|7|8|9)\\d{7}$`);
