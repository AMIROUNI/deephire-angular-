import { AdminCompany, sampleAdminCompanies } from '../user/admin-company.model';
import { RHCompany, sampleRHCompanies } from '../user/rh-company.model';
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

export const sampleCompanies: Company[] = [
  {
    id: 1,
    name: "TechCorp",
    industry: "Technology",
    location: "Morocco",
    admin: sampleAdminCompanies[0], // Layla
    rhUsers: [sampleRHCompanies[0]] // Sara
  },
  {
    id: 2,
    name: "InnovateX",
    industry: "Software",
    location: "Egypt",
    rhUsers: [sampleRHCompanies[1]] // Khalid
  }
];

