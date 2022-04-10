import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';



@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  userId: string;
  memberProfileData: any;


  popoverTitle: string = 'Are you sure?';
  popoverMessage: string = 'Are you really sure you want to do this?';

  userForm: FormGroup;
  allStates: any;
  errorMessage: any;
  firstName;
  lastName;
  email;
  password;
  

  constructor(public apiService: ApiService, public authService: AuthService, private activatedRoute: ActivatedRoute, private _flashMessagesService: FlashMessagesService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.userId = params['id'];

      this.userForm = this.fb.group({
        'firstName': ['', [Validators.required]],
        'lastName': ['', [Validators.required]],
        'email': ['', [Validators.required, Validators.email]],
        //'password':['',[Validators.required,Validators.minLength(10),Validators.maxLength(30)]],
        //'bio':['',[Validators.required]],
        
      });

    });

    this.getMemberProfile();
  }

  getMemberProfile() {
    this.apiService.getRequest('customer/' + this.userId).subscribe(
      (response: any) => {
        if(response.success) {
          this.memberProfileData = response.data;
          this.firstName = this.memberProfileData.first_name;
          this.lastName = this.memberProfileData.last_name;
          this.email = this.memberProfileData.email;
         // this.password = this.memberProfileData.password;
         
        }else {
        }
      },
      (err: any) => console.log(err),
    );
  }

  

  keyPress(event: any) {
    const pattern = /[0-9\-\.]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onSubmit() {
    console.log("submit");
    if (this.userForm.valid) {
      console.log("entered")
      let putData = { 
        'first_name': this.firstName,
        'last_name': this.lastName,
        'email': this.email,
        //'bio':this.bio,
        
        
      };
      this.apiService.putRequest('customer/' + this.userId, putData).subscribe(
        (response: any) => {
          if(response.success) {
            this._flashMessagesService.show('User edited successfully.', { cssClass: 'alert-success', timeout: 8000 });
            this.router.navigate(['/users']);
          }
         else {
            this._flashMessagesService.show('User edit failed!', { cssClass: 'alert-danger' });
            this.errorMessage = response.message;
          }
        },
        (error: any) => {
          this._flashMessagesService.show('Something went wrong!', { cssClass: 'alert-danger' });
        }
      );
    }
  }



}
