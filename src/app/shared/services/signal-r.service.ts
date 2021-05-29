import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {environment} from '../../../environments/environment';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  messageReceived = new EventEmitter<Message>();
  userLogged = new EventEmitter<String>();
  public currentUser: string = '';
  public isUserLogged: boolean = false;

  private hubConnection: signalR.HubConnection;

  // ********** SignalR Configuration ********** //
  public createConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.baseUrl + '/chathub')
      .build()
  }

  public startConnection = () => {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  // ********** Emiters ********** //
  public sendMessage(message: Message): void {
    this.hubConnection
      .invoke('SendMessage', message.user, message.message)
      .catch(err => console.error(err));
  }

  public loginUser(user: string): void {
    this.hubConnection
      .invoke('OnUserLogin', user)
      .catch(err => console.log(err));
    this.currentUser = user;
    this.isUserLogged = true;
  }

  public logoutUser(user: string): void {
    this.hubConnection
      .invoke('OnUserLogout', user)
      .catch(err => console.log(err));
    this.isUserLogged = false;
  }

  // ********** Listeners ********** //
  public registerOnServerEvents(): void {
    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      this.messageReceived.emit({user: user, message: message});
    });

    this.hubConnection.on('GetOnlineUsers', data => {
      this.userLogged.emit(data);
    })
  }
}
