import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SocketService} from '../../../core/socket.service';
import {Message} from '../../../core/classes/message';
import {MatExpansionPanel} from '@angular/material/expansion';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWindowComponent implements OnInit {
  @ViewChild('chatWindow') private chatWindow: ElementRef;
  panelOpenState = false;
  notification = '';
  unreadMessages = 0;
  newMessage;

  messages: Message[];


  constructor(
    private socket: SocketService,
    private changeDetection: ChangeDetectorRef
  ) {
    this.messages = [];
    this.socket.chatMessage$.subscribe(value => {
      this.messages = [...this.messages, value];
      this.changeDetection.detectChanges();
      if (this.panelOpenState === false) {
        this.notification = ++this.unreadMessages + ' unread messages';
      }
      this.scrollToBottom();
    });
  }

  ngOnInit(): void {
  }

  onPanelOpened() {
    this.panelOpenState = true;
    this.unreadMessages = 0;
    this.notification = '';
  }
  onPanelClosed() {
    this.panelOpenState = false;
    this.unreadMessages = 0;
    this.notification = '';
  }

  onNewMessage() {
    this.messages = [...this.messages, {
      uuid: 'Me',
      message: this.newMessage
    }];
    this.socket.sendChatMessage(this.newMessage);
    this.newMessage = '';
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
    } catch (err) { }
  }
}

