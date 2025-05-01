import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { Message, User } from '../models';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  contacts: User[] = [];
  selectedContact: User | null = null;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.getContacts().subscribe(users => {
      this.contacts = users;
    });
  }

  onContactSelected(contact: User) {
    this.selectedContact = contact;
  }
}