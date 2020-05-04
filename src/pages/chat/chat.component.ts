import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public email = '';
  public password = '';
  public height;

  constructor(public authService: AuthService, public router: Router) {
    this.height = window.outerHeight + 'px';
  }

  ngOnInit() {

  }

}
