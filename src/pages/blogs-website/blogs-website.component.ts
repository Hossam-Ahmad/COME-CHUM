import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/services/authUser.service';
import { BlogsService } from 'src/services/blogs.service';

@Component({
  selector: 'app-blogs-website',
  templateUrl: './blogs-website.component.html',
  styleUrls: ['./blogs-website.component.scss']
})
export class BlogsWebsiteComponent implements OnInit {

  public height;
  private page = 1;
  public blogs = [];

  constructor(public authService: AuthUserService,
              public router: Router,
              private blogsService: BlogsService) {
    this.height = window.outerHeight + 'px';
  }

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs() {
    this.authService.getData().subscribe(data => {
      this.blogsService.getAll(this.page, data.id).subscribe(data2 => {
        this.blogs = data2;
        console.log(this.blogs);
      });
    });
  }

  isMobile() {
    return window.innerWidth < 800;
  }

}
