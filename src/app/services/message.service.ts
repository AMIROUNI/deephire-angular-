import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, User } from '../models';



@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:8095/api/messages'; // Adjust if needed

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getContacts(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/contacts`, {
      headers: this.getHeaders()
    });
  }

  getConversation(contactUsername: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/conversation/${contactUsername}`, {
      headers: this.getHeaders()
    });
  }
}
