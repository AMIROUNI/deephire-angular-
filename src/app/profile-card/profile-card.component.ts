import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Skill, User } from '../models';
import { Router } from '@angular/router';
import { SkillService } from '../services/skill.service';

@Component({
  selector: 'app-profile-card',
  standalone: false,
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css'],
})
export class ProfileCardComponent {
  connectedUser: User | undefined;
  bgimage: string | undefined;

  
  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  popupIsSuccess = false;
  popupRedirectPath: string | null = null;
  showCancelButton = false;
  errorMessage!:string;


  constructor(private router: Router,private UserService: UserService,private skillService: SkillService) {

   }


   ngOnInit(): void {

    console.log('Fetching user data...'); // Debugging line
    this.UserService.getCurrentUser().subscribe({
      next: (res) => {
        this.connectedUser = res;
        console.log('User data fetched:',this.connectedUser)
        this.bgimage= this.connectedUser.backGroundImage // Debugging line
        console.log('Background image URL:', this.bgimage); // Debugging line
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
      }
    });
   }





  showSectionsMenu: boolean = false;

toggleSectionsMenu() {
  this.showSectionsMenu = !this.showSectionsMenu;

}

hideSectionsMenu() {
  this.showSectionsMenu = false;
}


onDeleteSkills(section: string, skill: Skill) {
  if (confirm('Are you sure you want to delete this skill?')) {
    this.skillService.deleteSkill(skill).subscribe({
      next: (success) => {
        if (success) {
          this.showSuccessPopup();
          // Either reload or update local data
          window.location.reload(); // or this.loadSkills() if you have such method
        } else {
          this.showErrorPopup("Skill deletion failed.");
        }
      },
      error: (err) => {
        this.showErrorPopup("An error occurred while deleting the skill.");
        console.error(err);
      }
    });
  }
}

onDelete(section: string, x: any) {

  if (confirm('Are you sure you want to delete this item?')) {
    switch (section) {
      case 'skills':
           const skillToSend: Skill = {
                name: x.value.name 
              };
    

  }
    

}



}


showSuccessPopup() {
  this.popupTitle = 'Skill Deleted!';
  this.popupMessage = 'Skill successfully removed from your profile.';
  this.popupIsSuccess = true;
  this.showCancelButton = false;
  this.showPopup = true;
}
showErrorPopup(errorMessage: string) {
  this.popupTitle = 'skill Creating Failed';
  this.popupMessage = errorMessage;
  this.popupIsSuccess = false;
  this.popupRedirectPath = null;
  this.showCancelButton = true;
  this.showPopup = true;
}

closePopup() {
  this.showPopup = false;
}
}
