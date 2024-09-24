import * as Yup from 'yup';
import { validationTexts } from '../../../utils/texts';

export const validateUserForm = Yup.object().shape({
  role: Yup.string().required(validationTexts.requireText).nullable(),
  firstName: Yup.string().required(validationTexts.requireText).nullable(),
  lastName: Yup.string().required(validationTexts.requireText).nullable(),
  email: Yup.string().email(validationTexts.badEmailFormat).required(validationTexts.requireText),
  // personalCode: Yup.string()
  // .required(validationTexts.requiredText)
  // .trim()
  // .matches(/^\d{11}$/, validationTexts.personalCode),
  phone: Yup.string()
    .required(validationTexts.requireText)
    .trim()
    .matches(/^(86|\+3706)\d{7}$/, validationTexts.badPhoneFormat),
});

export const validateFormRowInfo = (values: { name: string; items: { [key: string]: any } }) => {
  const errors: any = {};

  if (!values.name) errors.name = validationTexts.requireText;
  const items = values.items;

  Object.keys(items).forEach((key) => {
    if (items?.[key]) {
      Object.keys(items?.[key]).forEach((innerKey) => {
        if (!items?.[key]?.[innerKey]) {
          if (!errors.items) {
            errors.items = {};
          }

          if (!errors.items[key]) {
            errors.items[key] = {};
          }

          errors.items[key][innerKey] = validationTexts.requireText;
        }
      });
    }
  });

  return errors;
};

const urlRegex =
  /^(https?:\/\/)?(www\.)?([a-z\d]([-a-z\d]{0,61}[a-z\d])?\.)+[a-z]{2,6}(:\d{1,5})?(\/.*)?$/i;

export const validateForm = Yup.object().shape({
  categories: Yup.array().min(1, validationTexts.requiredSelect),
  urlLT: Yup.string().trim().nullable().notRequired().matches(urlRegex, {
    message: validationTexts.badUrlFormat,
    excludeEmptyString: true,
  }),
  nameLT: Yup.string().required(validationTexts.requireText).nullable(),
  geom: Yup.object().required(validationTexts.requiredMap).nullable(),
});

export const validateInfo = Yup.object().shape({
  name: Yup.string().required(validationTexts.requireText).nullable(),
  nameEn: Yup.string().required(validationTexts.requireText).nullable(),
});

export const validateAdditionalInfo = Yup.object().shape({
  name: Yup.string().required(validationTexts.requireText).nullable(),
  nameEn: Yup.string().required(validationTexts.requireText).nullable(),
  icon: Yup.string().required(validationTexts.requireText).nullable(),
});

export const validateKeyGenerateForm = Yup.object().shape({
  tenant: Yup.object().required(validationTexts.requiredSelect).nullable(),
});
