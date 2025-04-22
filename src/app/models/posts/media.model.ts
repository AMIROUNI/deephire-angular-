import { Post } from "./post.model";

export interface Media {
  id: number;
  files: string; // Base64 string or URL, depending on how you handle it
  post?: Post;
}
