import { useEffect, useState } from 'react';
import Button from '../../../components/buttons/Button';
import RecursiveTable from '../../../components/tables/RecursiveTable';
import { TableButtonsInnerRow, TableButtonsRow } from '../../../styles/CommonStyles';
import { Group, NotFoundInfoProps, TableData } from '../../../types';
import { handlePagination } from '../../../utils/functions';
import { useGenericTablePageHooks } from '../../../utils/hooks';
import { mapGroupList } from '../utils/functions';
import { routes } from '../utils/routes';
import { buttonsTitles, emptyState, emptyStateUrl, groupLabels } from '../utils/texts';

const GroupGroups = ({ groups = [] }: { groups: Group[] }) => {
  const { navigate, page, id } = useGenericTablePageHooks();
  const [tableData, setTableData] = useState<TableData>();
  const newUrl = `${routes.newGroup}${id ? `?parent=${id}` : ''}`;
  useEffect(() => {
    const pageData = handlePagination({
      data: groups,
      page: page,
      pageSize: 10,
    });
    setTableData({
      data: mapGroupList(pageData.slicedData),
      totalPages: pageData.totalPages,
    });
  }, [page, groups]);

  const notFound: NotFoundInfoProps = {
    text: emptyState.groups,
    url: newUrl,
    urlText: emptyStateUrl.group,
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
          {buttonsTitles.newGroups}
        </Button>
      </TableButtonsRow>
      <RecursiveTable
        loading={false}
        onClick={(id) => navigate(routes.groupUsers(id))}
        isFilterApplied={false}
        notFoundInfo={notFound}
        data={tableData}
        columns={groupLabels}
      />
    </>
  );
};

export default GroupGroups;
