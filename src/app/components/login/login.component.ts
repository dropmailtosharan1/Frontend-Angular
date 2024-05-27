import { Component, OnInit } from '@angular/core';
import { UserModule } from '../../model/user/user.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit {
  date = new Date();
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  user: UserModule = new UserModule('', '');
  error: string = '';
 
 constructor( 
     private formBuilder: FormBuilder, 
     private authService: AuthService,
     private router: Router 
 ) {
   this.loginForm = this.formBuilder.group({
     username: ['', Validators.required],
     password: ['', Validators.required]
   });
   if (this.authService.isAuthenticated()) {
     this.router.navigate(['/home']);
   }
 }
 
  ngOnInit() {}
 
  get f() { return this.loginForm.controls; }
 
  onSubmit() {
     this.submitted = true;
 
     // stop here if form is invalid
     if (this.loginForm.invalid) {
          return;
     }
 
     this.loading = true;
 
     this.user = new UserModule(this.f['username'].value, this.f['password'].value);
 
     this.authService.login( this.user ).subscribe({
       next: (result: any) => {
         if (result['status'] === 'success') {
           this.user.setId(result ['data'] [0]._id);
           this.authService.setCurrentUser(this.user);
           this.router.navigate(['/home']);
         } else {
           this.error = 'Wrong username password';
         } 
       },
       error: (e: any) => {
         this.error = e;
         this.loading = false;
       },
       complete: () => console.info('complete')
     });    
  }

}
