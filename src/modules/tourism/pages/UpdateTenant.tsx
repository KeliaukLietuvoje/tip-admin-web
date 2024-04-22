import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpdateTenant from "../../../components/forms/UpdateTenant";
import LoaderComponent from "../../../components/other/LoaderComponent";
import { DeleteInfoProps, Tenant } from "../../../types";
import { handleResponse } from "../../../utils/functions";
import Api from "../utils/api";
import { slugs } from "../utils/slugs";
import * as Texts from "../utils/texts";

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
}

const UpdateTenantForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tenant, setTenant] = useState<Tenant>();
  const { id } = useParams();

  const deleteInfo: DeleteInfoProps = {
    deleteDescriptionFirstPart: Texts.deleteDescriptionFirstPart.delete,
    deleteDescriptionSecondPart: Texts.deleteDescriptionSecondPart.tenant,
    deleteTitle: Texts.deleteTitles.tenant,
    deleteName: tenant?.name
  };

  const handleSetTenant = async () => {
    if (!id) return navigate(slugs.tenants);

    await handleResponse({
      endpoint: () => Api.getTenant(id),
      onError: () => {
        navigate(slugs.tenants);
      },
      onSuccess: (data: Tenant) => {
        setTenant(data);
      }
    });
  };

  useEffect(() => {
    (async () => {
      await handleSetTenant();
      setLoading(false);
    })();
  }, [id]);

  const handleSubmit = async (values: TenantProps) => {
    setLoading(true);
    await handleResponse({
      endpoint: () => Api.updateTenant(values, id),
      onSuccess: () => {
        navigate(slugs.tenantUsers(id!));
      }
    });
    setLoading(false);
  };

  const handleDeleteTenant = async () => {
    await handleResponse({
      endpoint: () => Api.deleteTenant(id!),
      onSuccess: () => {
        navigate(slugs.tenants);
      }
    });
  };

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <UpdateTenant
      title={tenant?.name!}
      info={[tenant?.code ? `Įm.k. ${tenant?.code}` : ""]}
      handleSubmit={handleSubmit}
      handleDelete={handleDeleteTenant}
      values={tenant!}
      deleteInfo={deleteInfo}
    />
  );
};

export default UpdateTenantForm;
