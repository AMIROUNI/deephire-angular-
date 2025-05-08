import { Component, Input } from '@angular/core';
import { Post } from '../../models/posts/post.model';
import { Comment } from '../../models/posts/comment.model'; // Ensure Comment model exists
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css'],
  standalone: false,
})
export class PostDisplayComponent {
  @Input() post!: Post;
  showTranslation: boolean = false;
  showFullPost: boolean = false;
  showComments: boolean = false;
  newCommentContent: string = '';
  currentMediaIndex: number = 0;
  currentUser: User | null = null;


  showOptions: boolean = false;



  isEditing: boolean = false;

  constructor(private userService: UserService) {
    // Fetch current user (for commenting and liking)
    this.userService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

  // Media handling
 /* isImage(media: any): boolean {
    // Assuming media has a type or URL indicating its type
    return media.type?.startsWith('image/') || media.files?.match(/\.(jpeg|jpg|png|gif)$/i);
  }

  isVideo(media: any): boolean {
    return media.type?.startsWith('video/') || media.files?.match(/\.(mp4|webm|ogg)$/i);
  }

  getMediaUrl(media: any): string {
    // Convert byte array to base64 for display
    if (media.files) {
      return `data:${media.type || 'image/jpeg'};base64,${this.arrayBufferToBase64(media.files)}`;
    }
    return 'assets/placeholder.jpg';
  }*/


    static parseBase64DataUrl(dataUrl: string): { base64: string; mimeType: string } {
      const [meta, base64] = dataUrl.split(',');
      const mimeType = meta.match(/:(.*?);/)?.[1] || 'application/octet-stream';
      return { base64, mimeType };
    }

    // Convert byte array to base64 data URL
    getMediaUrl(media: any): string {
      if (media.files) {
        try {
          // Convert byte array to base64
          const binary = String.fromCharCode(...new Uint8Array(media.files));
          const base64 = btoa(binary);
          // Assume a default MIME type if not provided; ideally, backend should send type
          const mimeType = media.type || 'image/jpeg'; // Fallback, adjust based on backend
          return `data:${mimeType};base64,${base64}`;
        } catch (error) {
          console.error('Error converting media to base64:', error);
          return 'assets/placeholder.jpg';
        }
      }
      return 'assets/placeholder.jpg';
    }

    // Parse media to get MIME type and determine type
    getMediaInfo(media: any): { base64: string; mimeType: string } {
      const dataUrl = this.getMediaUrl(media);
      console.log('Data URL:', dataUrl); // Debugging line
      return PostDisplayComponent.parseBase64DataUrl(dataUrl);
    }

    isImage(media: any): boolean {
      const { mimeType } = this.getMediaInfo(media);
      console.log('MIME Type:', mimeType); // Debugging line
      return mimeType.startsWith('image/');
    }

    isVideo(media: any): boolean {
      const { mimeType } = this.getMediaInfo(media);
      return mimeType.startsWith('video/');
    }

  arrayBufferToBase64(buffer: any): string {
    // Convert binary data to base64
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  prevMedia() {
    this.currentMediaIndex =
      (this.currentMediaIndex - 1 + this.post.media.length) % this.post.media.length;
  }

  nextMedia() {
    this.currentMediaIndex = (this.currentMediaIndex + 1) % this.post.media.length;
  }

  setMediaIndex(index: number) {
    this.currentMediaIndex = index;
  }

  // Post actions
  toggleTranslation(): void {
    this.showTranslation = !this.showTranslation;
    // Implement translation logic if needed
  }

  toggleFullPost(): void {
    this.showFullPost = !this.showFullPost;
  }

  toggleComments(): void {
    this.showComments = !this.showComments;
  }

//  toggleLike(): void {
    // Toggle like state (implement backend call if needed)
 //   this.post.isLiked = !this.post.isLiked;
 //   this.post.likes += this.post.isLiked ? 1 : -1;
//  }

  addComment(): void {
    if (!this.newCommentContent.trim() || !this.currentUser) return;

    const newComment: Comment = {
      id: Math.random().toString(36).substring(2), // Temporary ID, replace with backend ID
      content: this.newCommentContent,
      author: this.currentUser,
      timestamp: new Date(),
      likes: 0,
    };

    this.post.comments = this.post.comments || [];
    this.post.comments.push(newComment);
    this.newCommentContent = '';

    // Call backend to save comment (implement service method)
    // this.postService.addComment(this.post.id, newComment).subscribe();
  }

  followUser(): void {
    // Implement follow functionality
    console.log('Follow user:', this.post.user);
  }

  showMoreOptions(event: Event) {
    event.stopPropagation(); // Prevent event bubbling
    this.showOptions = !this.showOptions;
    console.log('Dropdown state:', this.showOptions); // Verify in console
  }

  sharePost(): void {
    // Implement share functionality
    console.log('Share post');
  }

  sendPost(): void {
    // Implement send functionality (e.g., DM)
    console.log('Send post');
  }

  formatTimeAgo(date: Date | string): string {
    const timestamp = typeof date === 'string' ? new Date(date) : date;
    const seconds = Math.floor((new Date().getTime() - timestamp.getTime()) / 1000);
    if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }


  toggleEditPost(): void {
    this.isEditing = !this.isEditing;
  }

  handlePostUpdated(success: boolean): void {
    this.isEditing = false;
    if (success) {
      // Optionally refresh the post from backend if needed
      console.log('Post updated successfully');
    } else {
      console.error('Failed to update post');
    }
  }
}
