import { Message } from "@common/interfaces/message.interface";
import { Injectable, Logger } from "@nestjs/common";
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: true })
@Injectable()
export class ChatGateway {
  @WebSocketServer() private server: Server;
  private roomMessages: Map<string, Message[]> = new Map();

  constructor(private readonly logger: Logger) {
    this.logger = new Logger("ChatGateway");
  }

  @SubscribeMessage("message:send")
  handleMessage(
    client: Socket,
    data: { channelId: string; message: Message }
  ): void {
    const { channelId, message } = data;
    this.logger.log(`Received message: ${data.channelId} - ${data.message}`);
    if (!this.roomMessages.has(channelId)) this.roomMessages.set(channelId, []);
    this.roomMessages.get(channelId)?.push(message);
    this.server.to(channelId).emit("message:receive", message);
  }

  @SubscribeMessage("message:join")
  async handleGetMessages(
    client: Socket,
    channelId: string
  ): Promise<Message[]> {
    const messages = this.roomMessages.get(channelId) || [];
    client.join(channelId);
    this.logger.log(`Client joined room ${channelId}`);
    return messages;
  }
}
