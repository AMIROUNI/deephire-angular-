import { User } from './user.model';
import { Company } from '../company/company.model';

export interface RHCompany extends User {
  company?: Company;
}

export const sampleRHCompanies: RHCompany[] = [
  {
    id: 4,
    firstName: "Sara",
    lastName: "Ahmed",
    email: "sara.ahmed@example.com",
    profilePicture: "assets/images/sarah.jfif",
    bio: "HR Specialist at TechCorp",
    location: "Tunisia"
  },
  {
    id: 5,
    firstName: "Khalid",
    lastName: "Benali",
    email: "khalid.benali@example.com",
    profilePicture: "assets/khalid.jpg",
    bio: "Recruitment Manager",
    location: "Algeria"
  }
];