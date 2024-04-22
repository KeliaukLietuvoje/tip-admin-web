import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpdateUserPage from "../../../components/forms/UpdateUser";
import { TenantInfo } from "../../../components/other/InfoAboutUserTenants";
import LoaderComponent from "../../../components/other/LoaderComponent";
import { DeleteInfoProps, RoleType, Tenant, User } from "../../../types";
import { handleResponse } from "../../../utils/functions";
import Api from "../utils/api";
import { getTenantsList } from "../utils/functions";
import { slugs } from "../utils/slugs";
import * as Texts from "../utils/texts";

interface AddAccessProps {
  tenant: Tenant;
  role: string;
}

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const fullName = `${user?.firstName} ${user?.lastName}`;
  const [popupLoading, setPopupLoading] = useState(false);

  const deleteInfo: DeleteInfoProps = {
    deleteDescriptionFirstPart: Texts.deleteDescriptionFirstPart.delete,
    deleteDescriptionSecondPart: Texts.deleteDescriptionSecondPart.user,
    deleteTitle: Texts.deleteTitles.user,
    deleteName: fullName
  };

  const getUserTenantInfo: TenantInfo[] =
    user?.profiles
      ?.filter((profile) => !!profile.role)
      .map((profile) => {
        return {
          tenant: {
            id: profile.id,
            name: profile.name,
            code: profile.code
          },
          role: profile.role
        };
      }) || [];

  const handleSetUser = async () => {
    if (!id) return navigate(slugs.users);

    setLoading(true);
    await handleResponse({
      endpoint: () => Api.getUser(id),
      onError: () => {
        navigate(slugs.users);
      },
      onSuccess: (data: User) => {
        setUser(data);
        setLoading(false);
      }
    });
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    await handleResponse({
      endpoint: () => Api.deleteUser(id!),
      onSuccess: () => {
        navigate(slugs.users);
        setLoading(false);
      }
    });
  };

  const handleDeleteTenantUser = async (values: AddAccessProps) => {
    setPopupLoading(true);
    await handleResponse({
      endpoint: () => Api.deleteTenantUser(values?.tenant?.id!, id!),
      onSuccess: () => {
        handleSetUser();
      }
    });
    setPopupLoading(false);
  };

  const handleUpdateTenantUser = async (values: AddAccessProps) => {
    const { role, tenant } = values;
    setPopupLoading(true);
    await handleResponse({
      endpoint: () => Api.updateTenantUser({ role }, tenant?.id!, id!),
      onSuccess: () => {
        handleSetUser();
      }
    });
    setPopupLoading(false);
  };

  const handleCreateTenantUser = async (values: AddAccessProps) => {
    const { role, tenant } = values;
    setPopupLoading(true);
    await handleResponse({
      endpoint: () => Api.createTenantUser({ role }, tenant?.id!, id!),
      onSuccess: () => {
        handleSetUser();
      }
    });
    setPopupLoading(false);
  };

  const handleUpdateUser = async (values: User) => {
    const { email, phone } = values;

    const userInfo = {
      email,
      phone
    };

    await handleResponse({
      endpoint: () => Api.updateUser(userInfo, id!),
      onSuccess: () => {
        navigate(slugs.users);
      }
    });
  };

  useEffect(() => {
    (async () => {
      await handleSetUser();
    })();
  }, [id]);

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <UpdateUserPage
      popupLoading={popupLoading}
      roleLabels={Texts.roleLabels}
      title={fullName}
      deleteInfo={deleteInfo}
      tenantInfos={getUserTenantInfo}
      handleDelete={handleDeleteUser}
      onAdd={handleCreateTenantUser}
      onChange={handleUpdateTenantUser}
      onDelete={handleDeleteTenantUser}
      onSubmit={handleUpdateUser}
      tenantsEndpoint={(input, page) =>
        getTenantsList(
          input,
          page,
          getUserTenantInfo.map((info) => info.tenant?.id)
        )
      }
      roles={[RoleType.ADMIN, RoleType.USER]}
      user={user}
    />
  );
};

export default UpdateUser;
