import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import todoSlice from './todoSlice';
import bucketSlice from './bucketSlice';
import settingsSlice from './settingsSlice';

const settingsPersistConfig = {
  key: 'settings',
  storage,
};

const rootReducer = combineReducers({
  todos: todoSlice.reducer,
  buckets: bucketSlice.reducer,
  settings: persistReducer(settingsPersistConfig, settingsSlice.reducer),
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['todos', 'buckets'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
