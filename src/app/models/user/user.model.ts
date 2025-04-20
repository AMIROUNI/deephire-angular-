import { Message } from "../message/message.model";
import { Profile } from "../profile/profile.model";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  profilePicture?: string;
  backgroundImage?: string;
  bio?: string;
  location?: string;
  profile?: Profile;

  sentMessages?: Message[];
  receivedMessages?: Message[];
}

export const sampleUsers: User[] = [
  {
    id: 1,
    firstName: "Mourad",
    lastName: "Elhanine",
    email: "mourad@example.com",
    profilePicture: "assets/mourad.jpg",
    bio: "Automation & Robotics technician #FreePalestine",
    location: "Morocco"
  },
  {
    id: 2,
    firstName: "Aisha",
    lastName: "Hassan",
    email: "aisha@example.com",
    profilePicture: "assets/aisha.jpg",
    bio: "Software Engineer passionate about AI",
    location: "Egypt"
  },
  {
    id: 3,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    profilePicture: "assets/john.jpg",
    bio: "Entrepreneur and tech enthusiast",
    location: "USA"
  }
];