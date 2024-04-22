import MainTable from "../../../../components/tables/MainTable";
import { InfoContainerProps, NotFoundInfoProps } from "../../../../types";
import {
  useGenericTablePageHooks,
  useTableData
} from "../../../../utils/hooks";
import api from "../../utils/api";
import { mapForms } from "../../utils/functions";
import { slugs } from "../../utils/slugs";
import { formTableLabels } from "../../utils/texts";

const Forms = ({ filter, queryName, emptyStateText }: InfoContainerProps) => {
  const { navigate, page, id } = useGenericTablePageHooks();

  const { tableData, loading } = useTableData({
    endpoint: () =>
      api.getForms({
        query: filter,
        page: Number(page || 1)
      }),
    mapData: (list) => mapForms(list),
    dependencyArray: [id, page],
    name: queryName
  });

  const notFound: NotFoundInfoProps = { text: emptyStateText };

  return (
    <MainTable
      loading={loading}
      onClick={(id) => navigate(slugs.form(id))}
      isFilterApplied={false}
      notFoundInfo={notFound}
      data={tableData}
      columns={formTableLabels}
    />
  );
};

export default Forms;
