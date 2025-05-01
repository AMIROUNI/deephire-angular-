import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { UserSearchDTO } from '../models/user/user-search-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:8095/user'; // Adjust the base URL as needed

  constructor(private httpClient:HttpClient,private authService:AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // profile.service.ts
getCurrentUser(): Observable<User> {
  return this.httpClient.get<User>(`${this.apiUrl}/me`, { headers: this.getHeaders() });
}

getUserByUsername(username: string): Observable<User> {
  return this.httpClient.get<User>(`${this.apiUrl}/${username}`, { headers: this.getHeaders() });
}

searchUsers(query: string): Observable<UserSearchDTO[]> {
  return this.httpClient.get<UserSearchDTO[]>(`${this.apiUrl}/search?q=${query}`,{ headers: this.getHeaders() });
}



}
