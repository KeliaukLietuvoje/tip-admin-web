import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

export const ModuleReducer = createSlice({
  name: "module",
  initialState,
  reducers: {
    setModule: (_, action) => {
      return action.payload;
    }
  }
});

export default ModuleReducer.reducer;

export const actions = ModuleReducer.actions;
