import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { AuthStorageService } from './auth.storage.service';

@Injectable()
export class AuthService {
  username: string;
  public user = new BehaviorSubject(null);
  constructor(private apiService: ApiService, private authStorageService: AuthStorageService, private router: Router, private httpClient: HttpClient) {
  }
  register(data:any){
    // const email=data.value.email;
    // const password = data.value.password;
    // const firstName=data.value.firstName;
    // const lastName=data.value.lastName;
    // const phone=data.value.phone;
    data={email:data.value.email,
          password:data.value.password,
          firstName:data.value.firstName,
          lastName:data.value.lastName,
          phone:data.value.phone}
    return this.apiService.postRequest("register",data,false,false)

  }

  login(data: any) {
    // const email = data.value.email;
    // const password = data.value.password;
    data = {
      email: data.value.email,
      password: data.value.password
    }
    return this.apiService.postRequest("login", data, false, false);
  }

  isLoggedIn() {
    console.log(!!this.authStorageService.getToken())
    return !!this.authStorageService.getToken();
  }

  setCurrentUser() {
    const promise = new Promise((resolve, reject) => {
      this.apiService.getRequest('customer/me',true,false).subscribe(
        (res) => {
          if (res) {  
            this.user.next(res);
            resolve(true);
          } else {
            reject(false)
          }
        },
        (err) => {
          reject(false)
        }
      );
    });
    return promise;
  }

  getCurrentUser() {
    let currentUser = this.user.getValue();
    return currentUser;
  }

  getCurrentUserRole() {
    let currentUser = this.user.getValue();
    if(currentUser) {
      return currentUser['role_details'].role;
    }
    return false;
  }


  refreshToken() {
    return this.apiService.postRequest('refresh-token', true, true);
  }

  isUserPermitted(revokedRoles) {
    if (revokedRoles) {  
      let currentUserRole = this.getCurrentUserRole();
      console.log("isUserPermitted",currentUserRole)
      if (currentUserRole) {
        return revokedRoles.includes(currentUserRole) ? false : true;
      } else {
        return false;
      }
    } 
    return false;
  }

  allStates() {
    return this.apiService.getRequest('states', false, false);
  }
}
