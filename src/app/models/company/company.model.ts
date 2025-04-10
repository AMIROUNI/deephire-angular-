// src/app/models/company/company.model.ts
import { AdminCompany } from '../user/admin-company.model';
import { RHCompany } from '../user/rh-company.model';
import { JobPosting } from '../job/job-posting.model';

export interface Company {
  id: number;
  name: string;
  logo?: string; // URL to the logo image
  industry?: string;
  location?: string;
  admin?: AdminCompany; // One-to-one
  rhUsers?: RHCompany[]; // One-to-many
  jobPostings?: JobPosting[]; // One-to-many
}
