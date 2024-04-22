import { createSlice } from "@reduxjs/toolkit";
import { Tenant, User } from "../../../../types";

export interface DataState {
  tenants?: Tenant[];
  users?: User[];
}

const initialState: DataState = {};

export const DataReducer = createSlice({
  name: "data",
  initialState,
  reducers: {
    setTenants: (state, action) => {
      return { ...state, tenants: action.payload };
    },
    setUsers: (state, action) => {
      return { ...state, users: action.payload };
    }
  }
});

export default DataReducer.reducer;

export const actions = DataReducer.actions;
