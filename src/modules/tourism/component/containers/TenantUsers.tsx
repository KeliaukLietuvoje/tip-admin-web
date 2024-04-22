import Button from '../../../../components/buttons/Button';
import MainTable from '../../../../components/tables/MainTable';
import { TableButtonsInnerRow, TableButtonsRow } from '../../../../styles/CommonStyles';
import { useGenericTablePageHooks, useTableData } from '../../../../utils/hooks';
import api from '../../utils/api';
import { mapTenantUsersList } from '../../utils/functions';
import { slugs } from '../../utils/slugs';
import { buttonsTitles, tenantUsersLabels } from '../../utils/texts';

const TenantUsers = () => {
  const { navigate, page, id } = useGenericTablePageHooks();

  const { tableData, loading } = useTableData({
    name: 'tenantUser',
    endpoint: () =>
      api.getTenantUsers({
        id,
        page,
      }),
    mapData: (list) => mapTenantUsersList(list),
    dependencyArray: [id, page],
  });

  return (
    <>
      <TableButtonsRow>
        <TableButtonsInnerRow />
        <Button
          onClick={() => {
            navigate(slugs.newTenantUser(id!));
          }}
          disabled={loading}
        >
          {buttonsTitles.newTenantUser}
        </Button>
      </TableButtonsRow>
      <MainTable
        loading={loading}
        onClick={(id) => navigate(slugs.userForms(id))}
        isFilterApplied={false}
        notFoundInfo={{}}
        data={tableData}
        columns={tenantUsersLabels}
      />
    </>
  );
};

export default TenantUsers;
