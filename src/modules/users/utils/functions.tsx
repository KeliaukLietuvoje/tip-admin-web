import { isEmpty, map } from 'lodash';
import styled from 'styled-components';
import SimpleButton from '../../../components/buttons/SimpleButton';
import TableItem from '../../../components/fields/TableItem';
import { TableRow } from '../../../components/tables/MainTable';
import { App, Group, Module, Permission, User } from '../../../types';
import { isSuperAdmin } from '../../../utils/functions';
import { config } from '../../../utils/router';
import { accessLabels, featureLabels } from '../../../utils/texts';
import api from './api';
import { routes } from './routes';
import { buttonsTitles, roleLabels, url } from './texts';



export const filteredFeatures = (type?: string) => {
  const data = config()
    .filter((route) => route.type === type)
    .map((route) => route.routes.filter((route) => route.sideBar).map((route) => route.permission))
    .flat();

  return data;
};

export const filteredModules = (apps: App[]) => {
  return apps.filter((app) =>
    config()
      .map((module) => module.type)
      .includes(app.type),
  );
};

export const isCurrentUser = (userId?: string, currentUserId?: string) => {
  return userId === currentUserId?.toString();
};

export const canCRUDGroup = (parent?: string, currentUserRole?: string) => {
  return !!parent || isSuperAdmin(currentUserRole);
};

export const filterOutAdmin = (apps: any[]) => apps.filter((app) => app.type !== Module.ADMIN);

export const mapUsersList = (users: User[], navigate): TableRow[] =>
  users.map((user: User) => {
    const groups = !isEmpty(user.groups)
      ? user?.groups
          ?.map((group, index) => (
            <span key={`group-${index}`}>
              <Url
                onClick={() => {
                  navigate(
                    `${routes.groups}/${group.id}${`?page=1`}${
                      group.parent ? `&parent=${group.parent}` : ''
                    }`,
                  );
                }}
              >
                {group.name}
              </Url>{' '}
              ({roleLabels[group?.role]})
            </span>
          ))
          .reduce((previousElements: any[], currentElements: JSX.Element) => {
            return isEmpty(previousElements)
              ? [currentElements]
              : [...previousElements, ' , ', currentElements];
          }, [])
      : '-';

    return {
      id: user.id,
      name: (
        <Url
          onClick={() => {
            navigate(`${routes.users}/${user.id}`);
          }}
        >
          {user.fullName}
        </Url>
      ),
      groups,
      phone: user.phone,
      email: user.email,
      edit: (
        <SimpleButton
          onClick={() => {
            navigate(`${routes.users}/${user.id}`);
          }}
          text={buttonsTitles.edit}
          iconName={'edit'}
        />
      ),
    };
  });

export const mapGroupUsersList = (users: User[]): TableRow[] =>
  users.map((user: User) => {
    return {
      id: user.id,
      name: user.fullName,
      role: user?.role ? roleLabels[user?.role] : '-',
      phone: user.phone,
      email: user.email,
    };
  });

export const mapPermissionsList = (permissions: Permission[]): TableRow[] =>
  permissions.map((permission: Permission) => {
    const role = !!permission.role ? roleLabels[permission.role] : roleLabels.ALL;
    const accesses = permission.accesses?.map((access) => accessLabels[access]).join(', ');
    const features = permission.features?.map((feature) => featureLabels[feature]).join(', ');

    return {
      id: permission.id,
      role: role,
      accesses,
      group: (permission.group as Group)?.name,
      features,
      app: (permission.app as App)?.name,
      edit: (
        <TableItem
          label={buttonsTitles.edit}
          leftIconName="edit"
          url={`${routes.permission(permission?.id!)}`}
        />
      ),
    };
  });

export const mapGroupList = (groups: Group[]): TableRow[] => {
  return map(groups, (group: Group) => {
    const modules = !isEmpty(group.apps) ? group?.apps : group?.inheritedApps;
    const row: TableRow = {
      id: group.id,
      name: group.name,
      modules: `${isEmpty(group.apps) ? 'Paveldimi: ' : ''} ${filterOutAdmin(modules || [])
        ?.map((app: App) => app.name)
        .join(', ')}`,

      ...(!isEmpty(group.children) && {
        children: mapGroupList(group.children!),
      }),
    };
    return row;
  });
};

export const filterOutGroup = (groups: Group[], id?: string) => {
  if (!id) return;

  groups.forEach((group: Group, index: number) => {
    if (group.id == id) {
      groups.splice(index, 1);
    }
    if (group.children) {
      filterOutGroup(group.children, id);
    }
  });

  return groups;
};

const Url = styled.span`
  cursor: pointer;
`;

export const getGroupList = async (input: string, page: number) => {
  return await api.getGroupsFlat({
    filter: { name: input },
    page,
  });
};

export const mapUserQueries = (query: any): any => {
  let params: any = {};
  if (query) {
    !isEmpty(query?.group) &&
      (params.group = {
        $in: query?.group!?.map((group) => group.id),
      });
  }
  return params;
};

export const mapUserFilters = (filters: any): any => {
  let params: any = {};
  if (filters) {
    !!filters.firstName && (params.firstName = filters.firstName);
    !!filters.lastName && (params.lastName = filters.lastName);
    !!filters.email && (params.email = filters.email);
  }
  return params;
};
