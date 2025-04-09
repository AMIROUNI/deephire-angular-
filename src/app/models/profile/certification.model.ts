// src/app/models/profile/certification.model.ts
import { Profile } from './profile.model';

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  issueDate: Date;
  expirationDate?: Date;
  profile?: Profile; // Many-to-one
}