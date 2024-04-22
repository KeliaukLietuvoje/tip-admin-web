import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { inputLabels, validationTexts } from '../../utils/texts';
import { ButtonColors } from '../buttons/Button';
import AsyncSelectField from '../fields/AsyncSelect';
import SelectField from '../fields/SelectField';
import ConfirmPopUpWrapper from './ConfirmPopUpWrapper';
import { TenantInfo } from './InfoAboutUserTenants';

export interface InitialProps {
  tenant?: any;
  role?: string;
  [key: string]: any;
}

interface AccessPopUpProps {
  tenantsEndpoint: (
    input: string,
    page: string,
    tenantIds?: (string | undefined)[],
  ) => Promise<any>;
  roles: string[];
  showAdd: boolean;
  loading?: boolean;
  onSetShowAdd: any;
  roleLabels: { [key: string]: string };
  additionalValidation?: any;
  onSubmit: (props: any) => void;
  accessValues?: TenantInfo;
}

const AccessPopUp = ({
  roles,
  onSubmit,
  tenantsEndpoint,
  roleLabels,
  onSetShowAdd,
  accessValues,
  loading,
}: AccessPopUpProps) => {
  const [values, setValues] = useState<any>(accessValues);
  const [errors, setErrors] = useState<any>({ tenant: '', role: '' });

  const handleUpdateForm = (key: string, value: any) => {
    setValues({ ...values, [key]: value });
    setErrors({ ...errors, [key]: '' });
  };

  useEffect(() => {
    setValues(values);
  }, [accessValues]);

  const validateForm = () => {
    let errors = {};
    Object.keys(values).map((key) => {
      if (!values[key]) {
        errors[key] = validationTexts.requiredSelect;
      }
      return values[key];
    });

    if (!isEmpty(errors)) {
      setErrors(errors);
    }

    return isEmpty(errors);
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    onSubmit(values);

    onSetShowAdd(false);
  };

  return (
    <ConfirmPopUpWrapper
      onClose={() => {
        onSetShowAdd(false);
      }}
      loading={loading}
      isSubmit={false}
      isOpen={true}
      onSubmit={() => handleSubmit()}
      title={'Pridėti prieigą prie įmonės'}
      buttonColor={ButtonColors.PRIMARY}
      fields={
        <Column>
          <StyledAsyncMultiSelect
            value={values?.tenant}
            error={errors?.tenant}
            label={inputLabels.tenant}
            disabled={!!accessValues?.tenant}
            onChange={(tenant) => handleUpdateForm('tenant', tenant)}
            getOptionLabel={(option) => option.name}
            loadOptions={(input, page) => tenantsEndpoint(input, page.toString())}
          />

          <SelectField
            value={values?.role}
            error={errors?.role}
            disabled={!values?.tenant}
            label={inputLabels.role}
            options={roles}
            onChange={(role) => handleUpdateForm('role', role)}
            getOptionLabel={(option) => roleLabels[option]}
          />
        </Column>
      }
    />
  );
};

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledAsyncMultiSelect = styled(AsyncSelectField)`
  flex: 1;
`;

export default AccessPopUp;
