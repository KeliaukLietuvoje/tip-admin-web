import { isEmpty } from 'lodash';
import Button from '../../../components/buttons/Button';
import DynamicFilter from '../../../components/other/DynamicFilter';
import { FilterInputTypes } from '../../../components/other/DynamicFilter/Filter';
import MainTable from '../../../components/tables/MainTable';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import { useAppSelector } from '../../../state/hooks';
import { TableButtonsInnerRow, TableButtonsRow } from '../../../styles/CommonStyles';
import { NotFoundInfoProps } from '../../../types';
import { useGenericTablePageHooks, useGetSortedColumns, useTableData } from '../../../utils/hooks';
import { actions } from '../state/filters/reducer';
import Api from '../utils/api';
import { getTenants, mapFormFilters, mapForms } from '../utils/functions';
import { getFormStatusTypes } from '../utils/options';

import { slugs } from '../utils/slugs';
import {
  buttonsTitles,
  emptyStateLabel,
  formFiltersLabels,
  formTableLabels,
  pageTitles,
} from '../utils/texts';

const filterConfig = () => {
  return {
    nameLT: {
      label: formFiltersLabels.name,
      key: 'nameLT',
      inputType: FilterInputTypes.text,
    },
    createdFrom: {
      label: formFiltersLabels.createdFrom,
      key: 'createdFrom',
      inputType: FilterInputTypes.date,
    },
    createdTo: {
      label: formFiltersLabels.createdTo,
      key: 'createdTo',
      inputType: FilterInputTypes.date,
    },
    status: {
      label: formFiltersLabels.status,
      key: 'status',
      inputType: FilterInputTypes.multiselect,
      options: getFormStatusTypes(),
    },
    tenant: {
      label: formFiltersLabels.tenant,
      key: 'tenant',
      inputType: FilterInputTypes.asyncSingleSelect,
      optionLabel: (option) => `${option?.name}`,
      optionsApi: getTenants,
    },
  };
};

const rowConfig = [['nameLT'], ['createdFrom', 'createdTo'], ['status'], ['tenant']];

const Forms = () => {
  const { navigate, page, dispatch } = useGenericTablePageHooks();
  const filter = useAppSelector((state) => state.tourism.filters.form);

  const { tableData, loading } = useTableData({
    endpoint: () =>
      Api.getForms({
        page,
        filter: mapFormFilters(filter),
      }),
    mapData: (list) => mapForms(list),
    dependencyArray: [page, filter],
    name: 'tourismForms',
  });

  const handleSetFilters = (filter: any) => {
    dispatch(actions.setFormFilters(filter));
  };

  const notFoundInfo: NotFoundInfoProps = {
    text: emptyStateLabel.form,
  };

  const sortedColumns = useGetSortedColumns(formTableLabels);

  return (
    <PageWrapper title={pageTitles.forms}>
      <TableButtonsRow>
        <TableButtonsInnerRow>
          <DynamicFilter
            filters={filter}
            filterConfig={filterConfig()}
            rowConfig={rowConfig}
            onSetFilters={handleSetFilters}
            disabled={loading}
          />
        </TableButtonsInnerRow>
        <Button
          onClick={() => {
            navigate(slugs.newForm);
          }}
          disabled={loading}
        >
          {buttonsTitles.newForm}
        </Button>
      </TableButtonsRow>
      <MainTable
        onClick={(id: string) => navigate(slugs.form(id))}
        loading={loading}
        isFilterApplied={!isEmpty(filter)}
        data={tableData}
        notFoundInfo={notFoundInfo}
        columns={sortedColumns}
      />
    </PageWrapper>
  );
};

export default Forms;
