export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  taskListId: number;
}

export interface TaskList {
  id: number;
  title: string;
  tasks: Task[];
  collaborators: { userId: number; role: 'admin' | 'viewer' }[];
}