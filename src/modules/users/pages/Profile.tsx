import { useMutation } from 'react-query';
import PasswordField from '../../../components/fields/PasswordField';
import TextField from '../../../components/fields/TextField';
import PasswordCheckListContainer from '../../../components/other/PasswordCheckListContainer';
import SimpleContainer from '../../../components/other/SimpleContainer';
import FormPageWrapper from '../../../components/wrappers/FormPageWrapper';
import { useAppSelector } from '../../../state/hooks';
import { FormColumn, FormRow } from '../../../styles/CommonStyles';
import { ReactQueryError, RoleType } from '../../../types';
import { getErrorMessage, handleSuccess, hasPermission } from '../../../utils/functions';
import Api from '../utils/api';
import { formLabels, inputLabels, pageTitles, validationTexts } from '../utils/texts';
import { additionalProfileErrors, validateProfileForm } from '../utils/validation';

export interface UserProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  oldPassword?: string;
  newPassword?: string;
  repeatNewPassword?: string;
  allValid?: boolean;
}

const Profile = () => {
  const user = useAppSelector((state) => state.user.userData);
  const isAdmin = !hasPermission(user, [RoleType.USER]);

  const updateProfile = useMutation(
    (values: UserProps) => Api.updateProfile({ params: values, id: user.id }),
    {
      onSuccess: () => {
        handleSuccess(validationTexts.profileUpdated);
      },
      retry: false,
    },
  );

  const handleProfileSubmit = async (values: UserProps, { setErrors }) => {
    const { firstName, lastName, email, phone, oldPassword, newPassword } = values;

    const params = {
      firstName,
      lastName,
      email: email?.toLowerCase(),
      phone,
      ...(!!newPassword && { password: newPassword }),
      ...(!!oldPassword && { oldPassword }),
    };

    try {
      await updateProfile.mutateAsync(params);
    } catch (e: any) {
      const error = e as ReactQueryError;
      const errorMessage = getErrorMessage(error.response.data.type);
      setErrors({ oldPassword: errorMessage });
    }
  };

  const initialProfileValues: UserProps = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    oldPassword: '',
    newPassword: '',
    allValid: false,
    repeatNewPassword: '',
  };

  const renderProfileForm = (values: UserProps, errors: any, handleChange) => {
    return (
      <>
        <SimpleContainer title={formLabels.profileInfo}>
          <FormRow columns={2}>
            <TextField
              disabled={true}
              label={inputLabels.firstName}
              value={values.firstName}
              error={errors.firstName}
              name="firstName"
              onChange={(firstName) => handleChange('firstName', firstName)}
            />
            <TextField
              disabled={true}
              label={inputLabels.lastName}
              name="lastName"
              value={values.lastName}
              error={errors.lastName}
              onChange={(lastName) => handleChange('lastName', lastName)}
            />
          </FormRow>
          <FormRow columns={2}>
            <TextField
              label={inputLabels.phone}
              value={values.phone}
              error={errors.phone}
              name="phone"
              onChange={(phone) => handleChange('phone', phone)}
            />
            <TextField
              label={inputLabels.email}
              name="email"
              type="email"
              value={values.email}
              error={errors.email}
              onChange={(email) => handleChange('email', email)}
            />
          </FormRow>
        </SimpleContainer>
        {isAdmin && (
          <SimpleContainer title={formLabels.changePassword}>
            <FormRow columns={2}>
              <PasswordField
                label={inputLabels.oldPassword}
                value={values.oldPassword}
                error={errors.oldPassword}
                name="oldPassword"
                onChange={(oldPassword) => handleChange('oldPassword', oldPassword)}
              />
            </FormRow>
            <FormRow columns={2}>
              <FormColumn>
                <PasswordField
                  label={inputLabels.newPassword}
                  name="newPassword"
                  value={values.newPassword}
                  error={errors.newPassword}
                  onChange={(newPassword) => handleChange('newPassword', newPassword)}
                />
                <PasswordCheckListContainer
                  setAllValid={(allValid) => handleChange('allValid', allValid)}
                  password={values.newPassword!}
                  repeatPassword={values.repeatNewPassword!}
                />
              </FormColumn>
              <PasswordField
                label={inputLabels.repeatNewPassword}
                value={values.repeatNewPassword}
                error={errors.repeatNewPassword}
                name="repeatNewPassword"
                onChange={(repeatNewPassword) =>
                  handleChange('repeatNewPassword', repeatNewPassword)
                }
              />
            </FormRow>
          </SimpleContainer>
        )}
      </>
    );
  };

  return (
    <FormPageWrapper
      back={false}
      title={pageTitles.updateProfile}
      initialValues={initialProfileValues}
      additionalValidation={additionalProfileErrors}
      onSubmit={handleProfileSubmit}
      renderForm={renderProfileForm}
      validationSchema={validateProfileForm}
    />
  );
};

export default Profile;
