import { companyCode, personalCode } from "lt-codes";
import * as Yup from "yup";
import { validationTexts } from "./texts";

export const validateTenantFormWithUserOptional = Yup.object().shape({
  firstName: Yup.string().when("ownerRequired", {
    is: (ownerRequired) => ownerRequired,
    then: Yup.string().required(validationTexts.requireText)
  }),

  lastName: Yup.string().when("ownerRequired", {
    is: (ownerRequired) => ownerRequired,
    then: Yup.string().required(validationTexts.requireText)
  }),

  personalCode: Yup.string().when("ownerRequired", {
    is: (ownerRequired) => ownerRequired,
    then: Yup.string()
      .required(validationTexts.requireText)
      .trim()
      .test("validatePersonalCode", validationTexts.personalCode, (value) => {
        return personalCode.validate(value!).isValid;
      })
  }),

  phone: Yup.string().when("ownerRequired", {
    is: (ownerRequired) => ownerRequired,
    then: Yup.string()
      .required(validationTexts.requireText)
      .trim()
      .matches(/^(86|\+3706)\d{7}$/, validationTexts.badPhoneFormat)
  }),

  email: Yup.string().when("ownerRequired", {
    is: (ownerRequired) => {
      return ownerRequired;
    },
    then: Yup.string()
      .email(validationTexts.badEmailFormat)
      .required(validationTexts.requireText)
  }),

  companyPhone: Yup.string()
    .required(validationTexts.requireText)
    .trim()
    .matches(/^(86|\+3706)\d{7}$/, validationTexts.badPhoneFormat),
  companyEmail: Yup.string()
    .email(validationTexts.badEmailFormat)
    .required(validationTexts.requireText),
  companyCode: Yup.string()
    .required(validationTexts.requireText)
    .trim()
    .test("validateCompanyCode", validationTexts.companyCode, (value) => {
      return companyCode.validate(value!).isValid;
    }),
  companyName: Yup.string().required(validationTexts.requireText)
});

export const validateTenantFormWithUser = Yup.object().shape({
  firstName: Yup.string().required(validationTexts.requireText),
  lastName: Yup.string().required(validationTexts.requireText),
  personalCode: Yup.string()
    .required(validationTexts.requireText)
    .trim()
    .test("validatePersonalCode", validationTexts.personalCode, (value) => {
      return personalCode.validate(value!).isValid;
    }),
  phone: Yup.string()
    .required(validationTexts.requireText)
    .trim()
    .matches(/^(86|\+3706)\d{7}$/, validationTexts.badPhoneFormat),
  email: Yup.string()
    .email(validationTexts.badEmailFormat)
    .required(validationTexts.requireText),

  companyPhone: Yup.string()
    .required(validationTexts.requireText)
    .trim()
    .matches(/^(86|\+3706)\d{7}$/, validationTexts.badPhoneFormat),
  companyEmail: Yup.string()
    .email(validationTexts.badEmailFormat)
    .required(validationTexts.requireText),
  companyCode: Yup.string()
    .required(validationTexts.requireText)
    .trim()
    .test("validateCompanyCode", validationTexts.companyCode, (value) => {
      return companyCode.validate(value!).isValid;
    }),
  companyName: Yup.string().required(validationTexts.requireText)
});

export const validateTenantForm = Yup.object().shape({
  companyPhone: Yup.string()
    .required(validationTexts.requireText)
    .trim()
    .matches(/^(86|\+3706)\d{7}$/, validationTexts.badPhoneFormat),
  companyEmail: Yup.string()
    .email(validationTexts.badEmailFormat)
    .required(validationTexts.requireText),
  companyCode: Yup.string()
    .required(validationTexts.requireText)
    .trim()
    .test("validateCompanyCode", validationTexts.companyCode, (value) => {
      return companyCode.validate(value!).isValid;
    }),
  companyName: Yup.string().required(validationTexts.requireText)
});

export const validateUpdateTenantForm = Yup.object().shape({
  phone: Yup.string()
    .required(validationTexts.requireText)
    .trim()
    .matches(/^(86|\+3706)\d{7}$/, validationTexts.badPhoneFormat),
  email: Yup.string()
    .email(validationTexts.badEmailFormat)
    .required(validationTexts.requireText)
});

export const validateUpdateUserForm = Yup.object().shape({
  phone: Yup.string()
    .required(validationTexts.requireText)
    .trim()
    .matches(/^(86|\+3706)\d{7}$/, validationTexts.badPhoneFormat),
  email: Yup.string()
    .email(validationTexts.badEmailFormat)
    .required(validationTexts.requireText)
});

export const validateAccess = Yup.object().shape({
  tenant: Yup.object().required(validationTexts.requiredSelect).nullable(),
  role: Yup.string().required(validationTexts.requiredSelect).nullable()
});

export const validateUserForm = Yup.object().shape({
  firstName: Yup.string().required(validationTexts.requireText),
  lastName: Yup.string().required(validationTexts.requireText),
  personalCode: Yup.string()
    .required(validationTexts.requireText)
    .trim()
    .test("validatePersonalCode", validationTexts.personalCode, (value) => {
      return personalCode.validate(value!).isValid;
    }),
  phone: Yup.string()
    .required(validationTexts.requireText)
    .trim()
    .matches(/^(86|\+3706)\d{7}$/, validationTexts.badPhoneFormat),
  email: Yup.string()
    .email(validationTexts.badEmailFormat)
    .required(validationTexts.requireText)
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required(validationTexts.requireText)
    .email(validationTexts.badEmailFormat),
  password: Yup.string().required(validationTexts.requireText)
});

export const remindPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required(validationTexts.requireText)
    .email(validationTexts.badEmailFormat)
});
