import { isEmpty } from 'lodash';
import * as Yup from 'yup';
import { App, Permission } from '../../../types';
import { phoneNumberRegexPattern } from '../../../utils/constants';
import { Permissions } from '../../../utils/router';
import { UserProps } from '../pages/Profile';
import { validationTexts } from './texts';

export const validateGroupForm = Yup.object().shape({
  name: Yup.string().required(validationTexts.requiredText),
  apps: Yup.array().min(1, validationTexts.requiredText),
});

export const validateGroupFormWithParent = Yup.object().shape({
  name: Yup.string().required(validationTexts.requiredText),
});

export const validateCreateUserForm = Yup.object().shape({
  firstName: Yup.string()
    .required(validationTexts.requiredText)
    .test('validFirstName', validationTexts.validFirstName, (values) => {
      if (/\d/.test(values || '')) return false;

      return true;
    }),
  lastName: Yup.string()
    .required(validationTexts.requiredText)
    .test('validLastName', validationTexts.validLastName, (values) => {
      if (/\d/.test(values || '')) return false;

      return true;
    }),
  phone: Yup.string()
    .required(validationTexts.requiredText)
    .trim()
    .matches(phoneNumberRegexPattern, validationTexts.badPhoneFormat),
  email: Yup.string().email(validationTexts.badEmailFormat).required(validationTexts.requiredText),
  groups: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().required(validationTexts.requiredText),
        role: Yup.string().required(validationTexts.requiredText),
      }),
    )
    .min(1),
  apps: Yup.array().test('atLeastOneModule', validationTexts.oneModule, (values) => {
    if (values?.filter((module) => module.name !== 'Admin')?.every((value) => !value.selected))
      return false;

    return true;
  }),
});

export const validateProfileForm = Yup.object().shape({
  firstName: Yup.string()
    .required(validationTexts.requiredText)
    .test('validFirstName', validationTexts.validFirstName, (values) => {
      if (/\d/.test(values || '')) return false;

      return true;
    }),
  lastName: Yup.string()
    .required(validationTexts.requiredText)
    .test('validLastName', validationTexts.validLastName, (values) => {
      if (/\d/.test(values || '')) return false;

      return true;
    }),
  phone: Yup.string()
    .required(validationTexts.requiredText)
    .trim()
    .matches(/(86|\+3706)\d{7}/, validationTexts.badPhoneFormat),
  email: Yup.string().email(validationTexts.badEmailFormat).required(validationTexts.requiredText),
});

export const additionalProfileErrors = (values: UserProps) => {
  const errors: Record<string, string> = {};
  const { oldPassword, newPassword, repeatNewPassword } = values;

  if (oldPassword || newPassword || repeatNewPassword) {
    if (!oldPassword) errors.oldPassword = validationTexts.requiredText;
    if (!newPassword) errors.newPassword = validationTexts.requiredText;
    if (!repeatNewPassword) errors.repeatNewPassword = validationTexts.requiredText;

    if (!values.allValid) {
      errors.newPassword = validationTexts.doesNotMeetRequirements;
    }
  }

  return errors;
};

export const validatePermissionForm = Yup.object().shape({
  group: Yup.string().required(validationTexts.requiredText),
  app: Yup.object().required(validationTexts.requiredText).nullable(),
});

export const additionalPermissionFormErrors = (values: Permission) => {
  const errors: Record<string, string> = {};
  const { app, features, accesses } = values;
  const appType = (app as App)?.type!;
  const isEmptyAppFeatures = isEmpty(Permissions[appType]?.features);
  const isEmptyAppAccesses = isEmpty(Permissions[appType]?.accesses);
  const hasFeatures = features?.length > 0;
  const hasAccesses = accesses?.length > 0;
  const featuresAccessesEmpty = !hasFeatures && !hasAccesses;

  if (!isEmptyAppFeatures && featuresAccessesEmpty) {
    errors.features = validationTexts.requiredText;
  }
  if (!isEmptyAppAccesses && featuresAccessesEmpty) {
    errors.accesses = validationTexts.requiredText;
  }

  return errors;
};
