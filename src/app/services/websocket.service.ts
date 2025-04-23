import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private client: Client | undefined;
  private messageSubject = new Subject<any>();

  public messages$ = this.messageSubject.asObservable();

  connect(token: string): void {
    console.log('[WebSocket] Attempting connection with token:', token);

    this.client = new Client({
        webSocketFactory: () =>
            new SockJS(`http://localhost:8095/ws`) as WebSocket,
        connectHeaders: {token: token},
        reconnectDelay: 5000,

        onConnect: () => {
            console.log('[WebSocket] Connected to server');

            this.client?.subscribe('/user/queue/messages', (message: IMessage) => {
                console.log('[WebSocket] Received message:', message.body);
                this.messageSubject.next(JSON.parse(message.body));
            });

            console.log('[WebSocket] Subscribed to /user/queue/messages');
        },

        onDisconnect: () => {
            console.log('[WebSocket] Disconnected from server');
        },

        onStompError: (frame) => {
            console.error('[WebSocket] STOMP Error:', frame.headers['message']);
        }
    });

    this.client.activate();
}

sendMessage(content: string, receiverUsername: string): void {
  const senderUsername = this.getUsernameFromToken();
  const message = {
      content,
      senderUsername,
      receiverUsername,
      timestamp: new Date(),
  };

  if (this.client) {
      this.client.publish({
          destination: '/app/chat.send',
          body: JSON.stringify(message),
          headers: { token: localStorage.getItem('token') || '' }
      });
  }
}

   getUsernameFromToken(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub;
  }
}
