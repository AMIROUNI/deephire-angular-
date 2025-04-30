import { Profile } from './profile.model';

export interface Certification {
  id?: number;
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  profile?: Profile;
}

