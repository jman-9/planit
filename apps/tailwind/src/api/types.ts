import { ListItem, ListItemStatus } from "../types";

export interface ListApiInterface {
  getList: () => Promise<ListItem[] | undefined>;
  addItem: (data: ListItem) => Promise<void>;
  getItem: (title: string) => Promise<ListItem | undefined>;
  updateItem: (title: string, data: ListItem) => Promise<void>;
  deleteItem: (title: string) => Promise<void>;
  getItemCount: (status?: ListItemStatus) => Promise<number>;
}
