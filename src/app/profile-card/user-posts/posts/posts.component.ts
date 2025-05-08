import { Component } from '@angular/core';
import { Post } from '../../../models/posts/post.model';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-posts',
  standalone: false,
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  posts: Post[] = [];
  userNameFromUrl:string='';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.fetchPosts();
    this.route.params.subscribe(params => {
      this.userNameFromUrl = params['username'];
      console.log('username',this.userNameFromUrl);
    });
  }
  fetchPosts(): void {
    
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        // Filter posts by username
        this.posts = posts.filter(post => post.user?.username==this.userNameFromUrl);
        console.log('User posts:', this.posts);

      },
      error: (err) => {
        console.error('Error fetching posts', err);
      }
    });
  
  
  }
}
