import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';



@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreatComponent implements OnInit {
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
  status: any = true;

  constructor(public apiService: ApiService, public authService: AuthService, private activatedRoute: ActivatedRoute, private _flashMessagesService: FlashMessagesService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.userId = params['id'];

      this.userForm = this.fb.group({
        'firstName': ['', [Validators.required]],
        'lastName': ['', [Validators.required]],
        'email': ['', [Validators.required, Validators.email]],
        
        'password': ['', [Validators.required]],
        //'status': ['', '']
      });

    });

    // this.getMemberProfile();
  }

  
  

  onSubmit() {
    if (this.userForm.valid) {
      let postData = { 
        'first_name': this.firstName,
        'last_name': this.lastName,
        'email': this.email,
        'password': this.password,
        
      };
      this.apiService.postRequest('customer/', postData).subscribe(
        (response: any) => {
          if(response.success) {
            this._flashMessagesService.show('User created successfully.', { cssClass: 'alert-success', timeout: 8000 });
            this.router.navigate(['/users']);
          } else {
            this._flashMessagesService.show('User creation failed!', { cssClass: 'alert-danger' });
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
