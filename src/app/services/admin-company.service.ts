import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminCompany } from '../models/user/admin-company.model';


@Injectable({
  providedIn: 'root'
})
export class AdminCompanyService {
  private apiUrl = "http://localhost:8095/admin-company";

  constructor(private http: HttpClient) {}

  getAll(): Observable<AdminCompany[]> {
    return this.http.get<AdminCompany[]>(`${this.apiUrl}/all`);
  }

  create(recruiter: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, recruiter);
  }

  update(id: number, recruiter: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, recruiter);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  getById(id: number): Observable<AdminCompany> {
    return this.http.get<AdminCompany>(`${this.apiUrl}/findById/${id}`);
  }
}