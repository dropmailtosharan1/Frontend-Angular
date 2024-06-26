import { Component, ElementRef, ViewChild } from '@angular/core';
import { PostModule } from '../../model/post/post.module';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { AddPostService } from '../../services/add-post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  posts: any[] = [];
 
 @ViewChild('addPost') addBtn!: ElementRef;
 @ViewChild('editPost') editBtn!: ElementRef;
 @ViewChild('deletePost') deleteBtn!: ElementRef;
 @ViewChild('cancelBtn') cancelBtn!: ElementRef;

 postToDelete: PostModule = new PostModule('', '');

 constructor( 
  private postService: PostService,
  private auth: AuthService, 
  private router: Router,
  private commonService: CommonService,
  private addPostService: AddPostService
 ) { 
  this.commonService.postToEdit_Observable.subscribe(res => {
    this.editBtn.nativeElement.click();
  });
  this.commonService.postToDelete_Observable.subscribe(res => {
    this.postToDelete = this.commonService.postToDelete;
    this.deleteBtn.nativeElement.click();
  });
 }

 ngOnInit() {
   this.getPosts();

   this.commonService.postAdded_Observable.subscribe((res) => {
    this.getPosts();
   });
 }

 getPosts() {
   this.postService.getPostsByAuthor().subscribe({
    next: (result: any) => {
      this.posts = result['data'];
      console.log( this.posts );
    }
   });
 }

 resetPost() {
  this.commonService.setPostToAdd();
 }

 delete() {
  this.addPostService.deletePost( this.postToDelete ).subscribe(
    (res) => {
      this.getPosts();
      this.cancelBtn.nativeElement.click();
  });
 }

 logout() {
  this.auth.logout();
  this.router.navigate(['']);
 }
}
