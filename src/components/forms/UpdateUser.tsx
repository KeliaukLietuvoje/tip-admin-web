import styled from 'styled-components';
import { device } from '../../styles';
import { DeleteInfoProps } from '../../types';
import { formLabels, inputLabels } from '../../utils/texts';
import { validateUpdateUserForm } from '../../utils/validation';
import TextField from '../fields/TextField';
import { TenantInfo } from '../other/InfoAboutUserTenants';
import SimpleContainer from '../other/SimpleContainer';
import UserTenantsContainer from '../other/UserTenantsContainer';
import FormPageWrapper from '../wrappers/FormPageWrapper';

export interface UserPageProps {
  title: string;
  deleteInfo: DeleteInfoProps;
  info?: string[];
  tenantInfos: TenantInfo[];
  roles: string[];
  roleLabels: { [key: string]: string };
  user?: any;
  handleDelete: () => void;
  onDelete: (props: any) => void;
  onChange: (props: any) => void;
  onAdd: (props: any) => void;
  onSubmit?: (values: any) => void;
  tenantsEndpoint: (input: string, page: any, tenants?: any) => Promise<any>;
  popupLoading?: boolean;
}

export interface UserTenantProps {
  phone: string;
  email: string;
  [key: string]: any;
}

const UpdateUserPage = ({
  handleDelete,
  onDelete,
  onAdd,
  onChange,
  onSubmit,
  title,
  info,
  tenantInfos,
  tenantsEndpoint,
  roles,
  popupLoading,
  roleLabels,
  deleteInfo,
  user,
}: UserPageProps) => {
  const initialValues: UserTenantProps = {
    phone: user?.phone || '',
    email: user?.email || '',
  };

  const renderForm = (values: UserTenantProps, errors: any, handleChange) => {
    return (
      <InnerContainer>
        <SimpleContainer title={formLabels.infoAboutUser}>
          <>
            <Grid>
              <StyledTextInput
                label={inputLabels.phone}
                value={values.phone}
                onChange={(phone) => handleChange('phone', phone)}
                error={errors.phone}
                placeholder="862211123"
                disabled={!onSubmit}
              />
              <StyledTextInput
                label={inputLabels.email}
                value={values.email}
                onChange={(email) => handleChange('email', email)}
                error={errors.email}
                type="email"
                placeholder="naudotojas@am.lt"
                disabled={!onSubmit}
              />
            </Grid>
          </>
        </SimpleContainer>
        <UserTenantsContainer
          roleLabels={roleLabels}
          info={tenantInfos}
          tenantsEndpoint={tenantsEndpoint}
          roles={roles}
          onChange={onChange}
          onDelete={onDelete}
          onAdd={onAdd}
          popupLoading={popupLoading}
        />
      </InnerContainer>
    );
  };

  return (
    <FormPageWrapper
      title={title}
      info={info}
      initialValues={initialValues}
      onSubmit={onSubmit}
      renderForm={renderForm}
      validationSchema={validateUpdateUserForm}
      deleteInfo={deleteInfo}
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
  @media ${device.mobileL} {
    width: 100%;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default UpdateUserPage;
