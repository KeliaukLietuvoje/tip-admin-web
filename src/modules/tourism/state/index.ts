import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { ColumnReducer } from './columns/reducer';
import { DataReducer } from './data/reducer';
import { FiltersReducer } from './filters/reducer';

const tourismConfig = {
  key: 'tourismConfig',
  storage,
  whitelist: ['filters'],
};
export const tourism = persistReducer(
  tourismConfig,
  combineReducers({
    data: DataReducer.reducer,
    filters: FiltersReducer.reducer,
    columns: ColumnReducer.reducer,
  }),
);
