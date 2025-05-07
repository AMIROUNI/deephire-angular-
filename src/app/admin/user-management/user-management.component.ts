import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { User } from '../../models';

@Component({
  selector: 'app-user-management',
  standalone: false,
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  // popup variables ///////////////////////////////////////////////////////////////
  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  popupIsSuccess = false;
  popupRedirectPath: string | null = null;
  showCancelButton = false;

  users:User[] = [];

  bannedUsers:User[]=[];
  constructor(private adminService:AdminService){}

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe({next:(users:User[]) => {
      console.log(users);
      this.users = users.filter((user:User) => !user.isBanned);
      this.bannedUsers = users.filter((user:User) => user.isBanned);
   },
   error:(err:any) => {
    console.log(err);
   }
  });
  }




  banUser(userId: number): void {
    this.adminService.banUser(userId).subscribe({
      next: () => {
        this.refreshUsers();
        this.showSuccessPopup('User banned successfully', 'Ban Successful');
      },
      error: err => {
        console.error(err);
        this.showErrorPopup('Failed to ban user', 'Ban Failed');
      }
    });
  }

  unbanUser(userId: number): void {
   this.adminService.unbanUser(userId).subscribe({
      next: () => {
        this.refreshUsers();
        this.showSuccessPopup('User unbanned successfully', 'Unban Successful');
      },
      error: err => {
        console.error(err);
        this.showErrorPopup('Failed to unban user', 'Unban Failed');
      }
    });
  }

  refreshUsers(): void {
   this.adminService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.users = users.filter(user => !user.isBanned);
        this.bannedUsers = users.filter(user => user.isBanned);
      },
      error: err => console.error(err)
  })
  }


  /// popup methods //////////////////////////////////////////

  showSuccessPopup(successMessage: string,title:string) {
    this.popupTitle = title;
    this.popupMessage = successMessage;
    this.popupIsSuccess = true;
    this.popupRedirectPath = null;
    this.showCancelButton = false;
    this.showPopup = true;
  }

  showErrorPopup(errorMessage: string,title:string) {
    this.popupTitle = title;
    this.popupMessage = errorMessage;
    this.popupIsSuccess = false;
    this.popupRedirectPath = null;
    this.showCancelButton = true;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
////////////////////////////////////



}
