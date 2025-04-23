import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  message = '';
  messages: any[] = [];
  receiver = '';

  constructor(private wsService: WebsocketService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    console.log('[Chat] Initializing with token:', token);

    if (token) {
        this.wsService.connect(token);
    }

    this.wsService.messages$.subscribe((msg) => {
        console.log('[Chat] New message received:', msg);
        this.messages.push(msg);
    });
}

send(): void {
    if (this.message.trim() && this.receiver.trim()) {
        console.log('[Chat] Sending message:', {
            content: this.message,
            receiver: this.receiver
        });
        this.wsService.sendMessage(this.message, this.receiver);
        this.message = '';
    }
}
}
