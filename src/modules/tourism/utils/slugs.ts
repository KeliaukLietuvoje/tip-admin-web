export const slugs = {
  users: '../naudotojai',
  newUser: '../naudotojai/naujas',
  userForms: (id: string) => `../naudotojai/${id}/teikimo-anketos`,
  updateUser: (id: string) => `../naudotojai/${id}`,
  forms: `../anketos`,
  newForm: `../anketos/naujas`,
  form: (id: string) => `../anketos/${id}`,
  tenants: '../naudotojai/imones',
  tenantUsers: (id: string) => `../naudotojai/imones/${id}/nariai`,
  tenantForms: (id: string) => `../naudotojai/imones/${id}/teikimo-anketos`,
  updateTenant: (id: string) => `../naudotojai/imones/${id}`,
  newTenantUser: (id: string) => `../naudotojai/imones/${id}/nariai/naujas`,
  newTenant: `../imones/naujas`,
  categories: `../nustatymai/kategorijos`,
  newCategory: `../nustatymai/kategorijos/naujas`,
  category: (id: string) => `../nustatymai/kategorijos/${id}`,
  additionalInfos: `../nustatymai/papildomos-informacijos`,
  newAdditionalInfo: `../nustatymai/papildomos-informacijos/naujas`,
  additionalInfo: (id: string) => `../nustatymai/papildomos-informacijos/${id}`,
  visitInfos: `../nustatymai/lankymo-informacijos`,
  newVisitInfo: `../nustatymai/lankymo-informacijos/naujas`,
  visitInfo: (id: string) => `../nustatymai/lankymo-informacijos/${id}`,
  visitTimes: `../nustatymai/lankymo-laikai`,
  newVisitTime: `../nustatymai/lankymo-laikai/naujas`,
  visitTime: (id: string) => `../nustatymai/lankymo-laikai/${id}`,
};