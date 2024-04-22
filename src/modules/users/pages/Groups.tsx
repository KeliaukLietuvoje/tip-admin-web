import { isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';
import Button from '../../../components/buttons/Button';
import ColumnButton from '../../../components/other/ColumnButton';
import DynamicFilter from '../../../components/other/DynamicFilter';
import { FilterInputTypes } from '../../../components/other/DynamicFilter/Filter';
import RecursiveTable from '../../../components/tables/RecursiveTable';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import { useAppSelector } from '../../../state/hooks';
import { RootState } from '../../../state/store';
import { TableButtonsInnerRow, TableButtonsRow } from '../../../styles/CommonStyles';
import { NotFoundInfoProps, User } from '../../../types';
import { useGenericTablePageHooks, useGetSortedColumns, useTableData } from '../../../utils/hooks';
import { actions as columnActions } from '../state/columns/reducer';
import { actions as filterActions } from '../state/filters/reducer';
import Api from '../utils/api';
import { canCRUDGroup, mapGroupList } from '../utils/functions';
import { routes } from '../utils/routes';
import {
  buttonsTitles,
  emptyState,
  emptyStateUrl,
  groupFilterLabels,
  pageTitles,
} from '../utils/texts';

const filterConfig = () => ({
  groupName: {
    label: groupFilterLabels.name,
    key: 'name',
    inputType: FilterInputTypes.text,
  },
});

const rowConfig = [['groupName']];

const GroupsList = () => {
  const { dispatch, navigate, page } = useGenericTablePageHooks();
  const { id } = useParams();
  const currentUser: User = useAppSelector((state) => state.user.userData);

  const showButton = canCRUDGroup(id, currentUser.type);

  const newGroupUrl = `${routes.newGroup}${id ? `?parent=${id}` : ''}`;

  const filters = useAppSelector((state: RootState) => state.users.filters.groupFilters);
  const columns = useAppSelector((state) => state.users.columns.group);

  const { tableData, loading } = useTableData({
    name: 'groups',
    endpoint: () => Api.getGroups({ page, filter: filters, id }),
    mapData: (list) => mapGroupList(list),
    dependencyArray: [id, filters, page],
  });
  const sortedColumns = useGetSortedColumns(columns);

  const handleSetFilters = (filters) => {
    dispatch(filterActions.setGroupFilters(filters));
  };

  const handleToggleColumns = (key: string) => {
    dispatch(columnActions.setGroupsColumns(key));
  };

  const notFoundInfo: NotFoundInfoProps = {
    text: emptyState.groups,
    url: newGroupUrl,
    urlText: emptyStateUrl.group,
  };

  return (
    <PageWrapper title={pageTitles.groups}>
      <TableButtonsRow>
        <TableButtonsInnerRow>
          <DynamicFilter
            filters={filters}
            filterConfig={filterConfig()}
            rowConfig={rowConfig}
            onSetFilters={(filters) => handleSetFilters(filters)}
            disabled={loading}
          />
          <ColumnButton onToggle={handleToggleColumns} columns={sortedColumns} />
        </TableButtonsInnerRow>
        {showButton && (
          <Button onClick={() => navigate(newGroupUrl)} disabled={loading}>
            {buttonsTitles.newGroups}
          </Button>
        )}
      </TableButtonsRow>
      <RecursiveTable
        onClick={(id) => navigate(routes.groupUsers(id))}
        loading={loading}
        data={tableData}
        columns={sortedColumns}
        isFilterApplied={!isEmpty(filters)}
        notFoundInfo={notFoundInfo}
      />
    </PageWrapper>
  );
};

export default GroupsList;
