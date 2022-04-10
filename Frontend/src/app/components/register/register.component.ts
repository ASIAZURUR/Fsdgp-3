import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthStorageService } from '../../services/auth.storage.service';
import { ThrowStmt } from '@angular/compiler';
import { MustMatch } from '../validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formSubmitted:boolean=true;
  registerForm: FormGroup;
  errorMessage=null;
  constructor(private fb: FormBuilder,
    private router: Router,
    private authStorageService: AuthStorageService, 
    private authService: AuthService,
    private apiService: ApiService,
    private flashMessagesService: FlashMessagesService) { 
      if (this.authService.isLoggedIn()) {
        router.navigate(['']);
      }
    }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      'firstName':['',[Validators.required]],
      'lastName':['',[Validators.required]],
      'phone':['',[Validators.required,Validators.pattern("^([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$")]],
      'email': ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      'password': ['', [Validators.required,Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)]],
      'confirmPassword': ['', [Validators.required,Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)]],
      'term_condition': [false,[Validators.requiredTrue]] 
    },
    {
      validator: MustMatch("password","confirmPassword")
    })
  }

  register(){
    this.formSubmitted = true;
    if(this.registerForm.valid){
    this.authService.register(this.registerForm).subscribe(
      (response) => {
        if (response["success"]) {
           this.errorMessage=response["data"];
          this.flashMessagesService.show(this.errorMessage, { cssClass: 'alert-danger' });
          this.router.navigate(['login']);
        }
        else{
          this.errorMessage=response["data"];
          this.flashMessagesService.show(this.errorMessage, { cssClass: 'alert-danger' });
        }
      }
    )}
    }
}
