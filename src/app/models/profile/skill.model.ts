import { Profile } from './profile.model';

export interface Skill {
  id: number;
  name: string;
  profile?: Profile;
}

export const sampleSkills: Skill[] = [
  { id: 1, name: "Robotics" },
  { id: 2, name: "Python" },
  { id: 3, name: "AWS" }
];