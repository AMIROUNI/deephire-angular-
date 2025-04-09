import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  standalone: false,
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {
  defaultUser = {
    name: 'Alex Johnson',
    title: 'Senior Software Engineer at TechCorp',
    location: 'San Francisco, CA',
    connections: 543,
    about: 'Full-stack developer specializing in Angular and Node.js with 8+ years of experience.',
    experience: [
      { role: 'Senior Software Engineer', company: 'TechCorp', duration: '2020 - Present' },
      { role: 'Software Developer', company: 'WebSolutions', duration: '2016 - 2020' }
    ],
    education: [{ degree: 'MSc Computer Science', university: 'Stanford University', year: '2016' }],
    skills: ['Angular', 'TypeScript', 'Node.js', 'UX Design', 'Agile Methodologies'],
    profilePicture: 'assets/images/user/profile-photo.png',
    backgroundImage: 'assets/images/user/panel.png'
  };

  connect() {
    console.log('Demande de connexion envoyée à', this.defaultUser.name);
  }








  showSectionsMenu: boolean = false;

toggleSectionsMenu() {
  this.showSectionsMenu = !this.showSectionsMenu;
  
}

hideSectionsMenu() {
  this.showSectionsMenu = false;
}
  
}