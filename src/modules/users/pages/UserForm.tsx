import { isEmpty } from 'lodash';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import TextField from '../../../components/fields/TextField';
import SimpleContainer from '../../../components/other/SimpleContainer';
import FormPageWrapper from '../../../components/wrappers/FormPageWrapper';
import { DeleteInfoProps, MapAppsProps, ReactQueryError, User } from '../../../types';
import Api from '../utils/api';
import { isCurrentUser } from '../utils/functions';
import { validateCreateUserForm } from '../utils/validation';

import { useMutation, useQuery } from 'react-query';
import LoaderComponent from '../../../components/other/LoaderComponent';
import SwitchContainer, { SwitchItem } from '../../../components/other/SwitchContainer';
import { useAppSelector } from '../../../state/hooks';
import { FormRow } from '../../../styles/CommonStyles';
import { getErrorMessage, handleError, isNew } from '../../../utils/functions';
import GroupsContainer from '../Components/GroupContainer';
import { getInheritedApps, handleAddApps, handleToggleApps } from '../utils/apps';
import { routes } from '../utils/routes';
import {
  buttonsTitles,
  deleteDescriptionFirstPart,
  deleteDescriptionSecondPart,
  deleteTitles,
  formLabels,
  inputLabels,
  pageTitles,
} from '../utils/texts';

export interface UserFormProps extends Omit<User, 'apps'> {
  apps: MapAppsProps[] | string[];
}

const GroupsFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser: User = useAppSelector((state) => state.user.userData);
  const [searchParams] = useSearchParams();
  const { group } = Object.fromEntries([...Array.from(searchParams)]);

  const title = isNew(id) ? pageTitles.newUser : pageTitles.updateUser;

  const { isFetching, data: user } = useQuery(['userModuleUser', id], () => Api.getUser({ id }), {
    onError: () => {
      navigate(routes.users);
    },
    onSuccess: () => {
      if (isCurrentUser(id, currentUser.id)) return navigate(routes.profile);
    },
    enabled: !isNew(id),
  });

  const handleSubmit = async (values: UserFormProps, { setErrors }) => {
    const { firstName, lastName, email, phone, groups, apps } = values;

    const selectedModules = (apps as MapAppsProps[]).filter((app) => app.selected);
    const isSelectedAllApps = apps?.length === selectedModules.length;

    const params = {
      firstName,
      lastName,
      email: email?.toLowerCase(),
      phone,
      groups,
      apps: isSelectedAllApps ? [] : selectedModules.map((app) => app.id),
    };

    if (isNew(id)) {
      try {
        await createUser.mutateAsync(params);
      } catch (e: any) {
        const error = e as ReactQueryError;
        const errorMessage = getErrorMessage(error.response.data.message);
        setErrors({ email: errorMessage });
      }
      return;
    }

    return await updateUser.mutateAsync(params);
  };

  const createUser = useMutation((params: UserFormProps) => Api.createUser({ params }), {
    onSuccess: (response) => {
      if (response?.url) {
        const url = new URL(response?.url);
        url.hostname = window.location.hostname;
        url.port = window.location.port;
        url.protocol = window.location.protocol;
        console.log(url.href);
        alert(url.href);
      }
      navigate(routes.users);
    },
    retry: false,
  });

  const updateUser = useMutation((params: UserFormProps) => Api.updateUser({ params, id: id! }), {
    onError: () => {
      handleError();
    },
    onSuccess: () => {
      navigate(routes.users);
    },
    retry: false,
  });

  const { data: groupOptions = [] } = useQuery(
    ['groupOptions', id],
    async () => (await Api.getGroupsOptions()).rows,
    {
      onError: () => {
        handleError();
      },
    },
  );

  const handleDelete = useMutation(
    () =>
      Api.deleteUser({
        id,
      }),
    {
      onError: () => {
        handleError();
      },
      onSuccess: () => {
        navigate(routes.users);
      },
    },
  );

  const deleteInfo: DeleteInfoProps = {
    deleteButtonText: buttonsTitles.deleteUser,
    deleteDescriptionFirstPart: deleteDescriptionFirstPart.user,
    deleteDescriptionSecondPart: deleteDescriptionSecondPart.user,
    deleteTitle: deleteTitles.user,
    deleteName: user?.fullName,
    handleDelete: !isNew(id) ? handleDelete.mutateAsync : undefined,
  };

  const getUserGroups = () =>
    user?.groups?.map((group) => {
      return {
        id: group.id,
        role: group.role,
      };
    }) || [
      {
        id: group || '',
        role: '',
      },
    ];

  const getUserApps = () => {
    const apps =
      user?.groups?.map((group) => group?.id && getInheritedApps(groupOptions, group?.id)).flat() ||
      getInheritedApps(groupOptions, parseInt(group)) ||
      [];
    return handleAddApps({ apps: [], newApps: apps, init: true, user });
  };

  const initialValues: UserFormProps = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    apps: getUserApps(),
    groups: getUserGroups(),
  };

  const renderForm = (values: UserFormProps, errors: any, handleChange) => {
    const addApp = (module: SwitchItem) => {
      handleChange(
        `apps`,
        handleToggleApps({
          option: module?.id!,
          apps: values.apps as MapAppsProps[],
        }),
      );
    };

    return (
      <>
        <SimpleContainer title={formLabels.userInfo}>
          <FormRow columns={2}>
            <TextField
              label={inputLabels.firstName}
              value={values.firstName}
              error={errors.firstName}
              name="firstName"
              onChange={(firstName) => handleChange('firstName', firstName?.trim())}
            />
            <TextField
              label={inputLabels.lastName}
              name="lastName"
              value={values.lastName}
              error={errors.lastName}
              onChange={(lastName) => handleChange('lastName', lastName?.trim())}
            />
          </FormRow>
          <FormRow columns={2}>
            <TextField
              label={inputLabels.phone}
              value={values.phone}
              error={errors.phone}
              name="phone"
              placeholder="868888888"
              onChange={(phone) => handleChange('phone', phone)}
            />
            <TextField
              label={inputLabels.email}
              name="email"
              type="email"
              placeholder="vardas.pavardė@am.lt"
              value={values.email}
              error={errors.email}
              onChange={(email) => handleChange('email', email)}
            />
          </FormRow>
        </SimpleContainer>
        <SimpleContainer title={formLabels.roles}>
          <GroupsContainer
            handleChange={handleChange}
            values={values}
            groupOptions={groupOptions}
            errors={errors}
            user={user}
          />
        </SimpleContainer>
        {!isEmpty(values.apps) && (
          <SwitchContainer
            title={formLabels.moduleAccess}
            items={(values.apps as MapAppsProps[]).filter((module) => module.name !== 'Admin')}
            isSelected={(item) => item.selected}
            handleChange={addApp}
          />
        )}
      </>
    );
  };

  if (isFetching) {
    return <LoaderComponent />;
  }

  return (
    <FormPageWrapper
      title={title}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      renderForm={renderForm}
      validationSchema={validateCreateUserForm}
      deleteInfo={deleteInfo}
    />
  );
};

export default GroupsFormPage;
