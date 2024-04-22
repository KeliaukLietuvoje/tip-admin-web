import styled from 'styled-components';
import { device } from '../../styles';
import { OwnerRequired } from '../../utils/constants';
import { formLabels, inputLabels } from '../../utils/texts';
import {
  validateTenantForm,
  validateTenantFormWithUser,
  validateTenantFormWithUserOptional,
} from '../../utils/validation';
import CheckBox from '../buttons/Checkbox';
import TextField from '../fields/TextField';
import SimpleContainer from '../other/SimpleContainer';
import FormPageWrapper from '../wrappers/FormPageWrapper';

export interface TenantProps {
  companyName: string;
  companyCode: string;
  companyPhone: string;
  companyEmail: string;
  ownerRequired: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  personalCode: string;
  [key: string]: any;
}

export interface NewTenantProps {
  title: string;
  handleSubmit: (values: any, helper: any) => void;
  ownerRequired: OwnerRequired;
  isLoading?: boolean;
}

const NewTenantForm = ({ title, ownerRequired, handleSubmit }: NewTenantProps) => {
  const initialValues: TenantProps = {
    companyName: '',
    companyCode: '',
    companyPhone: '',
    companyEmail: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    ownerRequired: ownerRequired === OwnerRequired.REQUIRED,
    personalCode: '',
  };

  const formValidation = {
    [OwnerRequired.NOT_REQUIRED]: validateTenantForm,
    [OwnerRequired.OPTIONAL]: validateTenantFormWithUserOptional,
    [OwnerRequired.REQUIRED]: validateTenantFormWithUser,
  };

  const renderForm = (values: TenantProps, errors: any, handleChange) => {
    return (
      <InnerContainer>
        <ColumnOne>
          <SimpleContainer title={formLabels.infoAboutTenant}>
            <>
              <Grid column={2}>
                <StyledTextInput
                  label={inputLabels.companyName}
                  value={values.companyName}
                  error={errors.companyName}
                  name="companyName"
                  onChange={(e) => handleChange('companyName', e)}
                />
                <StyledTextInput
                  label={inputLabels.companyCode}
                  value={values.companyCode}
                  error={errors.companyCode}
                  name="companyCode"
                  onChange={(e) => handleChange('companyCode', e)}
                />
                <StyledTextInput
                  label={inputLabels.phone}
                  value={values.companyPhone}
                  error={errors.companyPhone}
                  name="companyPhone"
                  placeholder="862211123"
                  onChange={(e) => handleChange('companyPhone', e)}
                />
                <StyledTextInput
                  label={inputLabels.companyEmail}
                  value={values.companyEmail}
                  error={errors.companyEmail}
                  type="email"
                  name="companyEmail"
                  placeholder="naudotojas@am.lt"
                  onChange={(e) => handleChange('companyEmail', e)}
                />
              </Grid>

              {ownerRequired === OwnerRequired.OPTIONAL && (
                <StyledSingleCheckbox
                  label={inputLabels.addOwner}
                  value={values.ownerRequired}
                  error={errors?.ownerRequired}
                  onChange={(value) => handleChange('ownerRequired', value)}
                />
              )}
            </>
          </SimpleContainer>

          {values.ownerRequired && (
            <SimpleContainer title={formLabels.infoAboutOwner}>
              <>
                <Grid column={2}>
                  <StyledTextInput
                    label={inputLabels.firstName}
                    value={values.firstName}
                    error={errors.firstName}
                    name="firstName"
                    onChange={(e) => handleChange('firstName', e)}
                  />
                  <StyledTextInput
                    label={inputLabels.lastName}
                    value={values.lastName}
                    error={errors.lastName}
                    name="lastName"
                    onChange={(e) => handleChange('lastName', e)}
                  />
                </Grid>
                <Grid column={3}>
                  <StyledTextInput
                    label={inputLabels.phone}
                    value={values.phone}
                    error={errors.phone}
                    name="phone"
                    placeholder="862211123"
                    onChange={(e) => handleChange('phone', e)}
                  />
                  <StyledTextInput
                    label={inputLabels.email}
                    value={values.email}
                    error={errors.email}
                    placeholder="naudotojas@am.lt"
                    type="email"
                    name="email"
                    onChange={(e) => handleChange('email', e)}
                  />
                  <StyledTextInput
                    label={inputLabels.personalCode}
                    value={values.personalCode}
                    error={errors.personalCode}
                    name="personalCode"
                    onChange={(e) => handleChange('personalCode', e)}
                  />
                </Grid>
              </>
            </SimpleContainer>
          )}
        </ColumnOne>
      </InnerContainer>
    );
  };

  return (
    <FormPageWrapper
      title={title}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      renderForm={renderForm}
      validationSchema={formValidation[ownerRequired]}
    />
  );
};

const Grid = styled.div<{ column?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ column }) => column}, 1fr);
  gap: 16px;
  margin: 16px 0;
  @media ${device.mobileL} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const StyledSingleCheckbox = styled(CheckBox)`
  padding: 16px 0 0 0;
`;

const StyledTextInput = styled(TextField)`
  flex: 1;
  min-width: 115px;
  @media ${device.mobileL} {
    width: 100%;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const ColumnOne = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default NewTenantForm;
