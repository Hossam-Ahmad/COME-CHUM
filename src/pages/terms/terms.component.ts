import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  public height;
  public term;
  private page = 1;


  constructor(
    public authService: AuthService,
    public router: Router,
    public settings: SettingsService) {
    this.height = window.outerHeight + 'px';
  }

  ngOnInit() {
    this.getTermsConditions();
  }

  getTermsConditions() {
    this.settings.getTerms().subscribe(data => {
      console.log(data);
      this.term = data[0]['value'];
    });
  }

}
