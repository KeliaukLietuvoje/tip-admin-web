import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';
import Cookies from 'universal-cookie';
import { SortFields } from '../../users/utils/constants';
import { Populations, Resources } from './constants';
import { Category, Form, FormFiltersProps, Info } from './types';
const cookies = new Cookies();

interface GetAllProps {
  resource: string;
  page?: number | string;
  populate?: string[];
  filter?: any;
  query?: any;
  pageSize?: string;
  search?: string;
  searchFields?: string[];
  sort?: string[];
  scope?: string;
  fields?: string[];
}

export interface GetAllResponse<T = any> {
  rows: T[];
  totalPages: number;
  page?: number | string;
  pageSize: number;
  total: number;
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
  id?: string;
  params?: any;
}

interface Create {
  resource: string;
  params?: any;
  config?: any;
}

interface TableList<T = any> {
  filter?: T;
  page?: number | string;
  pageSize?: string;
  isMy?: boolean;
  scope?: string;
  fields?: string[];
  resource?: Resources;
  search?: string;
  query?: any;
  id?: number | string;
  userId?: number | string;
}

class ApiClass {
  private readonly proxy: string = '/api';

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

  get = async ({
    resource,
    page,

    pageSize,
    ...rest
  }: GetAllProps) => {
    const config = {
      params: {
        pageSize: pageSize || 10,
        page: page || 1,
        ...rest,
      },
    };

    return this.errorWrapper(() => this.axios.get(`/${resource}`, config));
  };

  getAll = async ({ resource, ...rest }: GetAllProps) => {
    const config = {
      params: {
        ...rest,
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

    return this.errorWrapper(() => this.axios.get(`/${resource}${id ? `/${id}` : ''}`, config));
  };

  patch = async ({ resource, id, params }: Update) => {
    return this.errorWrapper(() => this.axios.patch(`/${resource}${id ? `/${id}` : ''}`, params));
  };

  delete = async ({ resource, id, params }: Delete) => {
    return this.errorWrapper(() =>
      this.axios.delete(`/${resource}${id ? `/${id}` : ''}`, {
        data: params,
      }),
    );
  };

  post = async ({ resource, params, config }: Create) => {
    return this.errorWrapper(() => this.axios.post(`/${resource}`, params));
  };

  getTenants = async ({ filter, page, query }: TableList) =>
    await this.get({
      resource: Resources.TENANTS,
      filter,
      query,
      sort: [SortFields.NAME],
      page,
    });

  createTenant = async (params: any) => {
    return await this.post({
      resource: Resources.TENANTS,
      params,
    });
  };

  updateTenant = async (params: any, id?: string) => {
    return await this.patch({
      resource: Resources.TENANTS,
      params,
      id,
    });
  };

  getTenant = async (id: string) =>
    await this.getOne({
      resource: Resources.TENANTS,
      id,
    });

  deleteTenant = async (id: string) =>
    await this.delete({
      resource: Resources.TENANTS,
      id,
    });

  getTenantUsers = async ({ filter, page, id, query }: TableList) =>
    await this.get({
      resource: `${Resources.TENANTS}/${id}/${Resources.USERS}`,
      filter,
      query,
      page,
    });

  getTenantUser = async (id: string, userId: string) =>
    await this.getOne({
      resource: `${Resources.TENANTS}/${id}/${Resources.USERS}`,
      id: userId,
    });

  createTenantUser = async (params: any, id: string, userId: string) => {
    return await this.post({
      resource: `${Resources.TENANTS}/${id}/${Resources.USERS}/${userId}`,
      params,
    });
  };

  updateTenantUser = async (params: any, id: string, userId: string) => {
    return await this.patch({
      resource: `${Resources.TENANTS}/${id}/${Resources.USERS}`,
      params,
      id: userId,
    });
  };

  deleteTenantUser = async (id: string, userId: string) =>
    await this.delete({
      resource: `${Resources.TENANTS}/${id}/${Resources.USERS}`,
      id: userId,
    });

  getUsers = async ({ filter, page, query, pageSize }: TableList) =>
    await this.get({
      resource: Resources.USERS,
      populate: [Resources.PROFILES],
      filter,
      sort: [SortFields.FIRST_NAME, SortFields.LAST_NAME],
      page,
      query,
      pageSize,
    });

  createUser = async (params: any) => {
    return await this.post({
      resource: Resources.USERS,
      params,
    });
  };

  updateUser = async (params: any, id?: string) => {
    return await this.patch({
      resource: Resources.USERS,

      params,
      id,
    });
  };

  getUser = async (id: string) =>
    await this.getOne({
      resource: Resources.USERS,
      populate: [Resources.PROFILES],
      id,
    });

  deleteUser = async (id: string) =>
    await this.delete({
      resource: Resources.USERS,
      id,
    });

  uploadFormPhotos = async (files: File[]) =>
    await this.uploadFiles({
      resource: Resources.FORMS,
      files,
    });

  uploadFiles = async ({
    resource,
    files = [],
  }: {
    resource: Resources;
    files: File[];
  }): Promise<any> => {
    if (isEmpty(files)) return [];

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    try {
      const data = await Promise.all(
        files?.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          const { data } = await this.axios.post(
            `/${resource}/${Resources.UPLOAD}`,
            formData,
            config,
          );
          return data;
        }),
      );

      return data?.map((file) => {
        return {
          name: file.filename,
          size: file.size,
          url: file?.url,
        };
      });
    } catch (e: any) {
      return { error: e.response.data.message };
    }
  };

  getForms = async ({
    filter,
    page,
    pageSize,
    query,
  }: TableList<FormFiltersProps>): Promise<GetAllResponse<Form>> =>
    await this.get({
      resource: Resources.FORMS,
      populate: [Resources.CREATED_BY, Populations.TENANT],
      sort: [SortFields.CREATED_AT],
      page,
      query,
      filter,
      pageSize,
    });

  getForm = async (id: string): Promise<Form> =>
    await this.getOne({
      resource: Resources.FORMS,
      populate: [
        Populations.VISIT_INFO,
        Populations.GEOM,
        Populations.CAN_EDIT,
        Populations.CAN_VALIDATE,
        Resources.ADDITIONAL_INFOS,
      ],
      id,
    });

  getCategories = async ({ filter, page, query }: TableList): Promise<GetAllResponse<Category>> =>
    await this.get({
      resource: Resources.CATEGORIES,
      populate: [Populations.CHILDREN],
      query: { parent: { $exists: false } },
      page,
      filter,
    });

  getAllCategories = async ({ filter, page }: TableList): Promise<Category[]> =>
    await this.getAll({
      resource: Resources.CATEGORIES,
      populate: [Populations.CHILDREN],
      query: { parent: { $exists: false } },
      fields: ['id', 'name', 'children'],
      page,
      filter,
    });

  getCategory = async (id: string): Promise<Category> =>
    await this.getOne({
      resource: Resources.CATEGORIES,
      populate: [Populations.PARENT],
      id,
    });

  createCategory = async (params: any): Promise<Category> => {
    return await this.post({
      resource: Resources.CATEGORIES,
      params,
    });
  };

  updateCategory = async (id: string, params: any): Promise<Category> => {
    return await this.patch({
      resource: Resources.CATEGORIES,
      params,
      id,
    });
  };

  getAdditionalInfos = async ({ filter, page, query }: TableList): Promise<any[]> =>
    await this.get({
      resource: Resources.ADDITIONAL_INFOS,
      query,
      page,
      filter,
    });

  getAdditionalInfo = async (id: string): Promise<Info> =>
    await this.getOne({
      resource: Resources.ADDITIONAL_INFOS,
      id,
    });

  createAdditionalInfo = async (params: Info): Promise<Info> => {
    return await this.post({
      resource: Resources.ADDITIONAL_INFOS,
      params,
    });
  };

  updateAdditionalInfo = async (id: string, params: Info): Promise<Info> => {
    return await this.patch({
      resource: Resources.ADDITIONAL_INFOS,
      params,
      id,
    });
  };

  getVisitInfos = async ({ filter, page, query }: TableList): Promise<any[]> =>
    await this.get({
      resource: Resources.VISIT_INFOS,
      query,
      page,
      filter,
    });

  getVisitInfo = async (id: string): Promise<Info> =>
    await this.getOne({
      resource: Resources.VISIT_INFOS,
      id,
    });

  createVisitInfo = async (params: any): Promise<Info> => {
    return await this.post({
      resource: Resources.VISIT_INFOS,
      params,
    });
  };

  updateVisitInfo = async (id: string, params: any): Promise<Info> => {
    return await this.patch({
      resource: Resources.VISIT_INFOS,
      params,
      id,
    });
  };

  createForm = async (params: any): Promise<Form> => {
    return await this.post({
      resource: Resources.FORMS,
      params,
    });
  };

  updateForm = async (id: string, params: any): Promise<Form> => {
    return await this.patch({
      resource: Resources.FORMS,
      params,
      id,
    });
  };

  formDisable = async (id: string): Promise<Form> => {
    return await this.patch({
      resource: `${Resources.FORMS}/${id}/disable`,
    });
  };

  deleteForm = async (id: string): Promise<Form> =>
    await this.delete({
      resource: Resources.FORMS,
      id,
    });

  deleteForms = async (params: any): Promise<Form> =>
    await this.delete({
      resource: Resources.FORMS,
      params,
    });

  getFormHistory = async ({ page, pageSize, id }: TableList) =>
    await this.get({
      resource: `${Resources.FORMS}/${id}/${Resources.HISTORY}`,
      page,
      pageSize,
    });

  getAdditionalInfoIcons = async () =>
    await this.get({
      resource: Resources.ICONS,
    });

  createIcon = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    return await this.post({
      resource: Resources.ICONS,
      params: formData,
      config,
    });
  };

  deleteIcon = async (icon: string) =>
    await this.delete({
      resource: `${Resources.ICONS}`,
      params: { url: icon },
    });
}

export default new ApiClass();
