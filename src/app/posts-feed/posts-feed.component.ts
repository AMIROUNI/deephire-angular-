import { Component, OnInit } from '@angular/core';
import { Post } from '../models/posts/post.model';
import { User } from '../models/user/user.model';
import { Comment } from '../models/posts/comment.model';
import { Media } from '../models/posts/media.model';

@Component({
  selector: 'app-posts-feed',
  templateUrl: './posts-feed.component.html',
  styleUrls: ['./posts-feed.component.css'],
  standalone: false
})
export class PostsFeedComponent implements OnInit {
  posts: Post[] = [];
  sortBy: string = 'top';

  ngOnInit(): void {
    // In a real app, you would fetch posts from a service
    this.loadSamplePosts();
  }

  loadSamplePosts(): void {
    const sampleUser: User = {
      id: 1,
      firstName: 'Mourad',
      lastName: 'Elhanine',
      email: 'mourad@example.com',
      profilePicture: 'assets/user1.jpg',
      bio: 'Automation & Robotics technician #FreePalestine'
    };

    const sampleComments: Comment[] = [
      {
        id: 'c1',
        content: 'This is heartbreaking.',
        author: sampleUser,
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        likes: 10,
        edited: false
      }
    ];

    const sampleMedia: Media[] = []; // Empty for now

    this.posts = [
      {
        id: '1',
        author: sampleUser,
        content: 'حرقته إسرائيل...الصحفي الذي شاهدتموه بحترق تحت نيران القصف الإسرائيلي الذي استهدف خيام الصحفيين قرب مستشفى ناصر في حان يونس جنوب قطاع غزة. هو أحمد منصور، مراسل وكالة "فلسم لين" اليوم "المحلية". أحمد أن يعين أسرة، وهو الآن يعاني من إصابة بالغة الخطورة، بينما يبدل الأطباء جهوداً حثيثة لإنقاذ حياته.',
        translation: 'He was burned by Israel... The journalist you saw engulfed in flames under Israeli shelling that targeted the journalists\' tents near Nasser Hospital in Khan Younis, southern Gaza Strip, is Ahmed Mansour, a correspondent for the local news agency Palestine Today. Ahmed is a father and the sole provider for his family. He is now suffering from life-threatening injuries, as doctors make every effort to save his life',
        tags: ['غزة تحت القصف', 'شمال غزة بموت جوءا ألفذوا أطفال غزة', 'قطاع غزة بموت جوءا', 'gaza_under_attack', 'GazaGenocide', 'stopgenocideingaza', 'casefirenowingazar', 'freepalestine', 'gaza', 'palestine', 'Rafah', 'westbank', 'world', 'morocco', 'alquds', 'Tunisie', 'Egypte', 'iraq', 'Turquie', 'Italie', 'Europe', 'Asie', 'Afrique', 'uk', 'usa', 'Espagne', 'France', 'Germany', 'algeria', 'egypt', 'saudiarabia', 'qatar', 'emirates', 'jordan', 'Syria', 'news'],
        timestamp: new Date(Date.now() - 172800000), // 2 days ago
        edited: true,
        likes: 245,
        comments: sampleComments,
        shares: 12,
        media: sampleMedia
      }
      // Add more sample posts as needed
    ];
  }

  onPostCreated(newPost: any): void {
    // In a real app, you would send this to your backend
    const currentUser: User = {
      id: Math.floor(Math.random() * 1000), // Random number for id
      firstName: 'Current',
      lastName: 'User',
      email: 'currentuser@example.com',
      profilePicture: 'assets/default-avatar.jpg',
      bio: 'Your bio here'
    };

    const post: Post = {
      id: Math.random().toString(36).substring(2),
      author: currentUser,
      content: newPost.content,
      timestamp: new Date(),
      likes: 0,
      comments: [],
      shares: 0,
      tags: [],
      media: []
    };
    this.posts.unshift(post); // Add to beginning of array
  }

  changeSort(sortType: string): void {
    this.sortBy = sortType;
    if (sortType === 'top') {
      this.posts.sort((a, b) => b.likes - a.likes);
    } else if (sortType === 'new') {
      this.posts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }
  }
}