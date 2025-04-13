// src/app/models/job/status-of-cv.model.ts
import { sampleUsers, User } from '../user/user.model';
import { JobPosting, sampleJobPostings } from './job-posting.model';

export interface StatusOfCv {
  id: number;
  state: string;
  user?: User; // Many-to-one
  jobPosting?: JobPosting; // Many-to-one
}

export const sampleStatusOfCvs: StatusOfCv[] = [
  {
    id: 1,
    state: "Submitted",
    user: sampleUsers[0], // Mourad Elhanine
    jobPosting: sampleJobPostings[0] // Robotics Engineer at TechCorp
  },
  {
    id: 2,
    state: "Under Review",
    user: sampleUsers[1], // Aisha Hassan
    jobPosting: sampleJobPostings[1] // Software Developer at InnovateX
  },
  {
    id: 3,
    state: "Accepted",
    user: sampleUsers[2], // John Doe
    jobPosting: sampleJobPostings[2] // HR Coordinator at TechCorp
  },
  {
    id: 4,
    state: "Rejected",
    user: sampleUsers[1], // Aisha Hassan
    jobPosting: sampleJobPostings[0] // Robotics Engineer at TechCorp
  }
];