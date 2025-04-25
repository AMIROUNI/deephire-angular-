import { User } from '../user/user.model';

export interface Comment {
  id: string;
  content: string;
  author: User;
  timestamp: Date;
  likes: number;
  replies?: Comment[];
  edited?: boolean;
}
