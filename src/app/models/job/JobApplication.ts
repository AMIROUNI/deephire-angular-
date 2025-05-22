export interface JobApplication {
  id: number;
  title: string;
  company: string;
  location: string;
  datePosted: Date;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  user: {
    id?:number
    username: string;
    email: string;
  };
}
