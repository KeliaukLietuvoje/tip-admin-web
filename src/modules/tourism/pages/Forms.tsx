import { Table } from '@aplinkosministerija/design-system';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Button from '../../../components/buttons/Button';
import DynamicFilter from '../../../components/other/DynamicFilter';
import { FilterInputTypes } from '../../../components/other/DynamicFilter/Filter';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import { useAppSelector } from '../../../state/hooks';
import { TableButtonsInnerRow, TableButtonsRow } from '../../../styles/CommonStyles';
import { NotFoundInfoProps } from '../../../types';
import { handleErrorToastFromServer } from '../../../utils/functions';
import { useGenericTablePageHooks, useGetSortedColumns, useTableData } from '../../../utils/hooks';
import { actions } from '../state/filters/reducer';
import { default as api, default as Api } from '../utils/api';
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
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>();
  const queryClient = useQueryClient();
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

  const removeForms = useMutation(() => api.deleteForms({ ids: selectedItemIds }), {
    onError: () => {
      handleErrorToastFromServer();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tourismForms']);
    },
    retry: false,
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
          {!!selectedItemIds?.length && (
            <Button
              onClick={() => {
                removeForms.mutateAsync();
              }}
              loading={removeForms.isLoading}
            >
              {buttonsTitles.removeForms}
            </Button>
          )}
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
      <Table
        onClick={(form: any) => navigate(slugs.form(form.id))}
        loading={loading}
        isFilterApplied={!isEmpty(filter)}
        data={tableData}
        notFoundInfo={notFoundInfo}
        columns={sortedColumns}
        selectedItemIds={selectedItemIds}
        onSetSelectedItemIds={(ids) => setSelectedItemIds(ids as number[])}
      />
    </PageWrapper>
  );
};

export default Forms;
