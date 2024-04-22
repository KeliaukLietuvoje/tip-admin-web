import { createSlice } from "@reduxjs/toolkit";

interface BackUrl {
  storeUrl?: any;
}
const initialState: BackUrl = {
  storeUrl: []
};

export const BackUrlReducer = createSlice({
  name: "backUrl",
  initialState,
  reducers: {
    setBackUrl: (state, action) => {
      state.storeUrl.push(action.payload);
    },

    updateBackUrl: (state) => {
      state.storeUrl.pop();
    },

    clearBackUrl: (state) => {
      state.storeUrl = [];
    }
  }
});

export default BackUrlReducer.reducer;

export const actions = BackUrlReducer.actions;
