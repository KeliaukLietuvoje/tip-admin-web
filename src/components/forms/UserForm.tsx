import styled from "styled-components";
import { DeleteInfoProps } from "../../types";
import InfoAboutTenants, { TenantInfo } from "../other/InfoAboutUserTenants";
import { TableData } from "../tables/MainTable";
import TableContainer from "../tables/TableContainer";
import InfoPageWrapper from "../wrappers/InfoPageWrapper";

export interface TenantPageProps {
  title: string;
  handleDelete: () => void;
  deleteInfo: DeleteInfoProps;
  handleEdit?: () => void;
  user?: any;
  info?: any[];
  tableData: TableData;
  labels: any;
  loading: boolean;
  tabs: any[];
  currentTab: any;
  emptyStateLabel: string;
  button?: JSX.Element;
  tenantInfos: TenantInfo[];
  onRowClick: (id: string) => void;
  filters?: any;
  filterConfig?: any;
  rowConfig?: string[] | any;
  onSetFilters?: (filters: any) => void;
  onSetColumns?: (key: string) => void;
  hideTable?: boolean;
}

const ViewPage = ({
  title,
  handleDelete,
  deleteInfo,
  handleEdit,
  info,
  tableData,
  labels,
  loading,
  emptyStateLabel,
  currentTab,
  tabs,
  button,
  filters,
  tenantInfos,
  onRowClick,
  filterConfig,
  rowConfig,
  hideTable = false,
  user,
  onSetFilters,
  onSetColumns
}: TenantPageProps) => {
  return (
    <InfoPageWrapper
      info={info}
      title={title}
      back={true}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      entity={user}
      deleteInfo={deleteInfo}
    >
      <Container>
        <InfoAboutTenants info={tenantInfos} />
        {!hideTable && (
          <TableContainer
            onRowClick={onRowClick}
            data={tableData}
            columns={labels}
            loading={loading}
            rightButtons={button}
            tabs={tabs}
            currentTab={currentTab?.value}
            emptyStateLabel={emptyStateLabel}
            filters={filters}
            filterConfig={filterConfig}
            rowConfig={rowConfig}
            onSetColumns={onSetColumns}
            onSetFilters={onSetFilters}
          />
        )}
      </Container>
    </InfoPageWrapper>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export default ViewPage;
