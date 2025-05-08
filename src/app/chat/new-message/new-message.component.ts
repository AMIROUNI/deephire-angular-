import { Component, Input, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Message } from '../../models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-message',
  standalone: false,
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.css'
})
export class NewMessageComponent implements OnInit {
  @Input() username!: string;  
  messageContent = '';
  messages: Message[] = [];

  constructor(private webSocketService: WebsocketService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.webSocketService.connect(token);
    }

    this.webSocketService.messages$.subscribe((msg) => {
      console.log('[Chat] New message received:', msg);
      this.messages.push(msg);
    });
  }

  sendMessage() {
    if (this.username && this.messageContent.trim()) {
      this.webSocketService.sendMessage(this.messageContent, this.username);
      console.log('[Chat] Message sent:', this.messageContent);
      alert('Message sent');
      this.messageContent = '';
    }
  }
}