import { Component } from '@angular/core';

@Component({
  selector: 'app-post-management',
  standalone: false,
  templateUrl: './post-management.component.html',
  styleUrls: ['./post-management.component.css']
})
export class PostManagementComponent {
  searchText = '';
  posts = [
    { id: 1, author: 'John Doe', content: 'Lorem ipsum dolor sit amet...', date: '2025-04-14', active: true, reported: false },
    { id: 2, author: 'Jane Smith', content: 'Consectetur adipiscing elit...', date: '2025-04-13', active: false, reported: true },
    { id: 3, author: 'Alice Johnson', content: 'Sed do eiusmod tempor incididunt...', date: '2025-04-12', active: true, reported: false },
    // Ajouter plus de posts ici
  ];

  totalPosts = this.posts.length;
  activePosts = this.posts.filter(post => post.active).length;
  reportedPosts = this.posts.filter(post => post.reported).length;

  constructor() { }

  ngOnInit(): void {
  }

  togglePost(post: any): void {
    post.active = !post.active;
    this.updateStatistics();
  }

  deletePost(post: any): void {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      this.posts = this.posts.filter(p => p.id !== post.id);
      this.updateStatistics();
    }
  }

  updateStatistics(): void {
    this.totalPosts = this.posts.length;
    this.activePosts = this.posts.filter(post => post.active).length;
    this.reportedPosts = this.posts.filter(post => post.reported).length;
  }

  filteredPosts() {
    return this.posts.filter(post =>
      post.content.toLowerCase().includes(this.searchText.toLowerCase()) ||
      post.author.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
