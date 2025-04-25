import { User } from './user.model';
import { Company } from '../company/company.model';

export interface RHCompany extends User {
  company?: Company;
}
