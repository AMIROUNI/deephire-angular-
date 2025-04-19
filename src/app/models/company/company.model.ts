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
    logo: "assets/images/innovatex.png",
    industry: "Technology",
    location: "Morocco",
    admin: sampleAdminCompanies[0],
    rhUsers: [sampleRHCompanies[0]]
  },
  {
    id: 2,
    name: "InnovateX",
    logo: "assets/innovatex.png",
    industry: "Software",
    location: "Egypt",
    rhUsers: [sampleRHCompanies[1]]
  }
];
