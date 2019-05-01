import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { Post } from 'src/app/post.model';
import { PostService } from "../../service/post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postSub: Subscription

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
    this.postService.getPosts();
    this.postSub = this.postService.getPostUpdateListner()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      })
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }
  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
