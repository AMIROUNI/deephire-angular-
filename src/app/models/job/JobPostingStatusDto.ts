export interface JobPostingStatusDto {
  jobPostingId: number;
  jobTitle: string;
  jobLocation: string;
  datePosted: Date;
  companyName: string;
  companyIndustry: string;
  status: string; // should be one of: 'PENDING', 'APPROVED', 'REJECTED', etc.
}
