import { isEmpty } from 'lodash';
import { App, Group, MapAppsProps } from '../../../types';
import { UserFormProps } from '../pages/UserForm';
import { filteredModules } from './functions';

interface AddAppProps {
  apps: MapAppsProps[];
  newApps: App[];
  init?: boolean;
  user: UserFormProps | undefined;
}

interface RemoveAppsProps {
  apps: MapAppsProps[];
  groupId?: string;
  groupOptions: Group[];
}

interface ToggleGroupsProps {
  option: string;
  apps: MapAppsProps[];
}

export const getGroupApps = (groupOptions: Group[], groupId: string | undefined): App[] | any => {
  if (!groupId) return [];

  const apps: App[] = [];
  const findApps = (options: Group[]) =>
    options.forEach((option: Group) => {
      if (option.id === groupId && option?.inheritedApps) {
        apps.push(...filteredModules(option?.inheritedApps));
      }
    });

  findApps(groupOptions);

  return apps;
};

export const getInheritedApps = (
  groupOptions: Group[],
  groupId: string | number | undefined,
): App[] | any => {
  if (!groupId) return [];

  const apps: App[] = [];
  const findApps = (options) =>
    options.forEach((option) => {
      if (option.id === groupId && option?.inheritedApps) {
        apps.push(...option.inheritedApps);
      }
      if (option.children) {
        findApps(option.children);
      }
    });

  findApps(groupOptions);

  return apps;
};

export const handleToggleApps = ({ option, apps }: ToggleGroupsProps): MapAppsProps[] => {
  return apps.map((app) => {
    if (app.id === option) {
      return { ...app, selected: !app.selected };
    }

    return app;
  });
};

export const handleAddApps = ({ apps, newApps, init, user }: AddAppProps): MapAppsProps[] => {
  return newApps.reduce((prev: MapAppsProps[], current) => {
    const index = prev?.findIndex((group) => group?.id === current.id);
    const isManuallySelectedApps = init && !isEmpty(user?.apps);

    if (index === -1) {
      prev.push({
        id: current.id,
        name: current.name,
        selected: isManuallySelectedApps ? !!user?.apps.includes(current?.id as any) : true,
        count: 1,
      });
    } else {
      prev[index].count++;
    }

    return prev;
  }, apps);
};

export const handleRemoveApps = ({
  apps,
  groupId,
  groupOptions,
}: RemoveAppsProps): MapAppsProps[] => {
  const groupApps: App[] = getInheritedApps(groupOptions, groupId);

  return apps
    .map((app) => {
      if (groupApps?.map((groupApp) => groupApp.id)?.includes(app.id)) {
        return { ...app, count: app.count - 1 };
      }

      return app;
    })
    .filter((app) => app.count > 0);
};
