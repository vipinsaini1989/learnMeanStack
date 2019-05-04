import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from "../../service/post.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  mode = 'create';
  post: Post;
  private postId: string;

  constructor(
    public postService: PostService,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId)
          .subscribe((post) => {
            this.post = {
              id: post._id,
              title: post.title,
              content: post.content
            }
          });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    })
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postService.addPosts(form.value.title, form.value.content);
    } else {
      this.postService.updatePost(this.postId, form.value.title, form.value.content);
    }
    form.resetForm();
    this.router.navigate(["/"]);
  }

}
