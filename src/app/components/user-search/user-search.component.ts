import { Component } from '@angular/core';
import { UserSearchDTO } from '../../models/user/user-search-dto';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-search',
  standalone: false,
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.css'
})
export class UserSearchComponent {
  searchResults: UserSearchDTO[] = [];
query: string = '';

constructor(private userService: UserService, private router: Router) {}


  onSearchChange(): void {
    if (this.query.trim().length > 0) {
      this.userService.searchUsers(this.query).subscribe(results => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
  }

  goToProfile(username: string): void {
    this.router.navigate(['/profile', username]);
  }

}
