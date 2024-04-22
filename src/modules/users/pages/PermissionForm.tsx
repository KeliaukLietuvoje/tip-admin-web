import { isEmpty } from 'lodash';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import MultiSelect from '../../../components/fields/MultiSelect';
import SelectField from '../../../components/fields/SelectField';
import TreeSelectField from '../../../components/fields/TreeSelect';
import LoaderComponent from '../../../components/other/LoaderComponent';
import SimpleContainer from '../../../components/other/SimpleContainer';
import FormPageWrapper from '../../../components/wrappers/FormPageWrapper';
import { FormRow } from '../../../styles/CommonStyles';
import { App, DeleteInfoProps, Group, Module, Permission, RoleType } from '../../../types';
import { handleError, isNew } from '../../../utils/functions';
import { Permissions } from '../../../utils/router';
import { accessLabels, featureLabels } from '../../../utils/texts';
import Api from '../utils/api';
import { getGroupApps } from '../utils/apps';
import { getPermissionRoleOptions } from '../utils/options';
import { routes } from '../utils/routes';
import {
  buttonsTitles,
  deleteDescriptionFirstPart,
  deleteDescriptionSecondPart,
  deleteTitles,
  formLabels,
  inputLabels,
  pageTitles,
  roleLabels,
  validationTexts,
} from '../utils/texts';
import { additionalPermissionFormErrors, validatePermissionForm } from '../utils/validation';

const PermissionFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const title = isNew(id) ? pageTitles.newPermission : pageTitles.updatePermission;

  const handleSubmit = async ({ app, group, features, role, accesses }: Permission) => {
    const appType = (app as App)?.type;
    const allFeatures = Permissions[appType]?.features || [];

    const isSelectedAllFeatures = features?.length === allFeatures.length;

    const params: Permission = {
      app: (app as App)?.id,

      group: group,
      ...(!!features && isSelectedAllFeatures ? { features: [] } : { features }),
      ...(role !== RoleType.ALL && { role }),
      ...(!!accesses && { accesses }),
    };

    if (isNew(id)) {
      return await createPermission.mutateAsync(params);
    }

    return await updatePermission.mutateAsync(params);
  };

  const createPermission = useMutation((params: Permission) => Api.createPermission({ params }), {
    onError: () => {
      handleError();
    },
    onSuccess: () => {
      navigate(routes.permissions);
    },
    retry: false,
  });

  const updatePermission = useMutation(
    (params: Permission) => Api.updatePermission({ params, id: id! }),
    {
      onError: () => {
        handleError();
      },
      onSuccess: () => {
        navigate(routes.permissions);
      },
      retry: false,
    },
  );

  const handleDelete = useMutation(
    () =>
      Api.deletePermission({
        id,
      }),
    {
      onError: () => {
        handleError();
      },
      onSuccess: () => {
        navigate(routes.permissions);
      },
    },
  );

  const deleteInfo: DeleteInfoProps = {
    deleteButtonText: buttonsTitles.deletePermission,
    deleteDescriptionFirstPart: deleteDescriptionFirstPart.permission,
    deleteDescriptionSecondPart: deleteDescriptionSecondPart.permission,
    deleteTitle: deleteTitles.permission,
    handleDelete: !isNew(id) ? handleDelete.mutateAsync : undefined,
  };

  const { isLoading, data: permission } = useQuery(
    ['permission', id],
    () => Api.getPermission({ id }),
    {
      onError: () => {
        navigate(routes.permissions);
      },
      enabled: !isNew(id),
    },
  );

  const { data: groupOptions = [] } = useQuery(
    ['groupOptions', id],
    async () => (await Api.getPermissionGroups()).rows,
    {
      onError: () => {
        handleError();
      },
    },
  );

  const { data: userApp } = useQuery(['userModule', id], async () => Api.getUserModule(), {
    onError: () => {
      handleError();
    },
  });

  const initialValues: Permission = {
    app: permission?.app || undefined,
    group: permission?.group || undefined,
    role: permission?.role || RoleType.ALL,
    features: isEmpty(permission?.features)
      ? Permissions[(permission?.app as App)?.type]?.features
      : permission?.features,
    accesses: permission?.accesses || [],
  };
  const roleOptions = getPermissionRoleOptions();

  const renderForm = (values: Permission, errors, handleChange) => {
    const selectedAdmin = values.role === RoleType.ADMIN;
    const appType = (values.app as App)?.type;

    const apps = getGroupApps(groupOptions, values?.group as string);

    const modules = selectedAdmin ? [userApp, ...apps] : [...apps];
    const features = Permissions[appType]?.features || [];
    const accesses = Permissions[appType]?.accesses || [];
    const hasGroup = !isEmpty(apps);
    const hasFeatures = !isEmpty(features);
    const hasAccesses = !isEmpty(accesses);
    const isUsersModule = appType === Module.USERS;

    const handleSetApp = (app: App) => {
      handleChange(`app`, app);
      handleChange('features', Permissions[app?.type]?.features);
      handleChange('accesses', Permissions[app?.type].accesses);
    };
    const handleSetGroup = (group: Group) => {
      if (isEmpty(getGroupApps(groupOptions, group.id)))
        return alert(validationTexts.moduleHasNoFeatures);

      handleChange(`group`, group.id);
      handleChange('app', null);
      handleChange('features', []);
      handleChange('accesses', []);
      handleChange('role', '');
    };

    return (
      <SimpleContainer title={formLabels.permissions}>
        <FormRow columns={2}>
          <TreeSelectField
            label={inputLabels.group}
            name={`group`}
            error={errors?.group}
            groupOptions={groupOptions}
            value={values.group}
            onChange={handleSetGroup}
          />
          {hasGroup && (
            <SelectField
              options={roleOptions}
              label={inputLabels.role}
              error={errors?.role}
              value={values?.role}
              onChange={(role) => handleChange(`role`, role)}
              getOptionLabel={(role) => roleLabels[role]}
            />
          )}
        </FormRow>
        <FormRow columns={2}>
          {hasGroup && (
            <SelectField
              options={modules}
              label={inputLabels.module}
              name={`app`}
              error={errors?.app}
              value={values?.app}
              onChange={handleSetApp}
              getOptionLabel={(app: App) => app?.name}
            />
          )}
          {hasFeatures && (
            <MultiSelect
              label={inputLabels.features}
              error={errors.features}
              getOptionLabel={(option) => featureLabels[option]}
              getOptionValue={(option) => option}
              disabled={isUsersModule}
              values={values.features}
              options={features}
              onChange={(features) => handleChange('features', features)}
            />
          )}
          {hasAccesses && (
            <MultiSelect
              label={inputLabels.accesses}
              error={errors.accesses}
              values={values.accesses}
              getOptionLabel={(option) => accessLabels[option]}
              getOptionValue={(option) => option}
              options={accesses}
              onChange={(accesses) => handleChange('accesses', accesses)}
            />
          )}
        </FormRow>
      </SimpleContainer>
    );
  };

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <FormPageWrapper
      title={title}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      renderForm={renderForm}
      validationSchema={validatePermissionForm}
      additionalValidation={additionalPermissionFormErrors}
      deleteInfo={deleteInfo}
    />
  );
};

export default PermissionFormPage;
