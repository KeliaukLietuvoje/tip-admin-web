import { RoleType } from '../../../types';
import { ServerErrorMessages, ServerErrorTypes, TableItemWidth } from '../../../utils/constants';

export const pageTitles = {
  users: 'Naudotojai',
  permissions: 'Teisės',
  newPermission: 'Nauja teisė',
  updatePermission: 'Redaguoti teisę',
  groups: 'Grupės',
  newUser: 'Naujas naudotojas',
  updateUser: 'Redaguoti naudotoją',
  newGroup: 'Nauja grupė',
  updateGroup: 'Redaguoti grupę',
  updateProfile: 'Atnaujinti profilį',
  changePassword: 'Pakeisti slaptažodį',
  directives: 'Direktyvos',
};

export const roleLabels = {
  [RoleType.USER]: 'Naudotojas',
  [RoleType.SUPER_ADMIN]: 'Super administratorius',
  [RoleType.ADMIN]: 'Administratorius',
  [RoleType.ALL]: 'Visi',
};

export const buttonsTitles = {
  newUser: 'Naujas naudotojas',
  users: 'Nariai',
  newPermission: 'Nauja teisė',
  save: 'Išsaugoti',
  back: 'Grįžti atgal',
  generate: 'Generuoti',
  newGroups: 'Nauja grupė',
  edit: 'Atnaujinti',
  view: 'Peržiūrėti',
  deleteUser: 'Ištrinti naudotoją',
  deleteGroup: 'Ištrinti grupę',
  deletePermission: 'Ištrinti teisę',
};

export const emptyState = {
  users: 'Jūs neturite Naudotojų. Sukurkite ',
  groupUsers: 'Grupė neturi Naudotojų. Sukurkite ',
  groups: 'Jūs neturite jokių grupių. Sukurkite ',
  groupGroups: 'Grupė neturi grupių. Sukurkite ',
  permissions: 'Jūs neturite jokių teisių. Sukurkite ',
};

export const emptyStateUrl = {
  user: 'naują naudotoją.',
  groupUser: 'grupei naują naudotoją.',
  group: 'naują grupę.',
  permission: 'naują teisę',
};

export const url = {
  new: 'naujas',
};

export const validationTexts = {
  requiredText: 'Privalomas laukelis',
  cantSelectAllOptions: 'Negalite pasirinkti visų meniu prieigų',
  doesNotMeetRequirements: 'Slaptažodis neatitinka reikalavimų',
  validFirstName: 'Įveskite taisyklingą vardą',
  validLastName: 'Įveskite taisyklingą pavardę',
  oneModule: 'Reikia pasirinkti bent vieną modulį!',
  requiredSelect: 'Privalote pasirinkti',
  badEmailFormat: 'Blogas el. pašto formatas',
  [ServerErrorMessages.USER_EXIST]: 'Naudotojas su tokiu el. paštu jau egzistuoja',
  [ServerErrorTypes.WRONG_OLD_PASSWORD]: 'Blogas senas slaptažodis',
  [ServerErrorMessages.NOT_FOUND]: 'Niekas nerasta pagal užklausą',
  [ServerErrorMessages.ENTITY_NOT_FOUND]: 'Niekas nerasta pagal užklausą',
  passwordsDoNotMatch: 'Slaptažodžiai nesutampa',
  badPhoneFormat: 'Blogai įvestas telefono numeris',
  emailExist: 'Naudotojas su tokiu el. paštu egzistuoja',
  error: 'Įvyko nenumatyta klaida, prašome pabandyti vėliau',
  moduleHasNoFeatures: 'Šiuo metu teisių negalima kurti šiai grupei.',
  profileUpdated: 'Profilis atnaujintas',
};

export const userLabels = {
  name: { label: 'Naudotojas', show: true },
  groups: { label: 'Grupės', show: true },
  phone: { label: 'Telefonas', show: true },
  email: { label: 'El. paštas', show: true },
  edit: { label: '', show: true, width: TableItemWidth.MEDIUM },
};

export const groupUserLabels = {
  name: { label: 'Naudotojas', show: true },
  role: { label: 'Rolė', show: true },
  phone: { label: 'Telefonas', show: true },
  email: { label: 'El. paštas', show: true },
};

export const permissionLabels = {
  group: { label: 'Grupė', show: true },
  app: { label: 'Modulis', show: true },
  features: { label: 'Modulio meniu prieiga', show: true },
  accesses: { label: 'Modulio  prieiga', show: true },
  role: { label: 'Rolė', show: true },
  edit: { label: '', show: true, width: TableItemWidth.MEDIUM },
};

export const groupLabels = {
  name: { label: 'Grupės pavadinimas', show: true },
  modules: { label: 'Moduliai', show: true },
};

export const groupFilterLabels = {
  name: 'Grupės pavadinimas',
};

export const userFilterLabels = {
  firstName: 'Vardas',
  lastName: 'Pavardė',
  email: 'El. paštas',
  groups: 'Grupės',
};

export const inputLabels = {
  name: 'Pavadinimas',
  firstName: 'Vardas',
  lastName: 'Pavardė',
  oldPassword: 'Senas slaptažodis',
  newPassword: 'Naujas slaptažodis',
  repeatNewPassword: 'Pakartokite naują slaptažodį',
  phone: 'Telefonas',
  email: 'El. pašto adresas',
  group: 'Grupė',
  role: 'Rolė',
  module: 'Modulis',
  moduleSelection: 'Modulių pasirinkimas',
  features: 'Modulio meniu prieiga',
  accesses: 'Teisės modulyje',
  municipalities: 'Savivaldybės',
};

export const descriptions = {
  deleteUsersWithGroup: 'Ką reikėtų daryti su šiai grupei priskirtais naudotojais?',
};

export const formLabels = {
  groupInfo: 'Informacija apie grupę',
  userInfo: 'Informacija apie naudotoją',
  profileInfo: 'Profilio informacija',
  roles: 'Rolės',
  moduleAccess: 'Prieiga prie modulių',
  permissions: 'Teisės',
  changePassword: 'Pakeisti slaptažodį',
  groupUsers: 'Grupės naudotojai',
};

export const deleteTitles = {
  group: 'Ištrinti grupę',
  permission: 'Ištrinti teisę',
  user: 'Ištrinti naudotoją',
};

export const deleteDescriptionFirstPart = {
  group: 'Ar esate tikri, kad norite ištrinti ',
  permission: 'Ar esate tikri, kad norite ištrinti ',
  user: 'Ar esate tikri, kad norite ištrinti ',
};

export const deleteDescriptionSecondPart = {
  group: ' grupę?',
  permission: 'teisę?',
  user: ' paskyrą?',
};
