import { Message } from "../message/message.model";
import { Profile } from "../profile/profile.model";

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  username?:string;
  email?: string;
  password?: string;
  profilePicture?: string;
  backGroundImage?: string;
  bio?: string;
  location?: string;
  profile?: Profile;
  firstLogin?: boolean;

  sentMessages?: Message[];
  receivedMessages?: Message[];
}
