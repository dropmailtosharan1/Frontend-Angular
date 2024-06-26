import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  posts: any[] = [];

  constructor( 
    public authService: AuthService,
    public router: Router,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  getPosts() {
    this.postService.getAllPost().subscribe({
      next: (result: any) => {
        this.posts = result['data'];
        console.log( this.posts );
      }
    });
  }

}
