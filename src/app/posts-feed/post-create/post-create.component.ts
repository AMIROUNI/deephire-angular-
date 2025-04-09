// post-create.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
  standalone: false
})
export class PostCreateComponent {
  @Output() postCreated = new EventEmitter<any>();
  postContent: string = '';
  selectedMedia: File | null = null;
  showOptions: boolean = false;

  onMediaSelected(event: any): void {
    this.selectedMedia = event.target.files[0];
    // You would typically handle file upload here
  }

  createPost(): void {
    if (this.postContent.trim() || this.selectedMedia) {
      const newPost = {
        content: this.postContent,
        media: this.selectedMedia,
        timestamp: new Date()
      };
      this.postCreated.emit(newPost);
      this.postContent = '';
      this.selectedMedia = null;
    }
  }

  toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }
}