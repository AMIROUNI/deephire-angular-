// src/app/models/profile/experience.model.ts
import { Profile } from './profile.model';

export interface Experience {
  id: number;
  companyName: string;
  title: string;
  startDate: string; // Could also use Date type if you'll parse it
  endDate?: string; // Optional
  description?: string;
  profile?: Profile; // Many-to-one
}