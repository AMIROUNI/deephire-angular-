import { Component } from '@angular/core';

@Component({
  selector: 'app-latestusers',
  standalone: false,
  templateUrl: './latestusers.component.html',
  styleUrl: './latestusers.component.css'
})
export class LatestusersComponent {
  latestUsers = [
    { name: 'Fatima B.', email: 'fatima@gmail.com', date: new Date('2025-04-13') },
    { name: 'Yassine T.', email: 'yassine.t@medapp.com', date: new Date('2025-04-12') }
  ];
}
