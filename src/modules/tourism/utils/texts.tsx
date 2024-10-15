import { ButtonColors } from '../../../components/buttons/Button';
import { HistoryTypes, RoleType, Season, StatusTypes } from './constants';

export const formFiltersLabels = {
  dateFrom: 'Data nuo',
  name: 'Pavadinimas',
  dateTo: 'Data iki',
  createdFrom: 'Sukūrimo data nuo',
  createdTo: 'Sukūrimo data iki',
  observedFrom: 'pateikimo data nuo',
  observedTo: 'pateikimo data iki',
  state: 'Statusas',
  status: 'Būsena',
  tenant: 'Įmonė',
};

export const userFilterLabels = {
  firstName: 'Vardas',
  lastName: 'Pavardė',
  email: 'Elektroninis paštas',
  role: 'Teisė',
};

export const tenantFilterLabels = {
  tenant: 'Įmonė',
  code: 'Kodas',
};

export const usersLabels = {
  fullName: { label: 'Vardas, pavardė', show: true },
  email: { label: 'Elektroninis paštas', show: true },
  phone: { label: 'Telefono numeris', show: true },
};

export const tenantUsersLabels = {
  fullName: { label: 'Vardas, pavardė', show: true },
  email: { label: 'Elektroninis paštas', show: true },
  role: { label: 'Teisė', show: true },
};

export const tenantsLabels = {
  name: { label: 'Įmonė', show: true },
  code: { label: 'Kodas', show: true },
  email: { label: 'El. Paštas', show: true },
  phone: { label: 'Telefono numeris', show: true },
};

export const formTableLabels = {
  name: {
    label: 'Pavadinimas',
    mobileOrder: 1,
    desktopOrder: 1,
    show: true,
  },
  createdAt: {
    label: 'Duomenų įvedimo data',
    mobileOrder: 3,
    desktopOrder: 2,
    show: true,
  },
  createdBy: {
    label: 'Sukūrė',
    mobileOrder: 4,
    desktopOrder: 3,
    show: true,
  },
  status: {
    label: 'Būsena',
    mobileOrder: 2,
    desktopOrder: 7,
    show: true,
  },
};

export const infoTableLabels = {
  name: {
    label: 'Pavadinimas',
    mobileOrder: 1,
    desktopOrder: 1,
    show: true,
  },
};

export const tabLabels = {
  relevant: 'Aktualios',
  irrelevant: 'Neaktualios',
};

export const pageTitles = {
  settings: 'Nustatymai',
  categories: 'Kategorijos',
  additionalInfos: 'Papildomos informacijos',
  visitInfos: 'Lankymo informacijos',
  visitTimes: 'Lankymo laikai',
  newForm: 'Naujas turizmo objektas',
  newUser: 'Naujas naudotojas',
  updateUser: 'Atnaujinti naudotoją',
  newCategory: 'Naujas kategorija',
  updateCategory: 'Atnaujinti kategoriją',
  newAdditionalInfo: 'Nauja papildoma informacija',
  updateAdditionalInfo: 'Atnaujinti papildoma informaciją',
  newVisitInfo: 'Nauja lankymo informacija',
  updateVisitInfo: 'Atnaujinti lankymo informaciją',
  newVisitTime: 'Naujas lankymo laikas',
  updateVisitTime: 'Atnaujinti lankymo laiką',
  users: 'Naudotojai',
  tenants: 'Įmonės',
  forms: 'Turizmo objektai',
  newTenant: 'Nauja įmonė',
};

export const descriptions = {
  forms:
    'Duomenų ir informacijos teikimas Lietuvos Respublikos upių, ežerų ir tvenkinių kadastro objektų tikslinimui ar naujų objektų registravimui.',
  requests:
    'Informacijos apie Lietuvos Respublikos upių, ežerų ir tvenkinių kadastro objektus gavimas.',
};

export const buttonsTitles = {
  newForm: 'Nauja turizmo objektas',
  newCategory: 'Nauja kategorija',
  newAdditionalInfo: 'Nauja papildoma informacija',
  newVisitInfo: 'Nauja lankymo informacija',
  newVisitTime: 'Naujas lankymo laikas',
  delete: 'Pašalinti',
  update: 'Atnaujinti',
  add: 'Pridėti',
  newTenant: 'Nauja įmonė',
  addNew: '+ Pridėti naują',
  submit: 'Pateikti',
  createNew: 'Sukurti naują',
  newTenantUser: 'Naujas narys',
  newUser: 'Naujas naudotojas',
  save: 'Išsaugoti',
  back: 'Grįžti atgal',
  edit: 'Atnaujinti',
  approve: 'Tvirtinti',
  return: 'Grąžinti taisymui',
  reject: 'Atmesti',
  importData: 'Įkelti duomenis',
  cancel: 'Atšaukti',
  removeForm: 'Pašalinti turizmo objektą',
};

export const deleteDescriptionFirstPart = {
  delete: 'Ar esate tikri, kad norite ištrinti ',
};

export const deleteDescriptionSecondPart = {
  tenant: 'įmonę',
  form: 'turizmo objektą?',
  user: 'naudotoją',
};

export const deleteTitles = {
  tenant: 'Ištrinti įmonę',
  form: 'Pašalinti turizmo objektą',
  user: 'Ištrinti naudotoją',
};

export const formLabels = {
  info: 'Informacija',
  history: 'Istorija',
  tenantUserInfo: 'Darbuotojo kontaktinė informacija',
  name: 'Pavadinimas',
  description: 'Aprašymas',
  gallery: 'Galerija',
  profileUpdated: 'Profilis atnaujintas',
  map: 'Žemėlapis',
  photos: 'Nuotraukos',
  additionalInfo: 'Papildoma informacija',
  infoAboutUser: 'Informacija apie naudotoją',
  otherInfo: 'Kita papildoma informacija',
  categories: 'Kategorijos',
  LTInfo: 'Lietuviška informacija',
  EnInfo: 'Angliška informacija',
  visitDuration: 'Lankymo trukmė (valandos)',
};

export const inputLabels = {
  allDay: 'Visa diena',
  copy: 'Kopijuoti',
  from: 'Nuo',
  to: 'Iki',
  visitTime: 'Lankymo trukmė',
  isPublic: 'Ar viešinti ? ',
  priceStatus: 'Kainos statusas',
  additionalInfo: 'Kita papildoma informacija',
  visitInfo: 'Ar objektas pritaikytas lankymui?',
  isAdaptedForForeigners: 'Ar teikiamos paslaugos ar informacija anglų kalba?',
  TIC: 'Turizmo informacinis centras',
  generatedKey: 'Sugeneruotas raktas',
  season: 'Sezoniškumas',
  categories: 'Kategorijos',
  parentCategory: 'Tėvinė kategorija',
  description: 'Aprašymas',
  url: 'Interneto puslapis',
  audio: 'Audiogido nuoroda',
  name: 'Pavadinimas',
  nameEn: 'Angliškas pavadinimas',
  subCategories: 'Subkategorijos',
  attribute: 'Atributas',
  noData: 'Nėra duomenų',
  chooseOption: 'Pasirinkite',
  comment: 'Komentaras',
  or: 'arba',
  objects: 'Objektai',
  uploadPhotos: 'Įkelti nuotraukas',
  pressToWant: 'Paspauskite norėdami',
  uploadOrDragFilesHere: 'įkelti arba įtempkite failus čia',
  fileTypesAndMaxSize: 'PDF, PNG, JPEG, JPG (maks. 20MB)',
  profiles: 'PASKYROS',
  length: 'Ilgis',
  width: 'Plotis',
  measurementUnits: 'Matavimo vienetai',
  createdBy: 'Duomenis įvedė',
  dataEnteredDate: 'Duomenų įvedimo data',
  firstName: 'Vardas',
  gallery: 'Galerija',
  lastName: 'Pavardė',
  phone: 'Telefonas',
  email: 'El. pašto adresas',
  legalPersonName: 'Juridinio asmens pavadinimas',
  personalCode: 'Asmens kodas',
  groupUsers: 'Grupės naudotojai',
  role: 'Rolė',
  quantity: 'vnt.',
  noOptions: 'Nėra pasirinkimų',
};

export const subTitles = {
  dataUpdate: 'DUOMENŲ KOREGAVIMAS',
  legalPerson: 'JURIDINIS ASMUO',
};

export const emptyStateLabel = {
  form: 'Nėra turizmo objektų',
  categories: 'Nėra kategorijų',
  visitInfos: 'Nėra lankymo informacijų',
  additionalInfos: 'Nėra papildomų informacijų',
  visitTimes: 'Nėra lankymo laikų',
  history: 'Nėra istorijos',
  user: 'Nėra sukurta naudotojų.',
  tenant: 'Nėra sukurta įmonių, Sukurkite ',
  userForm: 'Naudotojas nėra pateikęs duomenų teikimo anketų',
  tenantForm: 'Įmonė nėra sukurta duomenų teikimo anketų',
  tenantUsers: 'Įmonė nėra narių',
};

export const emptyStateUrlLabels = {
  user: 'naują naudotoją.',
  tenant: 'naują įmonę.',
};

export const roleLabels = {
  [RoleType.USER]: 'Naudotojas',
  [RoleType.ADMIN]: 'Administratorius',
};

export const seasonLabels = {
  [Season.ALL]: 'Visus metus',
  [Season.AUTUMN]: 'Ruduo',
  [Season.SPRING]: 'Pavasaris',
  [Season.SUMMER]: 'Vasara',
  [Season.WINTER]: 'Žiema',
};

export const formHistoryLabels = {
  [HistoryTypes.CREATED]: 'Pateikta',
  [HistoryTypes.UPDATED]: 'Atnaujinta',
  [HistoryTypes.REJECTED]: 'Atmesta',
  [HistoryTypes.RETURNED]: 'Grąžinta taisyti',
  [HistoryTypes.APPROVED]: 'Priimta',
  [HistoryTypes.DELETED]: 'Ištrinta',
};

export const formStatusLabels = {
  [StatusTypes.CREATED]: 'Pateikta',
  [StatusTypes.SUBMITTED]: 'Pateikta pakartotinai ',
  [StatusTypes.RETURNED]: 'Grąžinta taisymui',
  [StatusTypes.REJECTED]: 'Atmesta',
  [StatusTypes.APPROVED]: 'Patvirtinta',
};

export const formActionLabels = {
  [StatusTypes.APPROVED]: 'Tvirtinamas turizmo objektas',
  [StatusTypes.RETURNED]: 'Grąžinti turizmo objektą taisymui',
  [StatusTypes.REJECTED]: 'Atmesti turizmo objektą',
  [StatusTypes.SUBMITTED]: 'Pateikti turizmo objektą ',
};

export const buttonColors = {
  [StatusTypes.SUBMITTED]: ButtonColors.PRIMARY,
  [StatusTypes.APPROVED]: ButtonColors.SUCCESS,
  [StatusTypes.RETURNED]: ButtonColors.PRIMARY,
  [StatusTypes.REJECTED]: ButtonColors.DANGER,
};

export const actionButtonLabels = {
  [StatusTypes.APPROVED]: 'Patvirtinti',
  [StatusTypes.RETURNED]: 'Grąžinti taisyti',
  [StatusTypes.REJECTED]: 'Atmesti',
  [StatusTypes.SUBMITTED]: 'Pateikti',
};
