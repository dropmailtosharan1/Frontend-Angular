import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostModule } from '../../model/post/post.module';
import { AddPostService } from '../../services/add-post.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent implements OnInit{

  postForm: FormGroup;
  submitted = false;
  post: PostModule = new PostModule('', '');
 
  @ViewChild('closeBtn') closeBtn!: ElementRef;
 
  constructor( 
   private formBuilder: FormBuilder,
   private addPostService: AddPostService,
   private commonService: CommonService
  ) {
   this.postForm = this.formBuilder.group({
     title: ['', Validators.required],
     text: ['', Validators.required]
   });
   this.commonService.postToEdit_Observable.subscribe(res => {
     this.setPostToEdit();
   });
   this.commonService.postToAdd_Observable.subscribe(res => {
     this.setPostToEdit();
   });
  }
 
  setPostToEdit() {
   this.post = this.commonService.postToEdit;
   this.postForm = this.formBuilder.group({
     title: [this.post.getTitle(), Validators.required],
     text: [this.post.getText(), Validators.required]
   });
  }
 
  ngOnInit() {}
 
  get f() { return this.postForm.controls; }
 
  onSubmit() {
   this.submitted = true;
 
   // stop here if form is invalid
   if (this.postForm.invalid) {
       return;
   }
 
   this.post.setText(this.f['title'].value);
   this.post.setText(this.f['text'].value);
 
   if (this.post.getId() === '') {
     this.addPostService.addPost( this.post ).subscribe({
       next: (result: any) => {
         if (result ['status'] === 'success') {
           this.closeBtn.nativeElement.click();
           this.commonService.notifyPostAddition('');
         } else {
           console.log( 'Error adding post' );
         }
       },
       error: (e: any) => {},
       complete: () => { console.info('complete') }
     });
   } else {
     this.addPostService.updatePost( this.post ).subscribe({
       next: (result: any) => {
         if (result ['status'] === 'success') {
           this.closeBtn.nativeElement.click();
           this.commonService.notifyPostAddition('');
         } else {
           console.log( 'Error updating post' );
         }
       },
       error: (e: any) => {},
       complete: () => { console.info('complete') }
     });
   } 
  }

}
