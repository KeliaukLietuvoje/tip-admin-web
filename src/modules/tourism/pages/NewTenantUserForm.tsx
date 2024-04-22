import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import NewTenantUserForm from "../../../components/forms/NewTenantUser";
import { RoleType } from "../../../types";
import { default as api } from "../utils/api";
import { slugs } from "../utils/slugs";
import { pageTitles, roleLabels } from "../utils/texts";

const TenantUserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const title = pageTitles.newUser;

  const newTenantUserMutation = useMutation(
    (values: any) => api.createUser({ ...values, tenantId: parseInt(id!) }),
    {
      onSuccess: () => {
        navigate(slugs.tenantUsers(id!));
      }
    }
  );

  return (
    <NewTenantUserForm
      isLoading={newTenantUserMutation.isLoading}
      roleLabels={roleLabels}
      title={title}
      handleSubmit={newTenantUserMutation.mutateAsync}
      roles={[RoleType.ADMIN, RoleType.USER]}
    />
  );
};

export default TenantUserForm;
