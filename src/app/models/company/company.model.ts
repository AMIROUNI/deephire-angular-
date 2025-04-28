import { AdminCompany, sampleAdminCompanies } from '../user/admin-company.model';
import { RHCompany } from '../user/rh-company.model';
import { JobPosting } from '../job/job-posting.model';



export interface Company {
  id?: number;
  name: string;
  industry?: string;
  location?: string;
  description?: string;
  logo?: string | File; // Can be URL string or File object
  backgroundImage?: string | File;
}