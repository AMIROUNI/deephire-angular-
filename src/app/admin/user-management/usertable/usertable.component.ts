import { Component } from '@angular/core';

@Component({
  selector: 'app-usertable',
  standalone: false,
  templateUrl: './usertable.component.html',
  styleUrl: './usertable.component.css'
})
export class UsertableComponent {
  users = [
    { name: 'Fatima Zahra', email: 'fatima&#64;gmail.com', role: 'Admin', status: 'Actif' },
    { name: 'Yassine T.', email: 'yassine.t&#64;medapp.com', role: 'Médecin', status: 'Inactif' },
    { name: 'Samir L.', email: 'samir.l&#64;healthapp.com', role: 'Patient', status: 'Actif' },
  ];
  toggleStatus(user: any): void {
    user.status = user.status === 'Actif' ? 'Banni' : 'Actif';
  }
}
