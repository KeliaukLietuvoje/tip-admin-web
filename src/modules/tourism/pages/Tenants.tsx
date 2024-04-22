import { isEmpty } from 'lodash';
import Button, { ButtonColors } from '../../../components/buttons/Button';
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
import { mapTenantsList } from '../utils/functions';
import { slugs } from '../utils/slugs';

import { tenantsTabs } from '../utils/tabs';
import {
  buttonsTitles,
  emptyStateLabel,
  emptyStateUrlLabels,
  pageTitles,
  tenantFilterLabels,
} from '../utils/texts';

const filterConfig = () => ({
  name: {
    label: tenantFilterLabels.tenant,
    key: 'name',
    inputType: FilterInputTypes.text,
  },
  code: {
    label: tenantFilterLabels.code,
    key: 'code',
    inputType: FilterInputTypes.text,
  },
});

const rowConfig = [['name', 'code']];

const Tenants = () => {
  const { dispatch, navigate, page } = useGenericTablePageHooks();
  const filters = useAppSelector((state) => state.tourism.filters.tenant);
  const columns = useAppSelector((state) => state.tourism.columns.tenant);
  const currentTab = useCurrentTab(tenantsTabs);

  const { tableData, loading } = useTableData({
    name: 'tenants',
    endpoint: () =>
      Api.getTenants({
        filter: filters,
        page: Number(page || 1),
      }),
    mapData: (list) => mapTenantsList(list),
    dependencyArray: [page, filters],
  });

  const sortedColumns = useGetSortedColumns(columns);

  const handleSetColumns = (key: string) => {
    dispatch(columnActions.toggleTenantColumns(key));
  };

  const handleSetFilters = (filters) => {
    dispatch(filterActions.setTenantFilters(filters));
  };

  const notFoundInfo: NotFoundInfoProps = {
    text: emptyStateLabel.tenant,
    url: slugs.newTenant,
    urlText: emptyStateUrlLabels.tenant,
  };

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
        <Button
          onClick={() => {
            navigate(slugs.newTenant);
          }}
          disabled={loading}
          variant={ButtonColors.PRIMARY}
        >
          {buttonsTitles.newTenant}
        </Button>
      </TableButtonsRow>
      <MainTable
        loading={loading}
        onClick={(id: string) => {
          navigate(slugs.tenantUsers(id));
        }}
        isFilterApplied={!isEmpty(filters)}
        columns={columns}
        data={tableData}
        notFoundInfo={notFoundInfo}
      />
    </PageWrapper>
  );
};

export default Tenants;
