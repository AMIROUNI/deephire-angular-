import { Component } from '@angular/core';
import { Notification } from '../models/notification/notification.model';
@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  notifications: Notification[] = [
    {
      id: 1,
      content: 'You have a new follower!',
      sender: 'Jane Doe',
      date: new Date('2025-04-13T10:30:00')
    },
    {
      id: 2,
      content: 'Your post received 12 new likes.',
      sender: 'System',
      date: new Date('2025-04-12T14:15:00')
    },
    {
      id: 3,
      content: 'John sent you a message.',
      sender: 'John Smith',
      date: new Date('2025-04-11T08:00:00')
    }
  ];



  handleDelete(id: number) {
    this.notifications = this.notifications.filter(notif => notif.id !== id);
  }
}
