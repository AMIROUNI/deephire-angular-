import { User } from '../user/user.model';
import { Comment } from './comment.model';
import { Media } from './media.model'; // Import the new Media interface

export interface Post {
  id: string;
  author: User;
  content: string;
  translation?: string;
  tags: string[];
  timestamp: Date;
  edited?: boolean;
  likes: number;
  comments: Comment[];
  shares: number;
  media?: Media[]; // Now uses the Media interface
}