import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../components/buttons/BackButton';
import DeleteComponent from '../../../components/other/DeleteComponent';
import EditIcon from '../../../components/other/EditIcon';
import InfoRow from '../../../components/other/InfoRow';
import LoaderComponent from '../../../components/other/LoaderComponent';
import SimpleContainer from '../../../components/other/SimpleContainer';
import {
  StyledTabBar,
  ViewContainer,
  ViewInnerRow,
  ViewRow,
  ViewTitle,
} from '../../../styles/CommonStyles';
import { DeleteInfoProps } from '../../../types';
import { useCurrentTab } from '../../../utils/hooks';
import Forms from '../component/containers/Forms';
import TenantUsers from '../component/containers/TenantUsers';
import { default as api, default as Api } from '../utils/api';
import { Resources } from '../utils/constants';
import { slugs } from '../utils/slugs';
import { getTenantTabs } from '../utils/tabs';
import {
  deleteDescriptionFirstPart,
  deleteDescriptionSecondPart,
  deleteTitles,
  emptyStateLabel,
} from '../utils/texts';

const TenantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const filter = { tenant: id };

  const containers = {
    [Resources.TENANT_USERS]: <TenantUsers />,
    [Resources.FORMS]: (
      <Forms
        queryName={'tenantForms'}
        filter={filter}
        emptyStateText={emptyStateLabel.tenantForm}
      />
    ),
  };

  const { isLoading, data: tenant } = useQuery(['tenant', id], () => Api.getTenant(id!), {
    onError: () => {
      navigate(slugs.tenants);
    },
  });

  const handleDeleteMutation = useMutation(() => api.deleteTenant(id!), {
    onSuccess: () => {
      navigate(slugs.tenants);
    },
  });

  const deleteInfo: DeleteInfoProps = {
    deleteDescriptionFirstPart: deleteDescriptionFirstPart.delete,
    deleteDescriptionSecondPart: deleteDescriptionSecondPart.tenant,
    deleteTitle: deleteTitles.tenant,
    deleteName: tenant?.name,
    handleDelete: handleDeleteMutation.mutateAsync,
  };

  const tabs = getTenantTabs(id!);
  const currentTabValue = useCurrentTab(tabs);

  if (isLoading) {
    return <LoaderComponent />;
  }

  const info = [tenant?.code ? `Įm.k. ${tenant?.code}` : '', tenant?.phone!, tenant?.email!];

  return (
    <ViewContainer>
      <BackButton />
      <ViewRow>
        <ViewInnerRow>
          <ViewTitle>{tenant?.name}</ViewTitle>
          <EditIcon onClick={() => navigate(slugs.updateTenant(id!))} />
        </ViewInnerRow>
        <DeleteComponent deleteInfo={deleteInfo} />
      </ViewRow>
      <InfoRow info={info} />

      <SimpleContainer>
        <StyledTabBar tabs={tabs} activeTab={currentTabValue} />
        {containers[currentTabValue]}
      </SimpleContainer>
    </ViewContainer>
  );
};

export default TenantPage;
