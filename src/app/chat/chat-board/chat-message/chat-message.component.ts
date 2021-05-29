import {Component} from '@angular/core';
import {SignalRService} from '../../../shared/services/signal-r.service';
import {Message} from '../../../shared/models/message.model';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent {
  messages = new Array<Message>();
  user: string = '';

  constructor(private signalRService: SignalRService) {
    this.takeMessage();
    this.user = this.signalRService.currentUser;
  }

  private takeMessage(): void {
    this.signalRService.messageReceived
      .subscribe((message: Message) => {
          this.messages.push(message);
      });
  }
}
