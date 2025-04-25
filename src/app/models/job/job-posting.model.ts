// src/app/models/job/job-posting.model.ts
import { Company } from '../company/company.model';
import { StatusOfCv } from './status-of-cv.model';

export interface JobPosting {
  id: number;
  title: string;
  description: string;
  requirements?: string;
  location?: string;
  datePosted: string;
  company?: Company; // Many-to-one
  statusOfCvs?: StatusOfCv[]; // One-to-many
}
