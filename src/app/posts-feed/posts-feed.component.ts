import { Component, OnInit } from '@angular/core';
import { User } from '../models/user/user.model';
import { AuthService } from '../services/auth/auth.service';
import { ProfileService } from '../services/profile/profile.service';
import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';
import { Post } from '../models/posts/post.model';


@Component({
  selector: 'app-posts-feed',
  templateUrl: './posts-feed.component.html',
  styleUrls: ['./posts-feed.component.css'],
  standalone:false
})
export class PostsFeedComponent implements OnInit {
  posts: Post[] = [];
  sortBy: string = 'top';
  showProfileCompletion :boolean | undefined= false;
  currentUser: User | null = null;

  showAlert: boolean = false;
  alertTimeout: any;

  constructor(
    private profileService: ProfileService,
  private authService: AuthService,
  private userService: UserService,
  private postService: PostService
  ) {}

  ngOnInit(): void {
    this.fetchPosts();
  this.checkProfileCompletion();
  }

  checkProfileCompletion(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.showProfileCompletion = user.firstLogin;
      },
      error: (err) => {
        console.error('Error fetching user data', err);
      }
    });
  }

  fetchPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.changeSort(this.sortBy); // Apply default sorting
      },
      error: (err) => {
        console.error('Error fetching posts', err);
      }
    });
  }

  onProfileCompleted(): void {
    this.showProfileCompletion = false;
    this.checkProfileCompletion();
  }



  onPostCreated(show: boolean): void {
    if (show) {this.showSuccessAlert();}
      else {alert("Post not created");}

    this.changeSort(this.sortBy);

  }

  changeSort(sortType: string): void {
    this.sortBy = sortType;
    if (sortType === 'top') {
      this.posts.sort((a, b) => b.likes - a.likes);
    } else if (sortType === 'newest') {
      this.posts.sort((a, b) => b.timestamp ? new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime() : 0);
    } else if (sortType === 'oldest') {
      this.posts.sort((a, b) => a.timestamp ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime() : 0);
    }
  }


  showSuccessAlert() {
    this.showAlert = true;
    // Auto-dismiss after 3 seconds
    this.alertTimeout = setTimeout(() => {
      this.dismissAlert();
    }, 3000);
  }

  dismissAlert() {
    this.showAlert = false;
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }
  }

  ngOnDestroy() {
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }
  }
}
