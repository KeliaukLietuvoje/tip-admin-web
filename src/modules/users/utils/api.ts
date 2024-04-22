import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';
import { App, Group, Municipality, Permission, User } from '../../../types';
import { GroupProps } from '../pages/GroupForm';
import { UserProps } from '../pages/Profile';
import { UserFormProps } from '../pages/UserForm';
import { Populations, Resources, SortFields } from './constants';
const cookies = new Cookies();

interface GetAllProps {
  resource: string;
  page?: string;
  populate?: string[];
  filter?: string;
  query?: string;
  pageSize?: string;
  search?: string;
  searchFields?: string[];
  sort?: string[];
  scope?: string;
  fields?: string[];
}

export interface GetAllResponse<T> {
  rows?: T[];
  totalPages?: number;
  page?: number;
  pageSize?: number;
  error?: any;
}

interface GetOne {
  resource: string;
  id?: string;
  populate?: string[];
  scope?: string;
}
interface Update {
  resource?: string;
  id?: string;
  params?: any;
}

interface Delete {
  resource: string;
  id: string;
  params?: any;
}

interface Create {
  resource: string;
  params?: any;
}

interface TableList {
  filter?: string | any;
  query?: string | any;
  page?: string;
  id?: number | string;
  userId?: number | string;
  scope?: string;
  fields?: string[];
  resource?: Resources;
  pageSize?: string;
}

class Api {
  private readonly proxy: string = '/admin/api';

  private axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create();

    this.axios.interceptors.request.use(
      (config) => {
        if (!config.url) {
          return config;
        }
        const token = cookies.get('token');
        if (token) {
          config.headers!.Authorization = 'Bearer ' + token;
        }
        config.url = this.proxy + config.url;

        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );
  }

  errorWrapper = async (endpoint: () => Promise<AxiosResponse<any, any>>) => {
    const { data } = await endpoint();
    return data;
  };

  getList = async ({
    resource,
    page,
    populate,
    sort,
    filter,
    pageSize,
    search,
    query,
    scope,
    searchFields,
    fields,
  }: GetAllProps): Promise<any> => {
    const config = {
      params: {
        pageSize: pageSize || 10,
        ...(!!populate && { populate }),
        ...(!!searchFields && { searchFields }),
        ...(!!search && { search }),
        page: page || 1,
        ...(!!filter && { filter }),
        ...(!!sort && { sort }),
        ...(!!query && { query }),
        ...(!!scope && { scope }),
        ...(!!fields && { fields }),
      },
    };

    return this.errorWrapper(() => this.axios.get(`/${resource}`, config));
  };

  getAll = async ({
    resource,
    page,
    populate,
    sort,
    filter,
    pageSize,
    search,
    query,
    scope,
    searchFields,
    fields,
  }: GetAllProps): Promise<any> => {
    const config = {
      params: {
        pageSize: pageSize || 10,
        ...(!!populate && { populate }),
        ...(!!searchFields && { searchFields }),
        ...(!!search && { search }),
        page: page || 1,
        ...(!!filter && { filter }),
        ...(!!sort && { sort }),
        ...(!!query && { query }),
        ...(!!scope && { scope }),
        ...(!!fields && { fields }),
      },
    };

    return this.errorWrapper(() => this.axios.get(`/${resource}/all`, config));
  };

  getOne = async ({ resource, id, populate, scope }: GetOne) => {
    const config = {
      params: {
        ...(!!populate && { populate }),
        ...(!!scope && { scope }),
      },
    };

    return this.errorWrapper(() => this.axios.get(`/${resource}/${id}`, config));
  };

  update = async ({ resource, id, params }: Update) => {
    return this.errorWrapper(() => this.axios.patch(`/${resource}/${id}`, params));
  };

  delete = async ({ resource, id, params }: Delete) => {
    return this.errorWrapper(() =>
      this.axios.delete(`/${resource}/${id}`, {
        data: params,
      }),
    );
  };

  create = async ({ resource, params }: Create) => {
    return this.errorWrapper(() => this.axios.post(`/${resource}`, params));
  };

  getPermissions = async ({ page }): Promise<GetAllResponse<Permission>> =>
    await this.getList({
      resource: Resources.PERMISSIONS,
      populate: [Resources.APP, Resources.GROUP],
      page,
    });

  getPermission = async ({ id }): Promise<Permission> =>
    await this.getOne({
      resource: Resources.PERMISSIONS,
      populate: [Resources.APP],
      id,
    });

  createPermission = async ({ params }: { params: Permission }): Promise<Permission> =>
    await this.create({
      resource: Resources.PERMISSIONS,
      params,
    });

  updatePermission = async ({
    id,
    params,
  }: {
    id: string;
    params: Permission;
  }): Promise<Permission> =>
    await this.update({
      resource: Resources.PERMISSIONS,
      params,
      id,
    });

  getPermissionGroups = async (): Promise<GetAllResponse<Group>> =>
    await this.getList({
      resource: Resources.GROUPS,
      populate: [Populations.CHILDREN, Populations.INHERITED_APPS],
      pageSize: '99999',
    });

  getUserModule = async (): Promise<App> =>
    await this.getList({
      resource: Resources.USERS_APP,
    });

  deletePermission = async ({ id }): Promise<Permission> =>
    await this.delete({
      resource: Resources.PERMISSIONS,
      id,
    });

  deleteUser = async ({ id }): Promise<User> =>
    await this.delete({
      resource: Resources.USERS,
      id,
    });

  getUsers = async ({ page, filter, query }) =>
    await this.getList({
      resource: Resources.USERS,
      populate: [Resources.APPS, Resources.GROUPS],
      page,
      filter,
      query,
      sort: [SortFields.LAST_NAME],
    });

  getUser = async ({ id }) =>
    await this.getOne({
      resource: Resources.USERS,
      populate: [Resources.GROUPS, Populations.INHERITED_APPS],
      id,
    });

  createUser = async ({ params }: { params: UserFormProps }): Promise<User> =>
    await this.create({
      resource: Resources.USERS,
      params,
    });

  updateUser = async ({ params, id }: { params: UserFormProps; id: string }): Promise<User> =>
    await this.update({
      resource: Resources.USERS,
      params,
      id,
    });

  getGroups = async ({ page, filter, id }) =>
    await this.getList({
      resource: Resources.GROUPS,
      page,
      filter,
      query: JSON.stringify({ parent: id }),
      populate: [
        Resources.APPS,
        Populations.INHERITED_APPS,
        Populations.USERS_COUNT,
        Populations.CHILDREN,
      ],
      sort: [SortFields.NAME],
    });

  getGroupsFlat = async ({ page, filter }) =>
    await this.getList({
      resource: Resources.GROUPS_FLAT,
      page,
      filter,

      sort: [SortFields.NAME],
    });

  getGroup = async ({ id }): Promise<Group> =>
    await this.getOne({
      resource: Resources.GROUPS,
      populate: [
        Resources.APPS,
        Populations.INHERITED_APPS,
        Populations.USERS_COUNT,
        Resources.USERS,
        Populations.CHILDREN,
      ],
      id,
    });

  getFormGroup = async ({ canManageMunicipalities, id }): Promise<Group> => {
    const populate: string[] = [
      Resources.APPS,
      Populations.INHERITED_APPS,
      Populations.USERS_COUNT,
    ];
    if (canManageMunicipalities) {
      populate.push(Populations.MUNICIPALITIES);
    }

    return await this.getOne({
      resource: Resources.GROUPS,
      populate,
      id,
    });
  };

  getMunicipalities = async (): Promise<GetAllResponse<Municipality>> => {
    return await this.getList({
      resource: Resources.MUNICIPALITIES,
    });
  };

  getParentOfGroup = async (id: string): Promise<GetAllResponse<Group>> => {
    return await this.getOne({
      resource: Resources.GROUPS,
      populate: [Resources.APPS, Populations.INHERITED_APPS],
      id,
    });
  };

  getApps = async ({ query }): Promise<GetAllResponse<App>> =>
    await this.getList({
      resource: Resources.APPS,
      query,
    });

  getGroupsForGroup = async () =>
    await this.getList({
      resource: Resources.GROUPS,
      populate: [Populations.CHILDREN],
      sort: [SortFields.NAME],
      pageSize: '999',
    });

  getGroupsOptions = async () =>
    await this.getList({
      resource: Resources.GROUPS,
      populate: [Populations.CHILDREN, Populations.INHERITED_APPS],
      pageSize: '9999',
      sort: [SortFields.NAME],
    });

  createGroup = async ({ params }: { params: GroupProps }): Promise<Group> =>
    await this.create({
      resource: Resources.GROUPS,
      params,
    });

  updateGroup = async ({ params, id }: { params: GroupProps; id: string }): Promise<Group> =>
    await this.update({
      resource: Resources.GROUPS,
      params,
      id,
    });

  getParent = async ({ id }) =>
    await this.getOne({
      id,
      resource: Resources.GROUPS,
      populate: [Resources.APPS, Populations.PARENT],
    });

  deleteGroup = async ({ id, params }: { id: string; params?: { moveToGroup?: string } }) =>
    await this.delete({
      id,
      resource: Resources.GROUPS,
      params,
    });

  updateProfile = async ({ params, id }: { params: UserProps; id?: string }): Promise<User> =>
    await this.update({
      resource: Resources.USERS,
      params,
      id,
    });
}

export default new Api();
