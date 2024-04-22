import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../components/buttons/BackButton';
import Breadcrumbs from '../../../components/other/Breadcrumbs';
import EditIcon from '../../../components/other/EditIcon';
import InfoRow from '../../../components/other/InfoRow';
import LoaderComponent from '../../../components/other/LoaderComponent';
import SimpleContainer from '../../../components/other/SimpleContainer';
import StatusTag from '../../../components/other/StatusTag';
import {
  StyledTabBar,
  ViewContainer,
  ViewInnerRow,
  ViewRow,
  ViewTitle,
} from '../../../styles/CommonStyles';
import { App, BreadcrumbsProps } from '../../../types';
import { TagColors } from '../../../utils/constants';
import { handleGenerateBreadcrumbsPath } from '../../../utils/functions';
import { useCurrentTab } from '../../../utils/hooks';
import GroupDeleteComponent from '../Components/AdditionalDeleteGroupComponent';
import GroupGroups from '../Components/GroupGroups';
import GroupUser from '../Components/GroupUser';
import Api from '../utils/api';
import { Resources } from '../utils/constants';
import { routes } from '../utils/routes';
import { getGroupTabs } from '../utils/tabs';
import { pageTitles } from '../utils/texts';

export interface GroupProps {
  name: string;
  apps: App[];
  municipalities: string[];
}

const GroupsFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, data: group } = useQuery(['group', id], () => Api.getGroup({ id }), {
    onError: () => {
      navigate(routes.groups);
    },
  });

  const { data: breadCrumbs = [] } = useQuery(
    ['breadCrumbs', id],
    async () => handleGenerateBreadcrumbsPath({ group: await Api.getParent({ id }) }),
    {
      onError: () => {
        navigate(routes.groups);
      },
      enabled: !!id,
    },
  );

  const info = group?.apps?.map((group) => (
    <StatusTag label={group?.name!} color={TagColors.BLUE} />
  ));

  const breadCrumbsInfo: BreadcrumbsProps = {
    breadCrumbs,
    homeName: pageTitles.groups,
    homeRoute: routes.groups,
    pathRoute: routes.groupUsers,
  };

  const tabs = getGroupTabs(id!);
  const currentTabValue = useCurrentTab(tabs);

  if (isLoading) {
    return <LoaderComponent />;
  }

  const containers = {
    [Resources.USERS]: <GroupUser users={group?.users!} />,
    [Resources.GROUPS]: <GroupGroups groups={group?.children!} />,
  };

  return (
    <ViewContainer>
      <BackButton />
      <Breadcrumbs
        groups={breadCrumbsInfo?.breadCrumbs}
        homeName={breadCrumbsInfo?.homeName}
        homeRoute={breadCrumbsInfo?.homeRoute}
        pathRoute={(id) => breadCrumbsInfo.pathRoute(id)}
      />
      <ViewRow>
        <ViewInnerRow>
          <ViewTitle>{group?.name || '-'}</ViewTitle>
          <EditIcon onClick={() => navigate(routes.editGroup(id!))} />
        </ViewInnerRow>
        <GroupDeleteComponent group={group} />
      </ViewRow>
      <InfoRow info={info} />
      <SimpleContainer>
        <StyledTabBar tabs={tabs} activeTab={currentTabValue} />
        {containers[currentTabValue]}
      </SimpleContainer>
    </ViewContainer>
  );
};

export default GroupsFormPage;
