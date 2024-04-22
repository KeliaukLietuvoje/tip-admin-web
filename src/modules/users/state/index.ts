import { combineReducers } from "redux";
import { ColumnsReducer } from "./columns/reducer";
import { FiltersReducer } from "./filters/reducer";
export const users = combineReducers({
  columns: ColumnsReducer.reducer,
  filters: FiltersReducer.reducer
});
