import { Profile } from './profile.model';

export interface Education {
  id?: number; 
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string; 
  endDate: string;   
  profile?: Profile;
}