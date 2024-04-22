import { Resources } from './constants';
import { slugs } from './slugs';

export const userTabs = [
  {
    label: 'Turizmo objektai',
    value: Resources.FORMS,
  },
];

export const tenantsTabs = [
  { label: 'Įmonės', value: Resources.TENANTS, route: slugs.tenants },
  { label: 'Naudotojai', value: Resources.USERS, route: slugs.users },
];

export const getTenantTabs = (id: string) => [
  {
    label: 'Nariai',
    value: Resources.TENANT_USERS,
    route: slugs.tenantUsers(id),
  },
  {
    label: 'Turizmo objektai',
    value: Resources.FORMS,
    route: slugs.tenantForms(id),
  },
];

export const getUserTabs = (id: string) => [
  {
    label: 'Formos',
    value: Resources.FORMS,
    route: slugs.userForms(id),
  },
];

export const settingTabs = [
  {
    label: 'Kategorijos',
    value: Resources.CATEGORIES,
    route: slugs.categories,
  },
  {
    label: 'Papildomos informacijos',
    value: Resources.ADDITIONAL_INFOS,
    route: slugs.additionalInfos,
  },
  {
    label: 'Lankymo informacijos',
    value: Resources.VISIT_INFOS,
    route: slugs.visitInfos,
  },
];
