import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import NewTenantForm from '../../../components/forms/NewTenant';
import { OwnerRequired } from '../../../utils/constants';
import { getErrorMessage } from '../../../utils/functions';
import api from '../utils/api';
import { slugs } from '../utils/slugs';
import { pageTitles } from '../utils/texts';

interface TenantProps {
  companyCode: string;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  personalCode: string;
  ownerRequired: boolean;
}

const TenantForm = () => {
  const navigate = useNavigate();

  const newTenantMutation = useMutation((values: any) => api.createTenant(values), {
    onSuccess: () => {
      navigate(slugs.tenants);
    },
  });

  const handleSubmit = async (values: TenantProps, { setErrors }) => {
    const { ownerRequired, ...rest } = values;
    const params = { ...rest };

    try {
      await newTenantMutation.mutateAsync(params);
    } catch (error: any) {
      const errorMessage = getErrorMessage(error.response.data.type);
      setErrors({ form: errorMessage });
    }
  };

  return (
    <NewTenantForm
      isLoading={newTenantMutation.isLoading}
      title={pageTitles.newTenant}
      handleSubmit={handleSubmit}
      ownerRequired={OwnerRequired.OPTIONAL}
    />
  );
};

export default TenantForm;
