import { Injectable } from '@angular/core';
import { UserModule } from '../model/user/user.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private http: HttpClient) { }

  login(user: UserModule) {
    return this.http.post('/api/user/login', {
      username : user.getUserName(),
      password : user.getPassword()
    }); 
  }
 
  logout() {
    localStorage.removeItem('currentUser');
  }

  setCurrentUser(user: UserModule) {
    const loggedInUser = {
      id: user.getId(),
      username: user.getUserName()
    };
    localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
  } 
 
  isAuthenticated() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
 
    if (currentUser) {
      return true;
    }
 
    return false;
  }
}
