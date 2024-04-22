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

const VisitInfos = () => {
  const { navigate, page } = useGenericTablePageHooks();
  const currentTab = useCurrentTab(settingTabs);

  const { tableData, loading } = useTableData({
    endpoint: () =>
      Api.getVisitInfos({
        page,
      }),
    mapData: (list) => mapInfos(list),
    dependencyArray: [page],
    name: 'visitInfos',
  });

  const notFoundInfo: NotFoundInfoProps = {
    text: emptyStateLabel.visitInfos,
  };

  return (
    <PageWrapper title={pageTitles.visitInfos}>
      <TabBar tabs={settingTabs} activeTab={currentTab} />
      <TableButtonsRow>
        <TableButtonsInnerRow />
        <Button
          onClick={() => {
            navigate(slugs.newVisitInfo);
          }}
          disabled={loading}
        >
          {buttonsTitles.newVisitInfo}
        </Button>
      </TableButtonsRow>
      <MainTable
        onClick={(id: string) => navigate(slugs.visitInfo(id))}
        loading={loading}
        isFilterApplied={false}
        data={tableData}
        notFoundInfo={notFoundInfo}
        columns={infoTableLabels}
      />
    </PageWrapper>
  );
};

export default VisitInfos;
