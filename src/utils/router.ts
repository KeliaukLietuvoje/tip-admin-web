import { config as tourismConfig } from '../modules/tourism/utils/routes';
import { theme as TourismTheme } from '../modules/tourism/utils/theme';

import { Features as TourismFeatures } from '../modules/tourism/utils/features';
import { Accesses as UserAccesses } from '../modules/users/utils/accesses';
import { config as usersConfig } from '../modules/users/utils/routes';

import { theme as adminTheme } from '../styles';

import { Configs, Module, RoleType, RouteProps, User } from '../types';
import { constantsToOptions } from './functions';

export const config = (): Configs => {
  return [usersConfig, tourismConfig];
};

const mapRouters = (route: RouteProps, appType: Module, user: User) => {
  const userFeatures = user?.permissions?.[appType]?.features;

  route?.routes?.forEach((innerRoute, index) => {
    const isRouteWithChildren = !!innerRoute.routes;

    if (isRouteWithChildren && !!route?.routes) {
      route.routes[index] = mapRouters(innerRoute, appType, user);
    }
  });

  const routes = route?.routes?.filter((innerRoute) => {
    const routeChildren = innerRoute?.routes;
    const routeHasChildren = !!routeChildren;

    if (innerRoute?.superAdmin) {
      return user.type === RoleType.SUPER_ADMIN;
    }

    if (innerRoute?.admin) {
      const adminRoles = [RoleType.SUPER_ADMIN, RoleType.ADMIN];
      return adminRoles.includes(user?.type!);
    }

    if (routeHasChildren) {
      return routeChildren.length > 0;
    }
    return (
      (innerRoute?.permission && userFeatures?.includes(innerRoute?.permission)) ||
      userFeatures?.includes('*')
    );
  });

  return {
    ...route,
    routes,
  };
};

export const filteredRoutes = ({ user }: User) => {
  return config()
    .filter((route) => user.permissions && Object.keys(user.permissions).includes(route.type))
    .map((route) => mapRouters(route, route?.type, user));
};

export const Permissions = {
  [Module.USERS]: {
    accesses: constantsToOptions(UserAccesses),
    features: [],
  },
  [Module.TOURISM]: {
    accesses: [],
    features: constantsToOptions(TourismFeatures),
  },
};

export const themes = {
  vidinis: adminTheme,
  turizmas: TourismTheme,
};
