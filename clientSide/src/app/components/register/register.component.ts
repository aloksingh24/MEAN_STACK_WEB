import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;
  userNameValid;
  userNameMessage;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
     this.createForm();
   }

  ngOnInit() {
  }
  createForm(){
    this.userForm=this.formBuilder.group({
      email: ['',Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      username: ['',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validateUserName
      ])],
      password: ['',Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25),
        this.validatePassword
      ])],
      confirm: ['',Validators.required]
    }, {validator: this.equalsConfirm('password', 'confirm')});
  }

  onSubmit(){
    this.processing=true;
    this.disableForm();
    const user = {
      email: this.userForm.get('email').value,
      username: this.userForm.get('username').value,
      password: this.userForm.get('password').value
    }
    this.authService.registerUser(user).subscribe(data => {
      if(!data.success){
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
          this.processing=false;
          this.enableForm();
      } else {
          this.messageClass = 'alert alert-success';
          this.message = data.message;
      }
    });
  }

  validateEmail(controls){
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(regExp.test(controls.value)){
        return null;
    } else {
      return {'validateEmail': true};
    }
  }

  validateUserName(controls){
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if(regExp.test(controls.value)){
      return null;
    } else {
      return {'validateUserName': true };
    }
  }

  validatePassword(controls){
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    if(regExp.test(controls.value)){
      return null;
    } else {
      return {'validatePassword': true};
    }
  }

  equalsConfirm(password, confirm ){
    return (group : FormGroup) => {
      if(group.controls[password].value === group.controls[confirm].value ){
        return null;
      } else {
        return {'equalsConfirm': true };
      }
    }
  }

  disableForm()
  {
    this.userForm.controls['username'].disable();
    this.userForm.controls['email'].disable();
    this.userForm.controls['password'].disable();
    this.userForm.controls['confirm'].disable();
  }

  enableForm()
  {
    this.userForm.controls['username'].enable();
    this.userForm.controls['email'].enable();
    this.userForm.controls['password'].enable();
    this.userForm.controls['confirm'].enable();
  }

  checkEmail(){
    const email = this.userForm.get('email').value;
    this.authService.checkEmail(email).subscribe(data => {
      if(!data.success){
          this.emailValid = false;
          this.emailMessage = data.message;
      } else {
        this.emailValid = true;
        this.emailMessage = data.message;
      }
    });
  }

  checkUserName(){
    const username = this.userForm.get('username').value;
    this.authService.checkEmail(username).subscribe(data => {
      if(!data.success){
          this.userNameValid = false;
          this.userNameMessage = data.message;
      } else {
        this.userNameValid = true;
        this.userNameMessage = data.message;
      }
    });
  }

}
