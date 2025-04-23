// post-create.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { Post } from '../../models/posts/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
  standalone: false
})
export class PostCreateComponent {
  @Output() postCreated = new EventEmitter();
  postContent = '';
  selectedFiles: File[] = [];

  Created: boolean = false;

  selectedMedia: File | undefined ;
  showOptions: boolean = false;
  previewUrl: string | ArrayBuffer | null = null;
  userImg: string = '';

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}


  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (res) => {
        this.userImg = res.profilePicture || 'default-profile.png'; // Fallback to a default image if none is provided
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
      }
    });
  }

  onMediaSelected(event: any): void {
    this.selectedMedia = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    if (this.selectedMedia) {
      reader.readAsDataURL(this.selectedMedia);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = [...this.selectedFiles, ...Array.from(input.files)];
      input.value = ''; // Reset input to allow re-uploading the same file
    }
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
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


  onContentChange() {
    // Force change detection if needed
  }
  toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }


  createPost() {
    if (!this.postContent && this.selectedFiles.length === 0) return;

    this.postService.addPostWithMedia(this.postContent, this.selectedFiles).subscribe({
      next: (post) => {
        this.Created=true;
        this.postCreated.emit(this.Created);
        this.postContent = '';
        this.selectedFiles = [];
      },
      error: (err) => {
        console.error('Error creating post:', err);
        this.postCreated.emit(this.Created);
      }
    });
  }



}
