import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from "../../service/post.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";

  constructor(
    public postService: PostService,
  ) { }

  ngOnInit() {
  }

  savePost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.postService.addPosts(form.value.title, form.value.content);
  }

}
