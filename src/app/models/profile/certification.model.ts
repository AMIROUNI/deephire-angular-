import { Profile } from './profile.model';

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  issueDate: Date;
  expirationDate?: Date;
  profile?: Profile;
}

export const sampleCertifications: Certification[] = [
  {
    id: 1,
    name: "Certified Robotics Engineer",
    issuer: "Robotics Institute",
    issueDate: new Date("2020-05-15"),
    expirationDate: new Date("2025-05-15")
  },
  {
    id: 2,
    name: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    issueDate: new Date("2021-03-10")
  }
];