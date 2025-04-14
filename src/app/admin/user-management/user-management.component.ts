import { Component } from '@angular/core';

@Component({
  selector: 'app-user-management',
  standalone: false,
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  users = [
    { name: 'Fatima Zahra', email: 'fatima&#64;gmail.com', role: 'Admin', status: 'Actif' },
    { name: 'Yassine T.', email: 'yassine.t&#64;medapp.com', role: 'Médecin', status: 'Inactif' },
    { name: 'Samir L.', email: 'samir.l&#64;healthapp.com', role: 'Patient', status: 'Actif' },
  ];
  toggleStatus(user: any): void {
    user.status = user.status === 'Actif' ? 'Banni' : 'Actif';
  }
}
