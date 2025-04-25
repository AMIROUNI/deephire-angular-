import { User } from '../user/user.model';
import { Experience} from './experience.model';
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

