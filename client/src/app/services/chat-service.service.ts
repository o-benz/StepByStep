import { Injectable } from "@angular/core";
import { Message } from "@common/interfaces/message.interface";
import { WebSocketService } from "./websocket.service";
import { CommunicationService } from "./communication.service";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  messages: Map<string, Message[]> = new Map();

  constructor(
    private webSocketService: WebSocketService,
    private communicationService: CommunicationService
  ) {
    this.fetchMessages();
  }

  listenForMessages() {
    this.webSocketService.on("chat-message", (message: Message) => {
      if (!this.messages.has(message.channel)) {
        this.messages.set(message.channel, []);
      }
      this.messages.get(message.channel)?.push(message);
    });
  }

  fetchMessages() {
    this.communicationService
      .getAllChannelMessages()
      .subscribe((messages: Message[]) => {
        messages.forEach((message) => {
          if (!this.messages.has(message.channel)) {
            this.messages.set(message.channel, []);
          }
          this.messages.get(message.channel)?.push(message);
        });
      });
  }
}
