// src/app/services/post.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/posts/post.model';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8095/post';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    }); // Content-Type is omitted as it will be set automatically for FormData
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/all`, { headers: this.getHeaders() });
  }

  addPostWithMedia(content: string, mediaFiles?: File[]): Observable<Post> {
    const formData = new FormData();
    formData.append('content', content);
    if (mediaFiles && mediaFiles.length > 0) {
      mediaFiles.forEach((file) => {
        formData.append('mediaFiles', file); 
      });
    }
    return this.http.post<Post>(`${this.apiUrl}/add`, formData, { headers: this.getHeaders() });
  }

  updatePostById(postId: number, content: string, newMediaFiles: File[], remainingMediaIds: number[]): Observable<any> {
    const formData = new FormData();
    formData.append('content', content);
    formData.append('remainingMediaIds', JSON.stringify(remainingMediaIds));

    for (let file of newMediaFiles) {
      formData.append('mediaFiles', file);
    }

    return this.http.put(`${this.apiUrl}/update/${postId}`, formData, { headers: this.getHeaders() });
  }
}

