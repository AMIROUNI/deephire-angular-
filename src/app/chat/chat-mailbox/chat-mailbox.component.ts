import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models';

@Component({
  selector: 'app-chat-mailbox',
  standalone: false,
  templateUrl: './chat-mailbox.component.html',
  styleUrl: './chat-mailbox.component.css'
})
export class ChatMailboxComponent {
  @Input() contacts: User[] = [];
  @Output() contactSelected = new EventEmitter<User>();

  

  selectContact(user: User) {
    this.contactSelected.emit(user);
  }
}