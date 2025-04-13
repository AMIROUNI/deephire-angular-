import { Component, Input } from '@angular/core';
import { Post } from '../../models/posts/post.model'; // Adjusted path assuming models are in src/app/models/

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css'],
  standalone: false
})
export class PostDisplayComponent {
  @Input() post!: Post;
  showTranslation: boolean = false;
  showFullPost: boolean = false;
  showComments: boolean = false; // Toggle comments visibility
  newCommentContent: string = '';

  toggleTranslation(): void {
    this.showTranslation = !this.showTranslation;
  }

  toggleFullPost(): void {
    this.showFullPost = !this.showFullPost;
  }


  toggleComments(): void {
    this.showComments = !this.showComments;
  }

  formatTimeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  }

/*

  addComment(): void {
    if (!this.newCommentContent.trim()) return; // Prevent empty comments

    const newComment: Comment = {
      id: Math.random().toString(36).substring(2),
      content: this.newCommentContent,
      author: this.currentUser,
      timestamp: new Date(),
      likes: 0,
      edited: false
    };

    this.post.comments.push(newComment); // Add the new comment to the post
    this.newCommentContent = ''; // Clear the input
  }*/
}