import { isEmpty } from 'lodash';
import TableStatusRowItem from '../../../components/fields/TableStatusRowItem';
import { TableRow, Tenant, User } from '../../../types';
import { formatDate, formatDateFrom, formatDateTo } from '../../../utils/format';
import { default as Api } from './api';
import { colorsByStatus } from './constants';
import { formStatusLabels, roleLabels } from './texts';
import {
  Category,
  Form,
  FormFilters,
  FormFiltersProps,
  Info,
  UserFilterProps,
  UserFilters,
} from './types';

export const getUserList = async () => {
  return await Api.getTenantUsers({
    pageSize: '99999',
  });
};

export const mapUserFilters = (filters: UserFilters): UserFilterProps => {
  let params: UserFilterProps = {};

  if (filters) {
    !!filters.firstName && (params.firstName = filters.firstName);
    !!filters.lastName && (params.lastName = filters.lastName);
  }
  return params;
};

export const mapFormFilters = (filters: FormFilters): FormFiltersProps => {
  let params: FormFiltersProps = {};

  if (filters) {
    filters?.nameLT && (params.nameLT = filters.nameLT);

    (!!filters.createdFrom || !!filters.createdTo) &&
      (params.createdAt = {
        ...(filters.createdFrom && {
          $gte: formatDateFrom(new Date(filters.createdFrom)),
        }),
        ...(filters.createdTo && {
          $lt: formatDateTo(new Date(filters.createdTo)),
        }),
      });

    !isEmpty(filters?.status) &&
      (params.status = { $in: filters?.status!?.map((state) => state.id) });

    filters?.tenant && (params.tenant = filters.tenant.id);
  }

  return params;
};

export const mapForms = (forms: Form[]): TableRow[] =>
  forms.map((form: Form) => {
    const tenant = form?.tenant?.name;
    const user = form?.createdBy
      ? form?.createdBy?.firstName! + ' ' + form?.createdBy?.lastName
      : tenant;
    return {
      id: form.id,
      name: form?.nameLT,
      createdAt: formatDate(form?.createdAt!),
      status: (
        <TableStatusRowItem
          info={[
            {
              label: formStatusLabels[form.status!],
              color: colorsByStatus[form.status!],
            },
          ]}
        />
      ),
      createdBy: user,
    };
  });

export const mapInfos = (additionalInfo: Info[]): TableRow[] =>
  additionalInfo.map((form: Info) => {
    return {
      id: form.id,
      name: form?.name,
    };
  });

export const mapCategories = (additionalInfo: Category[]): TableRow[] =>
  additionalInfo.map((category: Category) => {
    return {
      id: category.id,
      name: category?.name,
      ...(!isEmpty(category.children) && {
        children: mapCategories(category.children!),
      }),
    };
  });

export const mapUsersList = (usersList: User[]): TableRow[] =>
  usersList.map((user: User) => {
    return {
      id: user.id,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user?.email || '-',
      phone: user.phone || '-',
    };
  });

export const mapTenantsList = (tenantsList: Tenant[]): TableRow[] =>
  tenantsList.map((tenant: Tenant) => {
    return {
      id: tenant.id,
      name: tenant.name,
      code: tenant.code,
      email: tenant.email || '-',
      phone: tenant.phone || '-',
    };
  });

export const mapTenantUserFilters = (filters: UserFilters): UserFilterProps => {
  let params: UserFilterProps = {};

  if (filters) {
    !!filters.firstName && (params.firstName = filters.firstName);
    !!filters.lastName && (params.lastName = filters.lastName);
  }
  return params;
};

export const mapTenantUserQueries = (filters: UserFilters): UserFilterProps => {
  let params: UserFilterProps = {};

  if (filters) {
    !!filters.role && (params.role = filters.role.id);
  }
  return params;
};

export const getTenants = async (input: string, page: number) => {
  return await Api.getTenants({
    filter: { name: input },
    page,
  });
};

export const getAllUsers = async () => {
  return await Api.getUsers({ pageSize: '999999' });
};

export const getCategoriesOptions = async (input: string, page: number) => {
  return await Api.getCategories({
    filter: { name: input },
    query: { parent: { $exists: false } },
    page,
  });
};

export const getAdditionalInfoOption = async (input: string, page: number) => {
  return await Api.getAdditionalInfos({
    filter: { name: input },
    page,
  });
};
export const getVisitInfoOptions = async (input: string, page: number) => {
  return await Api.getVisitInfos({
    filter: { name: input },
    page,
  });
};

export const getSubCategoriesOptions = async (input: string, page: number, ids: []) => {
  return await Api.getCategories({
    filter: { name: input },
    query: { parent: { $in: ids } },
    page,
  });
};

export const getTenantsList = async (input: string, page: number, tenantIds: string[]) => {
  return await Api.getTenants({
    filter: JSON.stringify({ name: input, id: { $nin: tenantIds } }),
    query: { name: { $exists: true } },
    page,
  });
};

export const mapTenantUsersList = (usersList: User[]): TableRow[] =>
  usersList.map((user: User) => {
    return {
      id: user.id,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user?.email || '-',
      phone: user.phone || '-',
      role: roleLabels[user?.role!] || '-',
    };
  });
