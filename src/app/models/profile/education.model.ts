import { Profile } from './profile.model';

export interface Education {
  id: number;
  schoolName: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  profile?: Profile;
}

export const sampleEducations: Education[] = [
  {
    id: 1,
    schoolName: "University of Morocco",
    degree: "B.Sc.",
    fieldOfStudy: "Mechanical Engineering",
    startDate: "2015-09-01",
    endDate: "2019-06-30"
  },
  {
    id: 2,
    schoolName: "Cairo University",
    degree: "M.Sc.",
    fieldOfStudy: "Computer Science",
    startDate: "2019-09-01",
    endDate: "2021-06-30"
  }
];