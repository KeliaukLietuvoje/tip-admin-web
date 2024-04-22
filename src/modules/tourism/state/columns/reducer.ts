import { createSlice } from '@reduxjs/toolkit';
import { Columns } from '../../../../types';
import { handleToggleColumns } from '../../../../utils/functions';
import { formTableLabels, tenantsLabels, tenantUsersLabels, usersLabels } from '../../utils/texts';

interface TourismColumnsState {
  form: Columns;
  user: Columns;
  tenant: Columns;
  tenantUser: Columns;
}

const initialState: TourismColumnsState = {
  form: formTableLabels,
  user: usersLabels,
  tenant: tenantsLabels,
  tenantUser: tenantUsersLabels,
};

export const ColumnReducer = createSlice({
  name: 'tourismColumns',
  initialState,
  reducers: {
    toggleFormColumns: (state, action) => {
      handleToggleColumns(state.form, action.payload);
    },

    toggleUserColumns: (state, action) => {
      handleToggleColumns(state.user, action.payload);
    },
    toggleTenantColumns: (state, action) => {
      handleToggleColumns(state.tenant, action.payload);
    },
    toggleTenantUserColumns: (state, action) => {
      handleToggleColumns(state.tenantUser, action.payload);
    },
  },
});

export default ColumnReducer.reducer;

export const actions = ColumnReducer.actions;
