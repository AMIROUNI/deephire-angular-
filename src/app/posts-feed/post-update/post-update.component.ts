import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/posts/post.model';

@Component({
  selector: 'app-post-update',
  standalone: false,
  templateUrl: './post-update.component.html',
  styleUrl: './post-update.component.css'
})
export class PostUpdateComponent implements OnInit {
  @Input() post!: Post;
  @Output() postUpdated = new EventEmitter<boolean>();

  updatedContent = '';
  selectedFiles: File[] = [];
  existingMedia: any[] = []; // Assume media comes as base64 or URLs
  userImg: string = '';

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.updatedContent = this.post.content;
    this.existingMedia = this.post.media || [];
    if (this.post.user?.profilePicture) {
      this.userImg = this.post.user.profilePicture;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = [...this.selectedFiles, ...Array.from(input.files)];
      input.value = '';
    }
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  removeExistingMedia(index: number) {
    this.existingMedia.splice(index, 1); // Optional: Send IDs to delete if needed
  }

  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  isVideo(file: File): boolean {
    return file.type.startsWith('video/');
  }

  getPreviewUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  updatePost() {
    if (!this.updatedContent && this.selectedFiles.length === 0 && this.existingMedia.length === 0) return;

    const remainingMediaIds = this.existingMedia.map(m => m.id); // Extract IDs of kept media

    this.postService.updatePostById(this.post.id, this.updatedContent, this.selectedFiles, remainingMediaIds)
      .subscribe({
        next: () => {
          this.postUpdated.emit(true);
        },
        error: (err) => {
          console.error('Error updating post:', err);
          this.postUpdated.emit(false);
        }
      });
  }

}