// src/app/models/profile/experience.model.ts
import { Profile, sampleProfiles } from './profile.model';

export interface Experience {
  id?: number;
  companyName: string;
  title: string;
  startDate: Date; // Could also use Date type if you'll parse it
  endDate?: Date; // Optional
  description?: string;
  profile?: Profile; // Many-to-one
}
