import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Post } from "../post.model";
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(
    private http: HttpClient,
  ) { }

  getPosts() {
    this.http.get<{ message: string, posts: Post[] }>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map((post) => {
          return {
            title: post.title,
            content: post.content,
            id: post['_id']
          }
        })
      }))
      .subscribe((transformedPost) => {
        this.posts = transformedPost;
        this.postUpdated.next([...this.posts]);
      })
  }

  getPostUpdateListner() {
    return this.postUpdated.asObservable();
  }

  addPosts(title, content) {
    let post: Post = {
      id: null,
      title: title,
      content: content
    }

    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
      .subscribe((respData) => {
        console.log(respData);
        let id = respData.postId
        post.id = id;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      })
  }

  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string }>('http://localhost:3000/api/posts/' + id);
  }

  updatePost(id: string, title: string, content: string) {
    let post = { id: id, title: title, content: content };
    this.http.put('http://localhost:3000/api/posts/' + id, post)
      .subscribe((updatedResp) => {
        let updatedPost = [...this.posts];
        let oldPost = this.posts.findIndex(p => p.id === id);
        updatedPost[oldPost] = post;
        this.posts = updatedPost;
        this.postUpdated.next([...this.posts]);
      })
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe((deletedResp) => {
        console.log(deletedResp);
        this.posts = this.posts.filter(post => {
          return post.id !== postId
        });
        this.postUpdated.next([...this.posts])
      })
  }
}
