export interface ListItem {
  title: string;
  updatedAt: Date;
  createdAt: Date;
  startedAt?: string;
  completedAt?: string;
  // metadata?: {
  //   priority?: 'low' | 'medium' | 'high';
  //   tags?: string[];
  // };
  desc?: string;
}

export type ListItemStatus = 'To Do' | 'In Progress' | 'Done';

export function getStatus(item: ListItem): ListItemStatus {
  if (item.completedAt) {
    return 'Done';
  }
  if (item.startedAt) {
    return 'In Progress';
  }
  return 'To Do';
}
