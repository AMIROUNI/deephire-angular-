// src/app/models/profile/skill.model.ts
import { Profile } from './profile.model';

export interface Skill {
  id: number;
  name: string;
  profile?: Profile; // Many-to-one
}