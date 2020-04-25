import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BlogsService } from 'src/services/blogs.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  blogId;
  public blogData;
  public btnTitle = 'اضافه';

  public title;
  public image;
  public body;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogsService: BlogsService
  ) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.blogId = params['blogId'];
        this.blogsService.get(this.blogId).subscribe( data => {
          if (data != null) {
            this.blogData = data[0];
            this.title = this.blogData.title;
            this.body = this.blogData.body;
            this.image = this.blogData.image;
            this.btnTitle = 'تعديل';
            console.log(this.blogData);
          }
        });
      });
  }

  open() {
    const win = window.open(`${environment.host}profile/${this.blogData.blog_id}`, '_blank');
    win.focus();
  }

  perform() {
    if (this.blogData) { // update
      console.log(this.blogData);
      this.blogsService.update(
        this.blogId,
        {
        title : this.title,
        body : this.body,
      }).subscribe( data => {
        this.router.navigate(['/cpanel/blogs']);
      });
    } else {// create
      if (this.title !== '' && this.body !== '') {
        this.blogsService.create({
          title : this.title,
          body : this.body,
          image : ''
        }).subscribe( data => {
          this.router.navigate(['/cpanel/blogs']);
        });
      } else {
        alert('ادخل كل بيانات الباقة');
      }
    }
  }

}
