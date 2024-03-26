import { Injectable } from "@angular/core";
import { Message } from "@common/interfaces/message.interface";
import { Observable, Subject } from "rxjs";
import { Socket, io } from "socket.io-client";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  private socket: Socket;
  private chatSubject: Subject<Message> = new Subject<Message>();

  constructor() {
    this.connect();
  }

  get id(): string {
    return this.socket.id;
  }

  sendMessage(channelId: string, message: Message): void {
    this.socket.emit("message:send", { channelId, message });
  }

  getMessage(): Observable<Message> {
    return this.chatSubject.asObservable();
  }

  async joinChat(channelId: string): Promise<Message[]> {
    return new Promise((resolve) => {
      this.socket.emit("message:join", channelId, (messages: Message[]) => {
        resolve(messages);
      });
    });
  }

  private createSocket(): Socket {
    return io(environment.wsUrl, { transports: ["websocket"] });
  }

  private connect() {
    this.socket = this.createSocket();
    this.listenForChat();
  }

  private listenForChat() {
    this.socket.on("message:receive", (message: Message) => {
      this.chatSubject.next(message);
    });
  }
}
