import { isEmpty } from 'lodash';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../../components/buttons/Button';
import ColumnButton from '../../../components/other/ColumnButton';
import DynamicFilter from '../../../components/other/DynamicFilter';
import { FilterInputTypes } from '../../../components/other/DynamicFilter/Filter';
import Table from '../../../components/tables/MainTable';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { RootState } from '../../../state/store';
import { TableButtonsInnerRow, TableButtonsRow } from '../../../styles/CommonStyles';
import { NotFoundInfoProps } from '../../../types';
import { useGetSortedColumns, useTableData } from '../../../utils/hooks';
import { actions as columnActions } from '../state/columns/reducer';
import { actions as filterActions } from '../state/filters/reducer';
import Api from '../utils/api';
import { getGroupList, mapUserFilters, mapUserQueries, mapUsersList } from '../utils/functions';
import { routes } from '../utils/routes';
import {
  buttonsTitles,
  emptyState,
  emptyStateUrl,
  pageTitles,
  userFilterLabels,
} from '../utils/texts';

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
  email: {
    label: userFilterLabels.email,
    key: 'email',
    inputType: FilterInputTypes.text,
  },
  group: {
    label: userFilterLabels.groups,
    key: 'group',
    inputType: FilterInputTypes.asyncMultiSelect,
    optionsApi: getGroupList,
    optionLabel: (option) => option?.name,
  },
});

const rowConfig = [['firstName', 'lastName'], ['email'], ['group']];

const UsersList = () => {
  const [searchParams] = useSearchParams();
  const { page } = Object.fromEntries([...Array.from(searchParams)]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state: RootState) => state.users.filters.userFilters);
  const columns = useAppSelector((state: RootState) => state.users.columns.user);

  const { tableData, loading } = useTableData({
    name: 'users',
    endpoint: () =>
      Api.getUsers({
        page,
        filter: mapUserFilters(filters),
        query: mapUserQueries(filters),
      }),
    mapData: (list) => mapUsersList(list, navigate),
    dependencyArray: [searchParams, filters, page],
  });

  const handleSetFilters = (filters) => {
    dispatch(filterActions.setUserFilters(filters));
  };

  const handleToggleColumns = (key: string) => {
    dispatch(columnActions.setUserColumns(key));
  };

  const sortedColumns = useGetSortedColumns(columns);

  const notFoundInfo: NotFoundInfoProps = {
    text: emptyState.users,
    url: routes.newUser,
    urlText: emptyStateUrl.user,
  };

  return (
    <PageWrapper title={pageTitles.users}>
      <TableButtonsRow>
        <TableButtonsInnerRow>
          <DynamicFilter
            filters={filters}
            filterConfig={filterConfig()}
            rowConfig={rowConfig}
            onSetFilters={handleSetFilters}
            disabled={loading}
          />
          <ColumnButton onToggle={handleToggleColumns} columns={sortedColumns} />
        </TableButtonsInnerRow>
        <Button onClick={() => navigate(routes.newUser)}>{buttonsTitles.newUser}</Button>
      </TableButtonsRow>
      <Table
        loading={loading}
        notFoundInfo={notFoundInfo}
        isFilterApplied={!isEmpty(filters)}
        data={tableData}
        columns={sortedColumns}
      />
    </PageWrapper>
  );
};

export default UsersList;
