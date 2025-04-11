// src/app/models/profile/experience.model.ts
import { Profile, sampleProfiles } from './profile.model';

export interface Experience {
  id: number;
  companyName: string;
  title: string;
  startDate: string; // Could also use Date type if you'll parse it
  endDate?: string; // Optional
  description?: string;
  profile?: Profile; // Many-to-one
}

export const sampleExperiences: Experience[] = [
  {
    id: 1,
    companyName: "TechCorp",
    title: "Robotics Technician",
    startDate: "2019-07-01",
    endDate: "2023-12-31",
    description: "Developed automation systems for manufacturing.",
    profile: sampleProfiles[0] // Mourad's profile
  },
  {
    id: 2,
    companyName: "InnovateX",
    title: "Software Engineer",
    startDate: "2021-07-01",
    description: "Building AI-driven applications.",
    profile: sampleProfiles[1] // Aisha's profile
  },
  {
    id: 3,
    companyName: "GlobalTech",
    title: "Junior Developer",
    startDate: "2018-06-01",
    endDate: "2021-06-30",
    description: "Worked on web development projects.",
    profile: sampleProfiles[1] // Aisha's profile
  }
];