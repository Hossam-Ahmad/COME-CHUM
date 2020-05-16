import { Component, OnInit, Input } from '@angular/core';
import { BlogsService } from 'src/services/blogs.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-blogs-component',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class blogsComponent implements OnInit {

  public blogs = [];
  private page = 1;

  constructor(
    private blogsService: BlogsService,
    public translate: TranslateService) {
  }

  ngOnInit(): void {
    this.getTopBlogs();
  }

  getTopBlogs() {
    this.blogsService.getTop().subscribe( data => {
      this.blogs = data;
      this.page++;
      console.log(this.blogs);
    });
  }

}
