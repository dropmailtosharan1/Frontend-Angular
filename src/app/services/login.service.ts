import { Injectable } from '@angular/core';
import { UserModule } from '../model/user/user.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient ) { }

  login(user: UserModule) {
    return this.http.post('/api/user/login', {
      username : user.getUserName(),
      password : user.getPassword()
    });
  }
 
  logout() {}
}
