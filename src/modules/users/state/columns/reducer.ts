import { createSlice } from "@reduxjs/toolkit";
import { Columns } from "../../../../types";
import { handleToggleColumns } from "../../../../utils/functions";
import { groupLabels, userLabels } from "../../utils/texts";

interface UsersFiltersState {
  user: Columns;
  group: Columns;
}

const initialState: UsersFiltersState = {
  user: userLabels,
  group: groupLabels
};

export const ColumnsReducer = createSlice({
  name: "userColumns",
  initialState,
  reducers: {
    setUserColumns: (state, action) => {
      handleToggleColumns(state.user, action.payload);
    },
    setGroupsColumns: (state, action) => {
      handleToggleColumns(state.group, action.payload);
    }
  }
});

export default ColumnsReducer.reducer;

export const actions = ColumnsReducer.actions;
