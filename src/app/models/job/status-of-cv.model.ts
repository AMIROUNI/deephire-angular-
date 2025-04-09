// src/app/models/job/status-of-cv.model.ts
import { User } from '../user/user.model';
import { JobPosting } from './job-posting.model';

export interface StatusOfCv {
  id: number;
  state: string;
  user?: User; // Many-to-one
  jobPosting?: JobPosting; // Many-to-one
}