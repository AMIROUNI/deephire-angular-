import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message, User } from '../models';
import { AuthService } from './auth/auth.service';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private apiUrl = 'http://localhost:8095';

  constructor(private http: HttpClient,private AuthService:AuthService) {}

  getContacts(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/contacts`);
  }

  getConversationWith(userId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/conversation/${userId}`);
  }

  sendMessage(content: string, receiverId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/send`, {
      content,
      receiverId,
    });
  }
}
