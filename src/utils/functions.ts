import { toast } from 'react-toastify';
import { FilterConfig } from '../components/other/DynamicFilter/Filter';
import { Columns, Config, RoleType, User } from '../types';
import { serverErrorTypeLabels, validationTexts } from './texts';

interface SetResponseProps {
  endpoint: () => Promise<any>;
  onSuccess?: (data: any) => void;
  onError?: (data: any) => void;
}

interface HandlePaginationProps {
  data: any[];
  page: string;
  pageSize: number;
}

export interface Path {
  id: string;
  name: string;
}
export interface PathProps {
  group: any;
  path?: Path[];
}

export const mapSlug = (slug: string) => slug.replace('../', '');

export const getFeatures = (config: Config) => {
  const features: (
    | {
        id: string | undefined;
        label: string | undefined;
      }
    | undefined
  )[] = [];

  return config?.routes
    ?.filter((route) => route?.sideBar)
    .forEach((route) => {
      features.push({ id: route.permission, label: route.name });
    });
};

export const handlePagination = ({ data, page = '1', pageSize }: HandlePaginationProps) => {
  const start = (parseInt(page) - 1) * pageSize;
  const end = parseInt(page) * pageSize;
  const totalPages = Math.ceil(data.length / pageSize);
  const slicedData = data.slice(start, end);

  return { totalPages, slicedData };
};

export const handleResponse = async ({ endpoint, onSuccess, onError }: SetResponseProps) => {
  const response = await endpoint();

  if (onError && response?.error) {
    return onError(
      serverErrorTypeLabels[response?.error?.type] ||
        validationTexts[response?.error?.message] ||
        validationTexts.error,
    );
  }

  if (!response || response?.error) {
    return handleError(response?.error?.type);
  }

  if (onSuccess) {
    return onSuccess(response);
  }

  return response;
};

export const getErrorMessage = (error) =>
  validationTexts[error] || serverErrorTypeLabels[error] || validationTexts.error;

export const handleError = (responseError?: string) => {
  toast.error(getErrorMessage(responseError), {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
  });
};

export const handleSuccess = (message: string) => {
  toast.success(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
  });
};

export const isNew = (id: string | undefined) => {
  return id === 'naujas' || !id;
};

export const handleDateRestriction = (filter: FilterConfig, values: any) => {
  const key = filter.key;
  const includesFrom = key.includes('From');
  const includesTo = key.includes('To');
  const dateTo = key.replace(/From$/, 'To');
  const dateFrom = key.replace(/To$/, 'From');
  return {
    ...(includesFrom &&
      values[dateTo] && {
        maxDate: new Date(values[dateTo]),
      }),
    ...(includesTo &&
      values[dateFrom] && {
        minDate: new Date(values[dateFrom]),
      }),
  };
};

export const hasPermission = (user: User, roles: RoleType[]) => {
  return user.type && roles.includes(user.type);
};

export const isSuperAdmin = (currentUserRole?: string) => currentUserRole === RoleType.SUPER_ADMIN;

export const validateFileSizes = (files: File[]) => {
  const maxSize = 20;
  for (let i = 0; i < files.length; i++) {
    const fileSizeToMb = files[i].size / 1024 / 1024;
    if (fileSizeToMb > maxSize) {
      return false;
    }
  }

  return true;
};

export const validateFileTypes = (files: File[], availableMimeTypes: string[]) => {
  for (let i = 0; i < files.length; i++) {
    const availableType = availableMimeTypes.find((type) => type == files[i].type);
    if (!availableType) return false;
  }
  return true;
};

export const mapLabels = (columns: Columns) =>
  Object.keys(columns).reduce((obj, key) => {
    const isVisible = !columns[key].hasOwnProperty('visible') || columns[key].visible;
    if (columns[key].show && isVisible) {
      obj[key] = columns[key].label;
    }
    return obj;
  }, {});

export const sortDesktop = (columns: Columns, key: string, key2: string) => {
  if (columns[key].desktopOrder && columns[key2].desktopOrder) {
    return columns?.[key]?.desktopOrder! > columns?.[key2]?.desktopOrder! ? 1 : -1;
  }

  return 0;
};

export const sortMobile = (columns: Columns, key: string, key2: string) => {
  if (columns[key].mobileOrder && columns[key2].mobileOrder) {
    return columns?.[key]?.mobileOrder! > columns?.[key2]?.mobileOrder! ? 1 : -1;
  }

  return sortDesktop(columns, key, key2);
};

export const getSortedColumns = (columns: Columns, isMobile: boolean) =>
  Object.keys(columns)
    .sort((key, key2) =>
      isMobile ? sortMobile(columns, key, key2) : sortDesktop(columns, key, key2),
    )
    .reduce((obj, key) => {
      const isVisible = !columns[key].hasOwnProperty('visible') || columns[key].visible;

      if (isVisible) {
        obj[key] = columns[key];
      }
      return obj;
    }, {});

export const getActiveColumns = (orderedColumns: Columns) =>
  Object.keys(orderedColumns).reduce((obj, key) => {
    if (orderedColumns[key].show) {
      obj[key] = orderedColumns[key];
    }
    return obj;
  }, {});

export const handleToggleColumns = (columns: Columns, key: string) => {
  columns[key].show = !columns[key].show;
};

export const handleSetVisibleColumns = (columns: Columns, items: { [key: string]: boolean }) => {
  const keys = Object.keys(items);

  keys.forEach((key) => {
    columns[key].visible = items[key];
  });
};

export const validateImageTypes = (files: File[], availableMimeTypes: string[]) => {
  for (let i = 0; i < files.length; i++) {
    const availableType = availableMimeTypes.find((type) => type == files[i].type);
    if (!availableType) return false;
  }
  return true;
};

export const bytesToMb = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'n/a';

  const sizeArrayIndex = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10);
  if (sizeArrayIndex === 0) return `${bytes} ${sizes[sizeArrayIndex]})`;
  return `${(bytes / 1024 ** sizeArrayIndex).toFixed(1)} ${sizes[sizeArrayIndex]}`;
};

export const handleGenerateBreadcrumbsPath = ({
  group,
  path = [],
}: PathProps): { id: string; name: string }[] | undefined => {
  if (!group?.id || !group?.name) return;

  if (!group.parent) {
    path.push({ id: group.id, name: group.name });
    return path;
  } else {
    handleGenerateBreadcrumbsPath({ group: group.parent, path });
    path.push({ id: group.id, name: group.name });
    return path;
  }
};

export const handleUpdateSimpleForm = ({ key, values, value, errors }) => {
  return {
    values: { ...values, [key]: value },
    errors: { ...errors, [key]: '' },
  };
};

export const validateSimpleForm = (requiredValues, values) => {
  let errors: any = {};
  Object.keys(requiredValues)
    .slice(0, -1)
    .forEach((key) => {
      if (!values[key]) {
        errors[key] = validationTexts.requireText;
      }
    });

  return errors;
};

export const constantsToOptions = (constants: { [key: string]: string }) =>
  Object.values(constants);
