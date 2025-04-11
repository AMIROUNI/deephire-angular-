import { sampleUsers, User } from '../user/user.model';
import { Comment, sampleComments } from './comment.model';
import { Media, sampleMedia } from './media.model';

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
  media?: Media[];
}

export const samplePosts: Post[] = [
  {
    id: "p1",
    author: sampleUsers[0], // Mourad
    content: "حرقته إسرائيل...الصحفي الذي شاهدتموه بحترق تحت نيران القصف الإسرائيلي.",
    translation: "He was burned by Israel... The journalist you saw engulfed in flames.",
    tags: ["gaza_under_attack", "freepalestine"],
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    edited: true,
    likes: 245,
    comments: [sampleComments[0]], // Includes replies
    shares: 12,
    media: [sampleMedia[0]] // Image
  },
  {
    id: "p2",
    author: sampleUsers[1], // Aisha
    content: "Excited to share my latest AI project!",
    tags: ["AI", "tech"],
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    edited: false,
    likes: 50,
    comments: [sampleComments[1]],
    shares: 5,
    media: [sampleMedia[1]] // Video
  }
];