import { createSlice } from "@reduxjs/toolkit";
import { GroupFilters, UserFilters } from "../../utils/types";

interface UsersFiltersState {
  userFilters: UserFilters;
  groupFilters: GroupFilters;
}

const initialState: UsersFiltersState = {
  userFilters: {},
  groupFilters: {}
};

export const FiltersReducer = createSlice({
  name: "userFilters",
  initialState,
  reducers: {
    setUserFilters: (state, action) => {
      return { ...state, userFilters: action.payload };
    },
    setGroupFilters: (state, action) => {
      return { ...state, groupFilters: action.payload };
    }
  }
});

export default FiltersReducer.reducer;

export const actions = FiltersReducer.actions;
