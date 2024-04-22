import styled from 'styled-components';
import { device } from '../../styles';
import { Tenant } from '../../types';
import { formLabels, inputLabels } from '../../utils/texts';
import { validateUpdateTenantForm } from '../../utils/validation';
import TextField from '../fields/TextField';
import SimpleContainer from '../other/SimpleContainer';
import FormPageWrapper from '../wrappers/FormPageWrapper';

export interface TenantProps {
  phone: string;
  email: string;
  [key: string]: any;
}

export interface NewTenantProps {
  title: string;
  handleSubmit: (values: any) => void;
  values: Tenant;
  info: string[];
  handleDelete?: () => void;
  deleteInfo?: any;
}

const UpdateTenant = ({
  title,
  handleSubmit,
  values,
  info,
  handleDelete,
  deleteInfo,
}: NewTenantProps) => {
  const initialValues: TenantProps = {
    phone: values.phone || '',
    email: values.email || '',
  };

  const renderForm = (values: TenantProps, errors: any, handleChange) => {
    return (
      <InnerContainer>
        <SimpleContainer title={formLabels.infoAboutTenant}>
          <>
            <Grid>
              <StyledTextInput
                label={inputLabels.phone}
                value={values.phone}
                error={errors.phone}
                name="phone"
                placeholder="862211123"
                onChange={(e) => handleChange('phone', e)}
              />
              <StyledTextInput
                label={inputLabels.companyEmail}
                value={values.email}
                error={errors.email}
                type="email"
                placeholder="naudotojas@am.lt"
                name="email"
                onChange={(e) => handleChange('email', e)}
              />
            </Grid>
          </>
        </SimpleContainer>
      </InnerContainer>
    );
  };

  return (
    <FormPageWrapper
      title={title}
      deleteInfo={deleteInfo}
      info={info}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      renderForm={renderForm}
      validationSchema={validateUpdateTenantForm}
      handleDelete={handleDelete}
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
  margin-top: -8px;
  @media ${device.mobileL} {
    width: 100%;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default UpdateTenant;
