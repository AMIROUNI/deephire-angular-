import { sampleUsers, User } from '../user/user.model';

export interface Comment {
  id: string;
  content: string;
  author: User;
  timestamp: Date;
  likes: number;
  replies?: Comment[];
  edited?: boolean;
}

export const sampleComments: Comment[] = [
  {
    id: "c1",
    content: "This is heartbreaking.",
    author: sampleUsers[0], // Mourad
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    likes: 10,
    edited: false,
    replies: [
      {
        id: "r1",
        content: "Absolutely, we need action now.",
        author: sampleUsers[1], // Aisha
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        likes: 5,
        edited: false
      }
    ]
  },
  {
    id: "c2",
    content: "Thanks for sharing this.",
    author: sampleUsers[2], // John
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    likes: 3,
    edited: false
  }
];