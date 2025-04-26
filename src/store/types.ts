import { Slice } from '@reduxjs/toolkit';
import { ListItem } from '../types';

export type ListSlice = Slice<
  { list: ListItem[] },
  {
    addItem: (state: any, action: any) => void,
    updateItem: (state: any, action: any) => void,
    deleteItem: (state: any, action: any) => void
  }
>;
