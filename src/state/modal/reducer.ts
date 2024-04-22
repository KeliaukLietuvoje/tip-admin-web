import { createSlice } from "@reduxjs/toolkit";

interface Modal {
  isOpen: boolean;
}
const initialState: Modal = {
  isOpen: false
};

export const ModalReducer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.isOpen = action.payload;
    }
  }
});

export default ModalReducer.reducer;

export const actions = ModalReducer.actions;
