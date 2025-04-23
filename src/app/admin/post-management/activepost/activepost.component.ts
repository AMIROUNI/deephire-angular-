import { Component } from '@angular/core';

@Component({
  selector: 'app-activepost',
  standalone: false,
  templateUrl: './activepost.component.html',
  styleUrl: './activepost.component.css'
})
export class ActivepostComponent {
  searchText = '';
  posts = [
    { id: 1, author: 'John Doe', content: 'Lorem ipsum dolor sit amet...', date: '2025-04-14', active: true, reported: false },
    { id: 2, author: 'Jane Smith', content: 'Consectetur adipiscing elit...', date: '2025-04-13', active: false, reported: true },
    { id: 3, author: 'Alice Johnson', content: 'Sed do eiusmod tempor incididunt...', date: '2025-04-12', active: true, reported: false },
  ];

  activePosts = this.posts.filter(post => post.active).length;
}
