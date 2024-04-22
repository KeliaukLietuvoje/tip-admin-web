import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../../components/buttons/Button';
import Table from '../../../components/tables/MainTable';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import { TableButtonsInnerRow, TableButtonsRow } from '../../../styles/CommonStyles';
import { NotFoundInfoProps } from '../../../types';
import { useTableData } from '../../../utils/hooks';
import Api from '../utils/api';
import { mapPermissionsList } from '../utils/functions';
import { routes } from '../utils/routes';
import {
  buttonsTitles,
  emptyState,
  emptyStateUrl,
  pageTitles,
  permissionLabels,
} from '../utils/texts';

const PermissionsList = () => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...Array.from(searchParams)]);
  const { page } = params;
  const navigate = useNavigate();

  const { tableData, loading } = useTableData({
    name: 'permissions',
    endpoint: () => Api.getPermissions({ page }),
    mapData: (list) => mapPermissionsList(list),
    dependencyArray: [searchParams, page],
  });

  const notFoundInfo: NotFoundInfoProps = {
    text: emptyState.permissions,
    url: routes.newPermission,
    urlText: emptyStateUrl.permission,
  };

  return (
    <PageWrapper title={pageTitles.permissions}>
      <TableButtonsRow>
        <TableButtonsInnerRow />
        <Button onClick={() => navigate(routes.newPermission)}>
          {buttonsTitles.newPermission}
        </Button>
      </TableButtonsRow>
      <Table
        loading={loading}
        notFoundInfo={notFoundInfo}
        data={tableData}
        columns={permissionLabels}
      />
    </PageWrapper>
  );
};

export default PermissionsList;
