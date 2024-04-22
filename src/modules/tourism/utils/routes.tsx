import { Module } from '../../../types';
import { Ids } from '../../../utils/constants';
import { mapSlug } from '../../../utils/functions';
import AdditionalInfoForm from '../pages/AdditionalInfoForm';
import AdditionalInfos from '../pages/AdditionalInfos';
import Categories from '../pages/Categories';
import CategoryForm from '../pages/CategoriesForm';
import FormPage from '../pages/Form';
import Forms from '../pages/Forms';
import TenantForm from '../pages/NewTenant';
import TenantUserForm from '../pages/NewTenantUserForm';
import TenantMembers from '../pages/Tenant';
import Tenants from '../pages/Tenants';
import UpdateTenantForm from '../pages/UpdateTenant';
import UpdateUser from '../pages/UpdateUser';
import UserForm from '../pages/User';
import Users from '../pages/Users';
import VisitInfoForm from '../pages/VisitInfoForm';
import VisitInfos from '../pages/VisitInfos';
import { Features } from './features';
import { slugs } from './slugs';
import { pageTitles } from './texts';

export const config = {
  name: 'Turizmas',
  description: 'turizmas',
  slug: '/turizmas',
  type: Module.TOURISM,
  routes: [
    {
      name: pageTitles.forms,
      slug: mapSlug(slugs.forms),
      sideBar: true,
      permission: Features.TOURISM_FORMS,
      component: <Forms />,
    },
    {
      slug: mapSlug(slugs.form(Ids.ID)),
      permission: Features.TOURISM_FORMS,
      component: <FormPage />,
    },

    {
      slug: mapSlug(slugs.users),
      permission: Features.TOURISM_USERS,
      component: <Users />,
    },
    {
      name: pageTitles.users,
      slug: mapSlug(slugs.tenants),
      permission: Features.TOURISM_USERS,
      sideBar: true,
      component: <Tenants />,
    },
    {
      slug: mapSlug(slugs.userForms(Ids.ID)),
      permission: Features.TOURISM_USERS,
      component: <UserForm />,
    },

    {
      slug: mapSlug(slugs.updateUser(Ids.ID)),
      permission: Features.TOURISM_USERS,
      component: <UpdateUser />,
    },
    {
      slug: mapSlug(slugs.newTenant),
      permission: Features.TOURISM_USERS,
      component: <TenantForm />,
    },
    {
      slug: mapSlug(slugs.tenantUsers(Ids.ID)),
      permission: Features.TOURISM_USERS,
      component: <TenantMembers />,
    },
    {
      slug: mapSlug(slugs.tenantForms(Ids.ID)),
      permission: Features.TOURISM_USERS,
      component: <TenantMembers />,
    },

    {
      slug: mapSlug(slugs.newTenantUser(Ids.ID)),
      permission: Features.TOURISM_USERS,
      component: <TenantUserForm />,
    },
    {
      slug: mapSlug(slugs.updateTenant(Ids.ID)),
      permission: Features.TOURISM_USERS,
      component: <UpdateTenantForm />,
    },
    {
      name: pageTitles.settings,
      slug: mapSlug(slugs.categories),
      permission: Features.TOURISM_FORMS,
      sideBar: true,
      component: <Categories />,
    },
    {
      slug: mapSlug(slugs.category(Ids.ID)),
      permission: Features.TOURISM_FORMS,
      component: <CategoryForm />,
    },

    {
      slug: mapSlug(slugs.visitInfos),
      permission: Features.TOURISM_FORMS,
      component: <VisitInfos />,
    },
    {
      slug: mapSlug(slugs.visitInfo(Ids.ID)),
      permission: Features.TOURISM_FORMS,
      component: <VisitInfoForm />,
    },
    {
      slug: mapSlug(slugs.additionalInfos),
      permission: Features.TOURISM_FORMS,
      component: <AdditionalInfos />,
    },
    {
      slug: mapSlug(slugs.additionalInfo(Ids.ID)),
      permission: Features.TOURISM_FORMS,
      component: <AdditionalInfoForm />,
    },
  ],
};
