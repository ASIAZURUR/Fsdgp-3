import { Injectable } from '@angular/core';

@Injectable()
export class AuthStorageService {

  constructor() {
  }
  /*
    function to get the current token
  */
  getToken() {
    return localStorage.getItem('auth_token');
  }

  getRefreshToken() {
    return localStorage.getItem('auth_refresh_token');
  }
  /*
  function to create a token
  */
  setToken(token: string ,remember?: boolean) {
    localStorage.setItem('auth_token', token);
    // localStorage.setItem('auth_refresh_token', refresh_token);
  }
  /*
  function to remove session token
  */
  removeToken() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_refresh_token');
  }
}
