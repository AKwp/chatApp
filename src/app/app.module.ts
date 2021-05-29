import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { ChatComponent } from './chat/chat.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { ChatListComponent } from './chat/chat-list/chat-list.component';
import { ChatBoardComponent } from './chat/chat-board/chat-board.component';
import { ChatMessageComponent } from './chat/chat-board/chat-message/chat-message.component';
import { ChatSendMessageComponent } from './chat/chat-board/chat-send-message/chat-send-message.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ChatComponent,
    UserLoginComponent,
    ChatListComponent,
    ChatBoardComponent,
    ChatMessageComponent,
    ChatSendMessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
