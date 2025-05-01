import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Experience, Skill, User, Education, Certification } from '../models';
import { Router, ActivatedRoute } from '@angular/router';
import { SkillService } from '../services/skill.service';
import { ExperienceService } from '../services/experience.service';
import { EducationService } from '../services/education.service';
import { CertificationService } from '../services/certification.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css'],
  standalone:false
})
export class ProfileCardComponent {
  connectedUser: User | undefined;
  bgimage: string | undefined;
  isCurrentUserProfile: boolean = false;
  user: User | undefined;


  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  popupIsSuccess = false;
  popupRedirectPath: string | null = null;
  showCancelButton = false;
  errorMessage!: string;

  showSectionsMenu: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private skillService: SkillService,
    private experienceService: ExperienceService,
    private educationService: EducationService,
    private certificationService: CertificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const usernameFromUrl = params['username'];

      this.userService.getCurrentUser().subscribe({
        next: (res) => {
          this.connectedUser = res;
          this.bgimage = this.connectedUser.backGroundImage;

          // Check if the URL username matches current user's username
          if(this.connectedUser.username === usernameFromUrl){
            this.isCurrentUserProfile = true;
            this.user = this.connectedUser;
          }
          else{
            this.isCurrentUserProfile = false;
            this.userService.getUserByUsername(usernameFromUrl).subscribe({
              next: (res) => {
                this.user = res;
              },
              error: (err) => {
                console.error('Error fetching user profile:', err);
                this.router.navigate(['/error']);
              },
            });
          }
        },
        error: (err) => {
          console.error('Error fetching user profile:', err);
        },
      });
    });
  }

  toggleSectionsMenu() {
    this.showSectionsMenu = !this.showSectionsMenu;
  }

  hideSectionsMenu() {
    this.showSectionsMenu = false;
  }

  navigateToUpdateProfile() {
    this.router.navigate(['/profile/update']);
  }



  onDeleteSkills(section: string, skill: Skill) {
    if (confirm('Are you sure you want to delete this skill?')) {
      this.skillService.deleteSkill(skill).subscribe({
        next: (success) => {
          if (success) {
            this.showSuccessPopup('Skill deleted successfully!');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            this.showErrorPopup('Skill deletion failed.');
          }
        },
        error: (err) => {
          this.showErrorPopup('An error occurred while deleting the skill.');
          console.error(err);
        },
      });
    }
  }

  onDeleteExperience(section: string, experience: Experience) {
    if (confirm('Are you sure you want to delete this experience?')) {
      this.experienceService.deleteExperience(experience).subscribe({
        next: (success: any) => {
          if (success) {
            this.showSuccessPopup('Experience deleted successfully!');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            this.showErrorPopup('Experience deletion failed.');
          }
        },
        error: (err: any) => {
          this.showErrorPopup('An error occurred while deleting the experience.');
          console.error(err);
        },
      });
    }
  }

  onDeleteEducation(section: string, education: Education) {
    if (confirm('Are you sure you want to delete this education?')) {
      this.educationService.deleteEducation(education).subscribe({
        next: (success: any) => {
          if (success) {
            this.showSuccessPopup('Education deleted successfully!');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            this.showErrorPopup('Education deletion failed.');
          }
        },
        error: (err: any) => {
          this.showErrorPopup('An error occurred while deleting the education.');
          console.error(err);
        },
      });
    }
  }

  onDeleteCertification(section: string, certification: Certification) {
    if (confirm('Are you sure you want to delete this certification?')) {
      this.certificationService.deleteCertification(certification).subscribe({
        next: (success: any) => {
          if (success) {
            this.showSuccessPopup('Certification deleted successfully!');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            this.showErrorPopup('Certification deletion failed.');
          }
        },
        error: (err: any) => {
          this.showErrorPopup('An error occurred while deleting the certification.');
          console.error(err);
        },
      });
    }
  }



  messageUser(){
    this.router.navigate(['/newMessage', this.user?.username]);
  }

  showSuccessPopup(message: string) {
    this.popupTitle = 'Success!';
    this.popupMessage = message;
    this.popupIsSuccess = true;
    this.showCancelButton = false;
    this.showPopup = true;
  }

  showErrorPopup(errorMessage: string) {
    this.popupTitle = 'Error';
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