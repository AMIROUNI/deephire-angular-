// src/app/models/user/admin-company.model.ts
import { User } from './user.model';
import { Company } from '../company/company.model';

export interface AdminCompany extends User {
  company?: Company; // One-to-one relationship
}