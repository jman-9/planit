import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListItem } from '../types/ListItem';

const bucketSlice = createSlice({
  name: 'buckets',
  initialState: { list: [] as ListItem[] },
  reducers: {
    addItem: (state, action: PayloadAction<ListItem>) => {
      const index = state.list.findIndex(item => item.title === action.payload.title);
      if (index < 0) {
        state.list.push(action.payload);
      }
    },
    updateItem: (state, action: PayloadAction<{ title: string, data: ListItem }>) => {
      const index = state.list.findIndex(item => item.title === action.payload.title);
      if (index !== -1) {
        state.list[index] = action.payload.data;
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(item => item.title !== action.payload);
    },
  }
});

export const { addItem, updateItem, deleteItem } = bucketSlice.actions;
export default bucketSlice.reducer;
