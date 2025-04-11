import { User } from './user.model';
import { Company } from '../company/company.model';

export interface AdminCompany extends User {
  company?: Company;
}

export const sampleAdminCompanies: AdminCompany[] = [
  {
    id: 6,
    firstName: "Layla",
    lastName: "Zaid",
    email: "layla.zaid@example.com",
    profilePicture: "assets/layla.jpg",
    bio: "Company Administrator at InnovateX",
    location: "Qatar"
  }
];