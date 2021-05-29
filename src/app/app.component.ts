import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SignalRService} from './shared/services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked{
  isUserLogged: boolean = false;

  constructor(private signalRService: SignalRService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.signalRService.createConnection();
    this.signalRService.startConnection();
    this.signalRService.registerOnServerEvents();
  }

  ngAfterViewChecked() {
    this.isUserLogged = this.signalRService.isUserLogged;
    this.cdr.detectChanges();
  }
}
