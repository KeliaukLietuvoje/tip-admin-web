import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../components/buttons/BackButton';
import DeleteComponent from '../../../components/other/DeleteComponent';
import EditIcon from '../../../components/other/EditIcon';
import InfoAboutTenants from '../../../components/other/InfoAboutUserTenants';
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
import { default as api, default as Api } from '../utils/api';
import { Resources } from '../utils/constants';
import { useUserTenantInfo } from '../utils/hooks';
import { slugs } from '../utils/slugs';
import { getUserTabs } from '../utils/tabs';
import {
  deleteDescriptionFirstPart,
  deleteDescriptionSecondPart,
  deleteTitles,
  emptyStateLabel,
  roleLabels,
} from '../utils/texts';

const UserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const tabs = getUserTabs(id!);
  const currentTabValue = useCurrentTab(tabs);

  const { isLoading, data: user } = useQuery(['user', id], () => Api.getUser(id!), {
    onError: () => {
      navigate(slugs.users);
    },
  });

  const tenantUsersInfo = useUserTenantInfo(user?.profiles!, roleLabels);

  const filter = { createdBy: id };

  const containers = {
    [Resources.FORMS]: (
      <Forms queryName={'userForms'} filter={filter} emptyStateText={emptyStateLabel.userForm} />
    ),
  };

  const fullName = `${user?.firstName} ${user?.lastName}`;

  const handleDeleteMutation = useMutation(() => api.deleteUser(id!), {
    onSuccess: () => {
      navigate(slugs.users);
    },
  });

  const deleteInfo: DeleteInfoProps = {
    deleteDescriptionFirstPart: deleteDescriptionFirstPart.delete,
    deleteDescriptionSecondPart: deleteDescriptionSecondPart.user,
    deleteTitle: deleteTitles.user,
    deleteName: fullName,
    handleDelete: handleDeleteMutation.mutateAsync,
  };

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <ViewContainer>
      <BackButton />
      <ViewRow>
        <ViewInnerRow>
          <ViewTitle>{fullName}</ViewTitle>
          <EditIcon onClick={() => navigate(slugs.updateUser(id!))} />
        </ViewInnerRow>
        <DeleteComponent deleteInfo={deleteInfo} />
      </ViewRow>
      <InfoRow info={[user?.phone!, user?.email!]} />
      <InfoAboutTenants info={tenantUsersInfo} />
      <SimpleContainer>
        <StyledTabBar tabs={tabs} activeTab={currentTabValue} />
        {containers[currentTabValue]}
      </SimpleContainer>
    </ViewContainer>
  );
};

export default UserPage;
