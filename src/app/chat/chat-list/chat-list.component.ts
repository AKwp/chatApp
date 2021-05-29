import {Component, OnInit} from '@angular/core';
import {SignalRService} from '../../shared/services/signal-r.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  usersList = new Array<any>();
  user: string = '';

  constructor(private signalRService: SignalRService) {
    this.takeUsers();
  }

  ngOnInit(): void {
    window.onbeforeunload = () => {
      this.signalRService.logoutUser(this.user);
    }
  }

  private takeUsers(): void {
    console.log('wow');
    this.signalRService.userLogged
      .subscribe((data) => {
        this.usersList = [...new Set(data)];
        this.user = this.signalRService.currentUser;
      });
  }

  onUserLogout() {
    this.signalRService.logoutUser(this.user);
  }
}
