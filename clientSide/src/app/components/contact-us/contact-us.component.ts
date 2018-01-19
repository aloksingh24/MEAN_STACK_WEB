import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  userForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
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
        Validators.email
      ])],
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ])],
      phone: ['', Validators.compose([
        Validators.required
      ])],
      inquiry: ['',Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ])]
    });
  }

  onSubmit(){
    console.log("Alok value of email "+ this.userForm.get('email').value);
    console.log("Alok value of name "+ this.userForm.get('name').value);
    console.log("Alok value of phone "+ this.userForm.get('phone').value);
    console.log("Alok value of inquiry "+ this.userForm.get('inquiry').value);
    const userData = {
      email: this.userForm.get('email').value,
      name: this.userForm.get('name').value,
      phone: this.userForm.get('phone').value,
      inquiry: this.userForm.get('inquiry').value
    }
    // this.authService.contactus(userData).subscribe(data => {
    //   if(!data.success){
    //       console.log(data.message);
    //   } else {
    //       console.log(data.message);
    //   }
    // });
  }
}

  //Testing
  /** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }
