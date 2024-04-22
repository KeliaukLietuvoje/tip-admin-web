import Button from '../../../components/buttons/Button';
import TabBar from '../../../components/other/TabBar';
import MainTable from '../../../components/tables/MainTable';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import { TableButtonsInnerRow, TableButtonsRow } from '../../../styles/CommonStyles';
import { NotFoundInfoProps } from '../../../types';
import { useCurrentTab, useGenericTablePageHooks, useTableData } from '../../../utils/hooks';
import Api from '../utils/api';
import { mapInfos } from '../utils/functions';

import { slugs } from '../utils/slugs';
import { settingTabs } from '../utils/tabs';
import { buttonsTitles, emptyStateLabel, infoTableLabels, pageTitles } from '../utils/texts';

const AdditionalInfos = () => {
  const { navigate, page } = useGenericTablePageHooks();
  const currentTab = useCurrentTab(settingTabs);

  const { tableData, loading } = useTableData({
    endpoint: () =>
      Api.getAdditionalInfos({
        page,
      }),
    mapData: (list) => mapInfos(list),
    dependencyArray: [page],
    name: 'additionalInfos',
  });

  const notFoundInfo: NotFoundInfoProps = {
    text: emptyStateLabel.categories,
  };

  return (
    <PageWrapper title={pageTitles.additionalInfos}>
      <TabBar tabs={settingTabs} activeTab={currentTab} />
      <TableButtonsRow>
        <TableButtonsInnerRow />
        <Button
          onClick={() => {
            navigate(slugs.newAdditionalInfo);
          }}
          disabled={loading}
        >
          {buttonsTitles.newAdditionalInfo}
        </Button>
      </TableButtonsRow>
      <MainTable
        onClick={(id: string) => navigate(slugs.additionalInfo(id))}
        loading={loading}
        isFilterApplied={false}
        data={tableData}
        notFoundInfo={notFoundInfo}
        columns={infoTableLabels}
      />
    </PageWrapper>
  );
};

export default AdditionalInfos;
