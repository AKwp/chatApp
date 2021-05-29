import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SignalRService} from '../../shared/services/signal-r.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  @ViewChild('userForm') userForm: NgForm;
  usersList = new Array<any>();
  user: string = '';
  nameToShort: boolean = false;
  nameToLong: boolean = false;
  userExist: boolean = false;

  constructor(private signalRService: SignalRService) {
    this.takeUsers();
  }

  ngOnInit(): void {
  }

  onUserLogin() {
    if(this.usersList.includes(this.userForm.value.username)) {
      this.userExist = true;
      this.nameToShort = false;
      this.nameToLong = false;
    } else if(this.userForm.value.username.length <= 3) {
      this.nameToShort = true;
      this.nameToLong = false;
      this.userExist = false;
    } else if(this.userForm.value.username.length > 10) {
      this.nameToLong = true;
      this.nameToShort = false;
      this.userExist = false;
    } else {
      this.user = this.userForm.value.username;
      this.signalRService.loginUser(this.user);
      this.nameToLong = false;
      this.nameToShort = false;
    }
  }

  private takeUsers(): void {
    this.signalRService.userLogged
      .subscribe((data) => {
        this.usersList = [...new Set(data)];
        this.user = this.signalRService.currentUser;
      });
  }
}
