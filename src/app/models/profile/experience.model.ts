// src/app/models/profile/experience.model.ts
import { Profile} from './profile.model';

export interface Experience {
  id?: number;
  companyName: string;
  title: string;
  startDate: string; 
  endDate?: string; 
  description?: string;
  profile?: Profile; 
}
