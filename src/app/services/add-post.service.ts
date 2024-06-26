import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostModule } from '../model/post/post.module';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  constructor(private http: HttpClient) {}

  addPost(post: PostModule) {
    const user = JSON.parse(localStorage.getItem('currentUser') as string);
 
    return this.http.post('/api/post/createPost', {
        title : post.getTitle(),
        text : post.getText(),
        author_id: user.id
    });
  }
 
  updatePost(post: PostModule) {
   console.log(post);
   const user = JSON.parse(localStorage.getItem('currentUser') as string);
 
   return this.http.post('/api/post/updatePost', {
       id: post.getId(),
       title : post.getTitle(),
       text : post.getText(),
       author_id: user.id
   });
  }
 
  deletePost(post: PostModule) {
   return this.http.post('/api/post/deletePost', {
     id: post.getId()
   });
  }
}
