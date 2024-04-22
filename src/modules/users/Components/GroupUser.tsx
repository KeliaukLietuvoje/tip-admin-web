import { useEffect, useState } from 'react';
import Button from '../../../components/buttons/Button';
import MainTable from '../../../components/tables/MainTable';
import { TableButtonsInnerRow, TableButtonsRow } from '../../../styles/CommonStyles';
import { NotFoundInfoProps, TableData, User } from '../../../types';
import { handlePagination } from '../../../utils/functions';
import { useGenericTablePageHooks } from '../../../utils/hooks';
import { mapGroupUsersList } from '../utils/functions';
import { routes } from '../utils/routes';
import { buttonsTitles, emptyState, emptyStateUrl, groupUserLabels } from '../utils/texts';

const GroupUser = ({ users = [] }: { users: User[] }) => {
  const { navigate, page, id } = useGenericTablePageHooks();
  const [tableData, setTableData] = useState<TableData>();
  const newUrl = `${routes.newUser}?group=${id}`;

  useEffect(() => {
    const pageData = handlePagination({
      data: users,
      page: page,
      pageSize: 10,
    });
    setTableData({
      data: mapGroupUsersList(pageData.slicedData),
      totalPages: pageData.totalPages,
    });
  }, [page, users]);

  const notFound: NotFoundInfoProps = {
    text: emptyState.groupUsers,
    url: newUrl,
    urlText: emptyStateUrl.groupUser,
  };

  return (
    <>
      <TableButtonsRow>
        <TableButtonsInnerRow />
        <Button
          onClick={() => {
            navigate(newUrl);
          }}
        >
          {buttonsTitles.newUser}
        </Button>
      </TableButtonsRow>
      <MainTable
        loading={false}
        onClick={(id) => navigate(routes.user(id))}
        isFilterApplied={false}
        notFoundInfo={notFound}
        data={tableData}
        columns={groupUserLabels}
      />
    </>
  );
};

export default GroupUser;
