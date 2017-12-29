import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  domain: "http://localhost:8080";
  constructor(
    private http: Http
  ) { }

  registerUser(user){
    return this.http.post('http://localhost:8080/authentication/register',user).map(res => res.json());
  }

  checkEmail(email){
    return this.http.get('http://localhost:8080/authentication/checkEmail/' + email).map(res => res.json());
  }

  checkUserName(username){
    return this.http.get('http://localhost:8080/authentication/checkUserName/' + username).map(res => res.json());
  }

}
