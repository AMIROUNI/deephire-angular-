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

  toggleTranslation(): void {
    this.showTranslation = !this.showTranslation;
  }

  toggleFullPost(): void {
    this.showFullPost = !this.showFullPost;
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
}