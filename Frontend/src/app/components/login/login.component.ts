import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { AuthStorageService } from '../../services/auth.storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage = null;

  constructor(private fb: FormBuilder,
    private router: Router, private authService: AuthService,
    private authStorageService: AuthStorageService,
    private flashMessagesService: FlashMessagesService) {
    if (this.authService.isLoggedIn()) {
      router.navigate(['']);
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm).subscribe(
        (response) => {
          console.log(response["success"])
          if (response["success"]) {
            this.authStorageService.setToken(response['tokens'])
            this.authService.setCurrentUser().then(result => {
              this.router.navigate(['dashboard']);
            }).catch(err => {

              this.flashMessagesService.show('Something went wrong!', { cssClass: 'alert-danger' });
              this.authStorageService.removeToken();
              this.router.navigate(['login']);
            })
          } else {
            this.flashMessagesService.show('Login failed!', { cssClass: 'alert-danger' });
            this.loginForm.markAsPristine();
            this.errorMessage = response["data"];
            this.flashMessagesService.show(this.errorMessage, { cssClass: 'alert-danger' });
          }
        },
        (error: any) => {
          this.flashMessagesService.show('Something went wrong!', { cssClass: 'alert-danger' });
        }
      );
    }
  }

  // function to logout( clears session token also redirtedcts to login)
  logout() {
    // this.authService.logout().subscribe((res: any) => {
    // });
    this.authStorageService.removeToken();
  }

}
