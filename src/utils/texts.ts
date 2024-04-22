import { featureLabels as tourismSFeatureLabels } from '../modules/tourism/utils/features';
import { accessLabels as userSAccessLabels } from '../modules/users/utils/accesses';
import { featureLabels as userSFeatureLabels } from '../modules/users/utils/features';
import { mapsHost, ServerErrorMessages, ServerErrorTypes, UrlPathToModule } from './constants';

export const featureLabels = {
  ...userSFeatureLabels,
  ...tourismSFeatureLabels,
};

export const accessLabels = {
  ...userSAccessLabels,
};

export const subrouteLabels: { [key: string]: string } = {
  group: 'Grupės',
  users: 'Naudotojai',
  companies: 'Įmonės',
  events: 'Įvykiai',
};

export const roleLabels: { [key: string]: string } = {
  USER: 'Naudotojas',
  SUPER_ADMIN: 'Super administratorius',
  ADMIN: 'Administratorius',
  ALL: 'Visi',
};

export const buttonsTitles = {
  resetPassword: 'Atstatyti slaptažodį',
  decline: 'Atmesti',
  columns: 'Stulpeliai',
  createPassword: 'Nustatyti slaptažodį',
  return: 'Grįžti į prisijungimo langą',
  login: 'Prisijungti',
  loginEvv: 'Prisijungti per El. valdžios vartus',
  newUser: 'Naujas naudotojas',
  save: 'Išsaugoti',
  submit: 'Pateikti',
  back: 'Grįžti atgal',
  newGroups: 'Nauja grupė',
  approve: 'Tvirtinti',
  returnToCorrect: 'Grąžinti taisymui',
  reject: 'Atmesti',
  update: 'Atnaujinti',
  view: 'Peržiūrėti',
  deleteUser: 'Ištrinti naudotoją',
  deleteGroup: 'Ištrinti grupę',
  clearAll: 'Išvalyti visus',
  filter: 'Filtruoti',
  sarasas: 'Sąrašas',
  zemelapis: 'Žemėlapis',
  newTenant: 'Nauja įmonė',
  cancel: 'Atšaukti',
  delete: 'Ištrinti',
  deleted: 'Ištrintas',
  logout: 'Atsijungti',
  profile: 'Profilis',
  edit: 'Redaguoti',
};

export const validationTexts = {
  formFillError: 'Užpildykite formą teisingai',
  requireText: 'Privalote įvesti',
  badUrlFormat: 'Blogai įvesta nuoroda',
  requiredText: 'Privalote įvesti',
  updated: 'Sėkmingai atnaujinta',
  photoNotUploaded: 'Nuotrauka neįkelta',
  badFormat: 'Blogas formatas',
  notFound: 'Nėra pasirinkimų',
  requiredMap: 'Privalote pasirinkti vietą žemėlapyje',
  requirePhotos: 'Privalote įkelti nuotrauką',
  onlyNumbers: 'Laukelyje galimos tik skaitinės reikšmės',
  badPhoneFormat: 'Blogai įvestas telefono numeris',
  requiredSelect: 'Privalote pasirinkti',
  badEmailFormat: 'Blogas el. pašto formatas',
  tooFrequentRequest: 'Nepavyko, per dažna užklausa prašome pabandyti veliau ',
  [ServerErrorMessages.WRONG_PASSWORD]: 'Blogas elektroninis paštas arba slaptažodis',
  [ServerErrorMessages.USER_NOT_FOUND]: 'Naudotojo su tokiu el. paštu nėra',
  [ServerErrorTypes.CANNOT_SEND_EMAIL]:
    'Nebuvo galimybės priskirti atsakingo asmens, nes elektroninio pašto adresas neegzistuoja',
  [ServerErrorMessages.NOT_FOUND]: 'Blogas elektroninis paštas arba slaptažodis',
  [ServerErrorMessages.USER_NOT_FOUND]: 'Sistemoje nėra tokio elektroninio pašto',
  passwordsDoNotMatch: 'Slaptažodžiai nesutampa',
  error: 'Įvyko nenumatyta klaida, prašome pabandyti vėliau',
  personalCode: 'Neteisingas asmens kodo formatas',
  companyCode: 'Neteisingas įmonės kodo formatas',
  badFileTypes: 'Blogi failų tipai',
  fileSizesExceeded: 'Viršyti failų dydžiai',
  positiveNumber: 'Reikšmė turi būti didesnė už nulį',
  requiredFiles: 'Privalote įkelti dokumentus',
  atLeastOneColumn: 'Turi būti pasirinktas bent vienas stulpelis',
  atLeastOneRow: 'Turi būti pasirinkta bent viena eilutė',
  [ServerErrorTypes.AUTH_USER_EXISTS]: 'Toks naudotojas jau egzistuoja',
};

export const inputLabels = {
  chooseOption: 'Pasirinkite',
  info: 'Informacija',
  name: 'Pavadinimas',
  author: 'Autorius',
  notSpecified: 'Nenurodyta',
  password: 'Slaptažodis',
  rememberMe: 'Likti prisijungus',
  newPassword: 'Naujas slaptažodis',
  repeatNewPassword: 'Pakartokite naują slaptažodį',
  uploadPhotos: 'Įkelti nuotraukas',
  uploadPhotosWithNames: 'Pridėti nuotrauką / -as',
  pressToWant: 'Paspauskite norėdami',
  uploadOrDragFilesHere: 'įkelti arba įtempkite failus čia',
  fileTypesAndMaxSize: 'PDF, PNG, JPEG, JPG (maks. 20MB)',
  selectMainPicture: 'Pasirinkti pagrindinę nuotrauką',
  firstName: 'Vardas',
  lastName: 'Pavardė',
  personalCode: 'Asmens kodas',
  email: 'El. paštas',
  phone: 'Telefonas',
  addOwner: 'Pridėti informaciją apie vadovą / atstovą',
  companyName: 'Juridinio asmens pavadinimas',
  companyCode: 'Kodas',
  companyEmail: 'El. pašto adresas',
  role: 'Teisė',
  tenant: 'Įmonė',
  noOptions: 'Nėra pasirinkimų',
};

export const formLabels = {
  documents: 'Dokumentai',
  permissions: 'Teisės',
  infoAboutTenant: 'Informacija apie įmonę',
  infoAboutOwner: 'Informacija apie vadovą / atstovą',
  infoAboutUser: 'Informacija apie naudotoją',
};

export const url = {
  DRAW: `${mapsHost}/edit`,
};

export const titles = {
  forgotPassword: 'Pamiršote slaptažodį?',
  remindPassword: 'Slaptažodžio priminimas',
  passwordChanged: 'Slaptažodis pakeistas',
  passwordCreated: 'Slaptažodis sukurtas',
  newPassword: 'Nustatyti naują slaptažodį',
};

export const descriptions = {
  forgotPassword:
    'Jeigu pamiršote slaptažodį, įrašykite savo el. pašto adresą ir mes padėsime jį atkurti',
  instructionSent: 'Jūsų nurodytu el. paštu išsiuntėme prisijungimo instrukciją',
  passwordChanged: 'Jūsų slaptažodis sėkmingai pakeistas. Galite prisijungti prie paskyros',
  passwordCreated: 'Jūsų slaptažodis sėkmingai sukurtas. Galite prisijungti prie paskyros',
  resetPassword: 'Naujas slaptažodis neturi sutapti su senuoju slaptažodžiu',
  tableNotFound: 'Atsiprašome nieko neradome pagal pasirinktus filtrus',
};

export const deleteDescriptionFirstPart = {
  access: 'Ar esate tikri, kad norite panaikinti prieigą prie',
};

export const deleteDescriptionSecondPart = {
  tenant: 'įmonę',
  access: 'įmonės',
  user: 'naudotoją',
};

export const deleteTitles = {
  access: 'Ištrinti prieigą',
};

export const serverErrorTypeLabels = {
  [ServerErrorTypes.AUTH_USER_EXISTS]: `Toks naudotojas jau egzistuoja`,
  [ServerErrorTypes.AUTH_USER_ASSIGNED]: `Toks naudotojas jau egzistuoja`,
  [ServerErrorTypes.AUTH_COMPANY_EXISTS]: 'Tokia įmonė jau egzistuoja',
  [ServerErrorTypes.AUTH_INVALID_DATA]: 'Blogai suvesti duomenys',
  [ServerErrorTypes.CANNOT_SEND_EMAIL]:
    'Nebuvo galimybės priskirti atsakingo asmens, nes elektroninio pašto adresas neegzistuoja',
};

export const pageTitles = {
  [UrlPathToModule.USERS]: 'Vidiniai naudotojai',
  [UrlPathToModule.TOURISM]: 'Turizmas',
};
