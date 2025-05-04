import { User } from '../user/user.model';
import { Comment } from './comment.model';
import { Media } from './media.model';

export interface Post {
  id: number ;
  content: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
  media: Media[];
  user: User;
}
