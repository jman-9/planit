export interface ListItem {
  title: string;
  status: 'todo' | 'pending' | 'in-progress' | 'completed';
  updatedAt: string;   
  createdAt: string; 
  startedAt?: string;
  completedAt?: string;
  // metadata?: {
  //   priority?: 'low' | 'medium' | 'high';
  //   tags?: string[];
  // };
}
