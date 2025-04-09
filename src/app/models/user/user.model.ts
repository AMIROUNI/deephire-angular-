// src/app/models/user/user.model.ts
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string; // Optional as we might not always want to expose this
    profilePicture?: string;
    bio?: string;
    location?: string;
    profile?: Profile;
    sentMessages?: Message[];
    receivedMessages?: Message[];
  }