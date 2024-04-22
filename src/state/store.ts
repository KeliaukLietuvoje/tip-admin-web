import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import createSagaMiddleware from 'redux-saga';

import { tourism } from '../modules/tourism/state';
import { users } from '../modules/users/state';
import { BackUrlReducer } from './backUrl/reducer';
import { ModalReducer } from './modal/reducer';
import { ModuleReducer } from './Module/reducer';
import { UserReducer } from './user/reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['module', 'users', 'tourism'],
};

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  user: UserReducer.reducer,
  backUrl: BackUrlReducer.reducer,
  module: ModuleReducer.reducer,
  modal: ModalReducer.reducer,
  tourism,
  users,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
});

const persistor = persistStore(store);

export default { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
