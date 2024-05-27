import { Injectable } from '@angular/core';
import { PostModule } from '../model/post/post.module';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public postAdded_Observable = new Subject();
  public postToEdit_Observable = new Subject();
  public postToDelete_Observable = new Subject();  
  public postToAdd_Observable = new Subject();

  postToEdit: PostModule = new PostModule('', '');
  postToDelete: PostModule = new PostModule('', '');

  constructor() { }

  notifyPostToAdd(msg: string) {
    this.postToAdd_Observable.next(msg);
  }

  notifyPostAddition(msg: string) {     
    this.postAdded_Observable.next(msg);
  }

  notifyPostEdit(msg: string) {
    this.postToEdit_Observable.next(msg);
  }

  notifyPostDelete(msg: string) {
    this.postToDelete_Observable.next(msg);
  }
  
  setPostToEdit(post: any) {
    this.postToEdit = new PostModule(post.title, post.text);
    this.postToEdit.setId(post._id);
    this.notifyPostEdit('');
  }  

  setPostToAdd() {
    this.postToEdit = new PostModule('', '');
    this.postToEdit.setId('');
    this.notifyPostToAdd('');
  }

  setPostToDelete(post: any) {
    this.postToDelete = new PostModule('', '');
    this.postToDelete.setId(post._id);
    this.notifyPostDelete('');
  }
}
