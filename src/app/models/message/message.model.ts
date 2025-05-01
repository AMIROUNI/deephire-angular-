import { User } from '../user/user.model';

export interface Message {
  id?: number;
  content?: string;
  timestamp?: Date;
  sender?: User;
  receiver?: User;
  isRead?: boolean;
  senderUsername?: string;
}
