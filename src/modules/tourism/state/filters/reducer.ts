import { createSlice } from '@reduxjs/toolkit';
import { FormFilters, TenantFilters, UserFilters } from '../../utils/types';

interface FiltersState {
  form: FormFilters;
  user: UserFilters;
  tenant: TenantFilters;
  tenantUser: UserFilters;
}

const initialState: FiltersState = {
  form: {},
  user: {},
  tenant: {},
  tenantUser: {},
};

export const FiltersReducer = createSlice({
  name: 'tourismFilters',
  initialState,
  reducers: {
    setFormFilters: (state, action) => {
      return { ...state, form: action.payload };
    },
    setUserFilters: (state, action) => {
      return { ...state, user: action.payload };
    },
    setTenantFilters: (state, action) => {
      return { ...state, tenant: action.payload };
    },

    setTenantFormFilters: (state, action) => {
      return { ...state, tenantForm: action.payload };
    },
    setTenantUserFilters: (state, action) => {
      return { ...state, tenantUser: action.payload };
    },
  },
});

export default FiltersReducer.reducer;

export const actions = FiltersReducer.actions;
