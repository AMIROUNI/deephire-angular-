import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile-sections',
  templateUrl: './profile-sections.component.html',
  styleUrls: ['./profile-sections.component.css'],
  standalone: false
})
export class ProfileSectionsComponent {
  @Output() close = new EventEmitter<void>(); // <-- Emit close event

  selectedSection: string | null = null;

  sections = [
    { key: 'education', label: 'Add education' },
    { key: 'experience', label: 'Add position' },
    { key: 'skill', label: 'Add skills' },
    { key: 'certification', label: 'Add certification' }
  ];

  selectSection(key: string) {
    this.selectedSection = key;
  }

  clearForm() {
    this.selectedSection = null;
    this.close.emit(); // <-- Emit event to hide popup
  }
}
