import { Slice } from '@reduxjs/toolkit';
import { ListItem } from '../types';

export type ListSlice = Slice<
  { list: ListItem[] },
  {
    addItem: (state: { list: ListItem[] }, action: { payload: ListItem; type: string }) => void,
    updateItem: (state: { list: ListItem[] }, action: { payload: { title: string, data: ListItem }; type: string }) => void,
    deleteItem: (state: { list: ListItem[] }, action: { payload: string; type: string }) => void
  }
>;
