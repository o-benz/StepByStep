import {
  AfterViewInit,
  Component,
  Input,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import { UserRoles } from "../../../../../common/enums/user-roles.enum";
import { WebSocketService } from "@app/services/websocket.service";
import { Subscription } from "rxjs";
import { Resident } from "@common/interfaces/stakeholders/users";
import { Message } from "@common/interfaces/message.interface";
import { UserService } from "@app/services/user.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input() resident: Resident;
  @Output() closeChat = new EventEmitter<void>();

  @ViewChildren("messageList", { read: ElementRef })
  messageList: QueryList<ElementRef>;
  roomMessages: Message[] = [];
  roomMessage = "";
  isMessageTooLong: boolean = false;
  userRole: UserRoles;
  message: Subscription;

  constructor(
    private readonly webSocketService: WebSocketService,
    private readonly userService: UserService
  ) {}

  ngOnDestroy(): void {
    this.message?.unsubscribe();
  }

  async ngOnInit() {
    this.message = this.webSocketService
      .getMessage()
      .subscribe((message: Message) => {
        this.roomMessages.push(message);
      });
    await this.joinChat();
  }

  refreshChat(): void {
    this.roomMessages = [];
    this.joinChat();
  }

  onChatClose(): void {
    this.closeChat.emit();
  }

  async joinChat() {
    this.roomMessages = await this.webSocketService.joinChat(this.resident.id);
  }

  scrollToBottomAfterViewChecked(): void {
    // this.messageList.last.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToBottom(): void {
    // this.messageList.changes.subscribe(() => {
    //     this.scrollToBottomAfterViewChecked();
    // });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  sendToRoom(): void {
    const message: Message = {
      channel: this.resident.id,
      senderId: this.userService.user!.id,
      senderName: `${this.userService.user!.firstName} ${
        this.userService.user!.lastName
      }`,
      content: this.roomMessage,
      timestamp: new Date().getTime(),
    };
    this.roomMessage = "";
    this.webSocketService.sendMessage(this.resident.id, message);
  }

  isSent(message: Message): boolean {
    return message.senderId === this.userService.user!.id;
  }

  isResident(): boolean {
    return this.userService.user?.role === UserRoles.Resident;
  }
}
