import { sampleUsers, User } from '../user/user.model';

export interface Message {
  id: number;
  content: string;
  timestamp: Date;
  sender?: User;
  receiver?: User;
  isRead: boolean;
}

export const sampleMessages: Message[] = [
  {
    id: 1,
    content: "Hey, how’s your project going?",
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    sender: sampleUsers[0], // Mourad
    receiver: sampleUsers[1], // Aisha
    isRead: true
  },
  {
    id: 2,
    content: "Can we discuss the job posting?",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    sender: sampleUsers[2], // John
    receiver: sampleUsers[4], // Khalid (RH)
    isRead: false
  }
];