// src/app/models/job/job-posting.model.ts
import { Company, sampleCompanies } from '../company/company.model';
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

export const sampleJobPostings: JobPosting[] = [
  {
    id: 1,
    title: "Robotics Engineer",
    description: "Design and develop robotic systems for industrial automation.",
    requirements: "B.Sc. in Engineering, 3+ years experience in robotics.",
    location: "Morocco",
    datePosted: "2025-03-15",
    company: sampleCompanies[0] // TechCorp
  },
  {
    id: 2,
    title: "Software Developer",
    description: "Build AI-driven applications using Python and AWS.",
    requirements: "M.Sc. in Computer Science, experience with cloud platforms.",
    location: "Egypt",
    datePosted: "2025-04-01",
    company: sampleCompanies[1] // InnovateX
  },
  {
    id: 3,
    title: "HR Coordinator",
    description: "Manage recruitment and employee relations.",
    requirements: "Experience in HR, strong communication skills.",
    location: "Tunisia",
    datePosted: "2025-04-05",
    company: sampleCompanies[0] // TechCorp
  }
];