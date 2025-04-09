// src/app/models/message/message.model.ts
import { User } from '../user/user.model';

export interface Message {
  id: number;
  content: string;
  timestamp: Date;
  sender?: User; // Many-to-one
  receiver?: User; // Many-to-one
  isRead: boolean;
}