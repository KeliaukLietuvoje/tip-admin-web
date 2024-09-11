import { isEmpty } from 'lodash';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import MultiSelect from '../../../components/fields/MultiSelect';
import TextField from '../../../components/fields/TextField';
import LoaderComponent from '../../../components/other/LoaderComponent';
import SimpleContainer from '../../../components/other/SimpleContainer';
import FormPageWrapper from '../../../components/wrappers/FormPageWrapper';
import { App, Municipality } from '../../../types';
import { handleErrorToastFromServer, isNew } from '../../../utils/functions';
import { useCheckAccess } from '../../../utils/hooks';
import { Accesses } from '../utils/accesses';
import Api from '../utils/api';
import { filterOutAdmin } from '../utils/functions';
import { routes } from '../utils/routes';
import { formLabels, inputLabels, pageTitles } from '../utils/texts';
import { validateGroupForm } from '../utils/validation';

export interface GroupProps {
  name?: string;
  apps?: (App | string)[];
  municipalities?: (Municipality | string | undefined)[];
  parent?: string;
}

const GroupsFormPage = () => {
  const [searchParams] = useSearchParams();
  const { parent } = Object.fromEntries([...Array.from(searchParams)]);
  const navigate = useNavigate();
  const { id } = useParams();

  const canManageMunicipalities = useCheckAccess(Accesses.MANAGE_MUNICIPALITIES);

  const title = !isNew(id) ? pageTitles.updateGroup : pageTitles.newGroup;

  const handleSubmit = async ({ name, apps, municipalities }: GroupProps) => {
    const allModulesSelected = apps?.length === filterOutAdmin(apps || []).length;

    const groupApps = parent && allModulesSelected ? [] : apps?.map((app) => (app as App)?.id);

    const params = {
      name,
      apps: groupApps,
      ...(!isEmpty(municipalities) && {
        municipalities: municipalities?.map((municipality) => (municipality as Municipality)?.id),
      }),
    };

    if (isNew(id)) {
      return await createGroup.mutateAsync({
        ...(!!parent && { parent }),
        ...params,
      });
    }

    return await updateGroup.mutateAsync(params);
  };

  const createGroup = useMutation((params: GroupProps) => Api.createGroup({ params }), {
    onError: () => {
      handleErrorToastFromServer();
    },
    onSuccess: () => {
      navigate(routes.groups);
    },
    retry: false,
  });

  const updateGroup = useMutation((params: GroupProps) => Api.updateGroup({ params, id: id! }), {
    onError: () => {
      handleErrorToastFromServer();
    },
    onSuccess: () => {
      navigate(routes.groups);
    },
    retry: false,
  });

  const { data: apps = [] } = useQuery(
    ['apps', parent],
    async () => filterOutAdmin((await Api.getApps({ query: { group: parent } })).rows!),
    {
      onError: () => {
        handleErrorToastFromServer();
      },
    },
  );

  const {} = useQuery(['parentGroup', id], async () => await Api.getParentOfGroup(parent), {
    onError: () => {
      navigate(routes.groups);
    },
    enabled: !!parent,
  });

  const { data: municipalities = [] } = useQuery(
    ['municipalities', id],
    async () => (await Api.getMunicipalities()).rows,
    {
      onError: () => {
        navigate(routes.groups);
      },
    },
  );

  const { isLoading, data: group } = useQuery(
    ['formGroup', id],
    () => Api.getFormGroup({ id, canManageMunicipalities }),
    {
      onError: () => {
        navigate(routes.groups);
      },
      enabled: !isNew(id),
    },
  );

  const getGroupApps = () => {
    if (group?.apps && !isEmpty(group?.apps)) return group?.apps;
    if (parent && !isEmpty(apps)) return apps!;

    return [];
  };

  const initialValues: GroupProps = {
    name: group?.name || '',
    apps: filterOutAdmin(getGroupApps()),
    municipalities:
      group?.municipalities?.map((groupMunicipalities) => {
        return municipalities?.find((municipality) => municipality.id === groupMunicipalities);
      }) || [],
  };

  const renderForm = (values: GroupProps, errors: any, handleChange) => {
    return (
      <SimpleContainer title={formLabels.groupInfo}>
        <Row>
          <TextField
            label={inputLabels.name}
            value={values.name}
            name="name"
            error={errors.name}
            onChange={(e) => handleChange('name', e)}
          />
          <MultiSelect
            label={inputLabels.moduleSelection}
            values={values.apps!}
            getOptionLabel={(option) => option?.name}
            name="apps"
            options={apps!}
            error={errors.apps}
            onChange={(apps: App[]) => handleChange('apps', apps)}
          />
          {canManageMunicipalities && (
            <MultiSelect
              isSearchable={true}
              label={inputLabels.municipalities}
              values={values.municipalities!}
              getOptionLabel={(option) => option?.name}
              name="municipalities"
              options={municipalities}
              error={errors.apps}
              onChange={(municipalities) => {
                handleChange('municipalities', municipalities);
              }}
            />
          )}
        </Row>
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
      validationSchema={validateGroupForm}
    />
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default GroupsFormPage;
