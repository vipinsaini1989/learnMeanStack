import { Component, OnInit, Input } from '@angular/core';
import { Subscribable } from "rxjs";
import { Post } from 'src/app/post.model';
import { PostService } from "../../service/post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  /* posts = [
    { title: "first post", content: "this is content" },
    { title: "second post", content: "this is content" },
    { title: "third post", content: "this is content" },
  ] */
  constructor(
    public postService: PostService
  ) {
  }

  ngOnInit() {
    this.posts = this.postService.getPosts();
    this.postService.getPostUpdateListner()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      })
  }

}
