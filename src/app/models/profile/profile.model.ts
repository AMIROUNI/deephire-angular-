import { sampleUsers, User } from '../user/user.model';
import { Experience, sampleExperiences } from './experience.model';
import { Education, sampleEducations } from './education.model';
import { Skill } from './skill.model';
import { Certification, sampleCertifications } from './certification.model';

export interface Profile {
  id: number;
  headline?: string;
  summary?: string;
  user?: User;
  experiences?: Experience[];
  education?: Education[];
  skills?: Skill[];
  certifications?: Certification[];
}

export const sampleProfiles: Profile[] = [
  {
    id: 1,
    headline: "Automation Expert",
    summary: "Experienced in robotics and automation systems.",
    user: sampleUsers[0], // Mourad Elhanine
    experiences: [sampleExperiences[0]],
    education: [sampleEducations[0]],
    certifications: [sampleCertifications[0]]
  },
  {
    id: 2,
    headline: "AI Developer",
    summary: "Passionate about artificial intelligence and cloud computing.",
    user: sampleUsers[1], // Aisha Hassan
    experiences: [sampleExperiences[1]],
    education: [sampleEducations[1]],
    certifications: [sampleCertifications[1]]
  }
];