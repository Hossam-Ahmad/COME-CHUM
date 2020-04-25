import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../services/blogs.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MiscService } from 'src/services/misc.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  aboutHeight: any;
  public blogs = [];
  public cover = '';
  pageId = 1;
  constructor(
    public blogsService: BlogsService,
    public router: Router,
    public misc: MiscService) {
    this.aboutHeight = (window.innerHeight) * ( 2 / 3 ) + 'px';
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.getBlogs();
  }

  getBlogs() {
    this.blogsService.getAll(this.pageId).subscribe(data => {
      this.blogs = data;
      console.log(data);
      this.pageId++;
    });
  }

  open(index) {
    const win = window.open(`${environment.host}blog/${this.blogs[index].blog_id}`, '_blank');
    win.focus();
  }

  remove(index) {
    this.blogsService.remove(this.blogs[index].id).subscribe( data => {
      this.blogs.splice(index, 1);
    });
  }

  onScroll() {
    this.getBlogs();
  }

  details(index) {
    this.router.navigate(['/cpanel/blog-details'], { queryParams: { blogId: this.blogs[index].id } });
  }

}
