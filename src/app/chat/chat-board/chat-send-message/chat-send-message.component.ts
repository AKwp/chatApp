import {Component, ViewChild} from '@angular/core';
import {SignalRService} from '../../../shared/services/signal-r.service';
import {NgForm} from '@angular/forms';
import {Message} from '../../../shared/models/message.model';

@Component({
  selector: 'app-chat-send-message',
  templateUrl: './chat-send-message.component.html',
  styleUrls: ['./chat-send-message.component.scss']
})
export class ChatSendMessageComponent {
  @ViewChild('messageForm') messageForm: NgForm;
  user: String = '';
  txtMessage: string = '';
  messages = new Array<Message>();
  message = new Message();

  constructor(private signalRService: SignalRService) { }

  onSendMessage() {
    if (this.messageForm.value.messageText.length > 0) {
      this.message = new Message();
      this.message.message = this.messageForm.value.messageText;
      this.message.user = this.signalRService.currentUser;
      this.messages.push(this.message);
      this.signalRService.sendMessage(this.message);
      this.messageForm.reset();
    }
  }

  onEnterPress(event: any) {
    if (event.keyCode == 13) {
      this.onSendMessage();
    }
  }
}
