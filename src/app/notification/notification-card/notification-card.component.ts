import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Notification } from '../../models/notification/notification.model';


@Component({
  selector: 'app-notification-card',
  standalone: false,
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.css'
})
export class NotificationCardComponent {

  @Input() notification!: Notification;
  @Output() delete = new EventEmitter<number>();

  defaultAvatar: string = 'https://www.gravatar.com/avatar/?d=mp';

  onDeleteClick() {
    const confirmed = window.confirm('Are you sure you want to delete this notification?');
    if (confirmed) {
      this.delete.emit(this.notification.id);
    }
  }


}
