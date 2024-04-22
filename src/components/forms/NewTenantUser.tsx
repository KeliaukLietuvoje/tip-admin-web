import styled from 'styled-components';
import { device } from '../../styles';
import { formLabels, inputLabels } from '../../utils/texts';
import { validateUserForm } from '../../utils/validation';
import SelectField from '../fields/SelectField';
import TextField from '../fields/TextField';
import SimpleContainer from '../other/SimpleContainer';
import FormPageWrapper from '../wrappers/FormPageWrapper';

export interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  personalCode: string;
  role: string;

  [key: string]: any;
}

export interface NewTenantProps {
  title: string;
  handleSubmit: (props: any, helper: any) => void;
  roles: string[];
  roleLabels: { [key: string]: string };
  isLoading?: boolean;
}

const NewTenantUserForm = ({ title, handleSubmit, roles, roleLabels }: NewTenantProps) => {
  const initialValues: UserProps = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    personalCode: '',
    role: roles[0],
  };

  const renderForm = (values: UserProps, errors: any, handleChange) => {
    return (
      <InnerContainer>
        <ColumnOne>
          <SimpleContainer title={formLabels.infoAboutUser}>
            <>
              <Grid>
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
                  type="email"
                  name="email"
                  placeholder="naudotojas@am.lt"
                  onChange={(e) => handleChange('email', e)}
                />
                <StyledTextInput
                  label={inputLabels.personalCode}
                  value={values.personalCode}
                  error={errors.personalCode}
                  name="personalCode"
                  onChange={(e) => handleChange('personalCode', e)}
                />
                <StyledSelectField
                  label={inputLabels.role}
                  name="role"
                  value={values.role}
                  error={errors.role}
                  options={roles}
                  onChange={(role) => handleChange('role', role)}
                  getOptionLabel={(option) => roleLabels[option]}
                />
              </Grid>
            </>
          </SimpleContainer>
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
      validationSchema={validateUserForm}
    />
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 16px 0;
  @media ${device.mobileL} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const StyledTextInput = styled(TextField)`
  flex: 1;
  min-width: 115px;
  @media ${device.mobileL} {
    width: 100%;
  }
`;
export const StyledImg = styled.img`
  margin: 10px 16px 0px 0px;
  width: fit-content;
  height: 100px;
  border-radius: 5px;
  cursor: pointer;
`;

const StyledSelectField = styled(SelectField)`
  flex: 1;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const ColumnOne = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

export default NewTenantUserForm;
