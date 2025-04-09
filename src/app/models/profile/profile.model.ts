// src/app/models/profile/profile.model.ts
import { User } from '../user/user.model';
import { Experience } from './experience.model';
import { Education } from './education.model';
import { Skill } from './skill.model';
import { Certification } from './certification.model';

export interface Profile {
  id: number;
  headline?: string;
  summary?: string;
  user?: User; // One-to-one
  experiences?: Experience[]; // One-to-many
  education?: Education[]; // One-to-many
  skills?: Skill[]; // One-to-many
  certifications?: Certification[]; // One-to-many
}