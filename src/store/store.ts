import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import bucketReducer from './bucketSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    buckets: bucketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
