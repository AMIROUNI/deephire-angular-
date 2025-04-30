import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SkillService } from '../../services/skill.service';
import { Skill } from '../../models';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.css'],
  standalone: false,
})
export class SkillFormComponent {

  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  popupIsSuccess = false;
  popupRedirectPath: string | null = null;
  showCancelButton = false;
  errorMessage!:string;


  skill! : Skill;
  constructor(private skillService:SkillService){}
  @Output() cancel = new EventEmitter<void>();

  skillForm = new FormGroup<{ name: FormControl<string> }>({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
  });

  isInvalidAndTouchedOrDirty(control: FormControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  onSubmit() {
    if (this.skillForm.valid) {
      const skillToSend: Skill = {
        name: this.skillForm.value.name // ici c'est un `string`, plus d'erreur
      };
  
      this.skillService.addSkill(skillToSend).subscribe({
        next: () =>{this.showSuccessPopup()
          window.location.reload();

        } ,
        error: (err) => {
          console.error(err);
          if (err.status === 401) {
            this.errorMessage = 'Session expired. Please login again.';
          } else {
            this.errorMessage = 'Error completing company profile. Please try again.';
          }
          this.showErrorPopup("Error completing company profile");
        }
      });
    }
  }
  

  onCancel() {
    this.cancel.emit();
  }


  

  showSuccessPopup() {
    this.popupTitle = 'skill  Created!';
    this.popupMessage = 'skill successfully added to your profile !.';
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
