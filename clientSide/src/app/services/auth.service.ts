import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  domain: "http://localhost:8080";
  authToken;
  user;
  options;
  constructor(
    private http: Http
  ) { }

  createAuthenticationHeaders(){
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-type': 'application/json',
         'authorization': this.authToken
      })
    })
  }

  loadToken(){
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  registerUser(user){
    return this.http.post('http://localhost:8080/authentication/register',user).map(res => res.json());
  }

  checkEmail(email){
    return this.http.get('http://localhost:8080/authentication/checkEmail/' + email).map(res => res.json());
  }

  checkUserName(username){
    return this.http.get('http://localhost:8080/authentication/checkUserName/' + username).map(res => res.json());
  }

  login(user){
      return this.http.post('http://localhost:8080/authentication/login',user).map(res => res.json());
  }

  logout()
  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token,user){
    localStorage.setItem('token',token);
    localStorage.setItem('username',JSON.stringify(user) );
    this.authToken = token;
    this.user = user;
  }

  getProfile(){
    this.createAuthenticationHeaders();
    return this.http.get('http://localhost:8080/authentication/profile',this.options).map(res => res.json());
  }

  // contactus(){
  //   return this.http.post('http://localhost:8080/authentication/contactus',data).map(res => res.json());
  // }

}
