import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Message, User } from '../../models';
import { MessageService } from '../../services/message.service';
import { WebsocketService } from '../../services/websocket.service';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat-window',
  standalone: false,
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent implements OnChanges {
  @Input() contact: User | null = null;
  messages: Message[] = [];
  messageContent = '';
  currentUser: User | null = null;

  constructor(private messageService: MessageService, private websocketService: WebsocketService, private UserService: UserService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contact'] && this.contact) {
      this.loadMessages();
      console.log('[Chat] Contact changed:', this.contact);
      const token = localStorage.getItem('token');
      if (token) {
        this.websocketService.connect(token);
      }
      this.websocketService.messages$.subscribe((msg) => {
        console.log('[Chat] New message received:', msg);
        this.messages.push(msg);
    });
    }
  }
  ngOnInit() {
    this.UserService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  loadMessages() {
    this.messageService.getConversation(this.contact!.username || '').subscribe(msgs => {
      this.messages = msgs;
      console.log("messages", this.messages);
    });
  }



  sendMessage() {
    if (this.contact && this.messageContent.trim()) {
      this.websocketService.sendMessage(this.messageContent, this.contact.username || '');
      this.messageContent = '';
    }
  }
}
