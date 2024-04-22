import { isEmpty } from 'lodash';
import ColumnButton from '../../../components/other/ColumnButton';
import DynamicFilter from '../../../components/other/DynamicFilter';
import { FilterInputTypes } from '../../../components/other/DynamicFilter/Filter';
import TabBar from '../../../components/other/TabBar';
import MainTable from '../../../components/tables/MainTable';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import { useAppSelector } from '../../../state/hooks';
import { TableButtonsInnerRow, TableButtonsRow } from '../../../styles/CommonStyles';
import { NotFoundInfoProps } from '../../../types';
import {
  useCurrentTab,
  useGenericTablePageHooks,
  useGetSortedColumns,
  useTableData,
} from '../../../utils/hooks';
import { actions as columnActions } from '../state/columns/reducer';
import { actions as filterActions } from '../state/filters/reducer';
import Api from '../utils/api';
import { mapUserFilters, mapUsersList } from '../utils/functions';
import { slugs } from '../utils/slugs';
import { tenantsTabs } from '../utils/tabs';
import { emptyStateLabel, pageTitles, userFilterLabels } from '../utils/texts';

const filterConfig = () => ({
  firstName: {
    label: userFilterLabels.firstName,
    key: 'firstName',
    inputType: FilterInputTypes.text,
  },
  lastName: {
    label: userFilterLabels.lastName,
    key: 'lastName',
    inputType: FilterInputTypes.text,
  },
});

const rowConfig = [['firstName', 'lastName']];

const Users = () => {
  const { dispatch, navigate, page } = useGenericTablePageHooks();
  const filters = useAppSelector((state) => state.tourism.filters.user);
  const columns = useAppSelector((state) => state.tourism.columns.user);
  const currentTab = useCurrentTab(tenantsTabs);

  const { tableData, loading } = useTableData({
    name: 'users',
    endpoint: () =>
      Api.getUsers({
        filter: mapUserFilters(filters),
        page: Number(page || 1),
      }),
    mapData: (list) => mapUsersList(list),
    dependencyArray: [page, filters],
  });

  const sortedColumns = useGetSortedColumns(columns);

  const notFoundInfo: NotFoundInfoProps = {
    text: emptyStateLabel.user,
  };

  const handleSetFilters = (filters) => dispatch(filterActions.setUserFilters(filters));
  const handleSetColumns = (key) => dispatch(columnActions.toggleUserColumns(key));

  return (
    <PageWrapper title={pageTitles.users}>
      <TabBar tabs={tenantsTabs} activeTab={currentTab} />
      <TableButtonsRow>
        <TableButtonsInnerRow>
          <DynamicFilter
            filters={filters}
            filterConfig={filterConfig()}
            rowConfig={rowConfig}
            onSetFilters={handleSetFilters}
            disabled={loading}
          />
          <ColumnButton onToggle={handleSetColumns} columns={sortedColumns} />
        </TableButtonsInnerRow>
      </TableButtonsRow>
      <MainTable
        loading={loading}
        onClick={(id: string) => {
          navigate(slugs.userForms(id));
        }}
        isFilterApplied={!isEmpty(filters)}
        columns={sortedColumns}
        data={tableData}
        notFoundInfo={notFoundInfo}
      />
    </PageWrapper>
  );
};

export default Users;
