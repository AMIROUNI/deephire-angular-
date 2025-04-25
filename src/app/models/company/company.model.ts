import { AdminCompany, sampleAdminCompanies } from '../user/admin-company.model';
import { RHCompany } from '../user/rh-company.model';
import { JobPosting } from '../job/job-posting.model';

export interface Company {
  id: number;
  name: string;
  logo?: string; // URL to the logo image
  industry?: string;
  location?: string;

  admin?: AdminCompany;
  rhUsers?: RHCompany[];
  jobPostings?: JobPosting[];
}