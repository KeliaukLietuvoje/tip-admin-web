import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { TableButtonsInnerRow, TableButtonsRow } from '../../styles/CommonStyles';
import { NotFoundInfoProps } from '../../types';
import { useGetSortedColumns } from '../../utils/hooks';
import ColumnButton from '../other/ColumnButton';
import DynamicFilter from '../other/DynamicFilter';
import SimpleContainer from '../other/SimpleContainer';
import TabBar from '../other/TabBar';
import MainTable, { TableData } from './MainTable';

export interface AvatarProps {
  data?: TableData;
  columns: any;
  filters?: any;
  filterConfig?: any;
  rowConfig?: string[][];
  onSetFilters?: (filters: any) => void;
  onSetColumns?: (key: string) => void;
  loading: boolean;
  rightButtons?: JSX.Element;
  leftButtons?: JSX.Element;
  tabs?: any[];
  currentTab?: any;
  emptyStateLabel?: string;
  emptyStateUrlText?: string;
  emptyStateUrl?: string;
  onRowClick?: (id: string) => void;
  onTabClick?: (tab?: any) => void;
  hideTable?: boolean;
  additionalComponent?: any;
}

const TableContainer = ({
  data,
  loading,
  rowConfig,
  onSetFilters,
  onSetColumns,
  filterConfig,
  filters,
  rightButtons,
  leftButtons,
  tabs,
  currentTab,
  emptyStateUrlText,
  emptyStateUrl,
  columns: columns,
  emptyStateLabel,
  onTabClick,
  additionalComponent,
  onRowClick,
}: AvatarProps) => {
  const sortedColumns = useGetSortedColumns(columns);

  const notFoundInfo: NotFoundInfoProps = {
    text: emptyStateLabel,
    url: emptyStateUrl,
    urlText: emptyStateUrlText,
  };

  const renderContent = () => {
    if (additionalComponent) {
      return additionalComponent;
    }

    return (
      <>
        <TableButtonsRow>
          <TableButtonsInnerRow>
            {filterConfig && (
              <StyledDynamicFilter
                filters={filters}
                filterConfig={filterConfig}
                rowConfig={rowConfig}
                onSetFilters={onSetFilters}
                disabled={loading}
              />
            )}

            <ColumnButton onToggle={onSetColumns} columns={sortedColumns} />

            {leftButtons}
          </TableButtonsInnerRow>
          {rightButtons}
        </TableButtonsRow>
        <MainTable
          loading={loading}
          onClick={onRowClick}
          isFilterApplied={!isEmpty(filters)}
          notFoundInfo={notFoundInfo}
          data={data}
          columns={sortedColumns}
        />
      </>
    );
  };

  return (
    <SimpleContainer>
      {
        <>
          {tabs && (
            <StyledTabBar
              onClick={onTabClick}
              tabs={tabs}
              showOneTab={true}
              activeTab={currentTab}
            />
          )}
          {renderContent()}
        </>
      }
    </SimpleContainer>
  );
};

const StyledTabBar = styled(TabBar)`
  margin: -8px -16px 16px -16px;
  padding: 0 16px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StyledDynamicFilter = styled(DynamicFilter)`
  margin: 0;
  padding: 0;
`;

export default TableContainer;
