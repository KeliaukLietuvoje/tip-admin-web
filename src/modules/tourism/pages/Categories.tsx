import Button from '../../../components/buttons/Button';
import TabBar from '../../../components/other/TabBar';
import RecursiveTable from '../../../components/tables/RecursiveTable';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import { TableButtonsInnerRow, TableButtonsRow } from '../../../styles/CommonStyles';
import { NotFoundInfoProps } from '../../../types';
import { useCurrentTab, useGenericTablePageHooks, useTableData } from '../../../utils/hooks';
import Api from '../utils/api';
import { mapCategories } from '../utils/functions';

import { slugs } from '../utils/slugs';
import { settingTabs } from '../utils/tabs';
import { buttonsTitles, emptyStateLabel, infoTableLabels, pageTitles } from '../utils/texts';

const Categories = () => {
  const { navigate, page } = useGenericTablePageHooks();
  const currentTab = useCurrentTab(settingTabs);
  const { tableData, loading } = useTableData({
    endpoint: () =>
      Api.getCategories({
        query: { parent: { $exists: true } },
        page,
      }),
    mapData: (list) => mapCategories(list),
    dependencyArray: [page],
    name: 'categories',
  });

  const notFoundInfo: NotFoundInfoProps = {
    text: emptyStateLabel.categories,
  };

  return (
    <PageWrapper title={pageTitles.categories}>
      <TabBar tabs={settingTabs} activeTab={currentTab} />
      <TableButtonsRow>
        <TableButtonsInnerRow />
        <Button
          onClick={() => {
            navigate(slugs.newCategory);
          }}
          disabled={loading}
        >
          {buttonsTitles.newCategory}
        </Button>
      </TableButtonsRow>
      <RecursiveTable
        onClick={(id: string) => navigate(slugs.category(id))}
        loading={loading}
        isFilterApplied={false}
        data={tableData}
        columns={infoTableLabels}
        notFoundInfo={notFoundInfo}
      />
    </PageWrapper>
  );
};

export default Categories;
