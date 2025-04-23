export interface ListItem {
  title: string;
  updatedAt: Date;
  createdAt: Date;
  status?: 'todo' | 'pending' | 'in-progress' | 'completed';
  startedAt?: string;
  completedAt?: string;
  // metadata?: {
  //   priority?: 'low' | 'medium' | 'high';
  //   tags?: string[];
  // };
  desc?: string;
}
