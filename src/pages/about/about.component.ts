import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ContentService } from 'src/services/content.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public aboutData;

  public map;
  public address;
  public fax;
  public phone;
  public whatsapp;
  public email;
  public facebook;
  public instagram;
  public twitter;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService
  ) { }

  ngOnInit() {
    this.contentService.getAbout().subscribe( data => {
      console.log(data);
      if (data != null) {
        this.aboutData = data;
        this.map = this.aboutData[0].value;
        this.address = this.aboutData[1].value;
        this.fax = this.aboutData[2].value;
        this.phone = this.aboutData[3].value;
        this.whatsapp = this.aboutData[4].value;
        this.email = this.aboutData[5].value;
        this.facebook = this.aboutData[6].value;
        this.twitter = this.aboutData[7].value;
        this.instagram = this.aboutData[8].value;
      }
    });
  }

  update() {
    if (this.aboutData) {
      console.log(this.aboutData);
      this.contentService.updateAbout(
        {
          map : this.map,
          address : this.address,
          fax : this.fax,
          phone : this.phone,
          whatsapp : this.whatsapp,
          email : this.email,
          facebook : this.facebook,
          instagram : this.instagram,
          twitter : this.twitter
      }).subscribe( data => {
        this.router.navigate(['/cpanel']);
      });
    }
  }

}
