import { ListItem, ListItemStatus } from "../types";

export interface ListApiInterface {
  getList: () => ListItem[] | undefined;
  addItem: (data: ListItem) => void;
  getItem: (title: string) => ListItem | undefined;
  updateItem: (title: string, data: ListItem) => void;
  deleteItem: (title: string) => void;
  getItemCount: (status?: ListItemStatus) => number;
}
