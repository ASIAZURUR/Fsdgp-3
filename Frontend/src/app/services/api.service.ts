import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable()
export class ApiService {
  apiBaseUrl = environment.baseUrl;
  httpWithoutInterceptor: HttpClient;
  public isLoading = new BehaviorSubject(false);
  public finacialAidCount = new BehaviorSubject(0);
  constructor(
    private httpClient: HttpClient,
    private httpBackend: HttpBackend
  ) {
    this.httpWithoutInterceptor = new HttpClient(httpBackend);
  }

  getRequest(
    path: string,
    intercept: boolean = true,
    protectedPath: boolean = true
  ) {
    if (protectedPath) {
      path = this.apiBaseUrl + 'admin/' + path;
    } else {
      path = this.apiBaseUrl + path;
    }
    if (intercept) {
      return this.httpClient.get(path);
    } else {
      return this.httpWithoutInterceptor.get(path);
    }
  }

  postRequest(
    path: string,
    data: any,
    intercept: boolean = true,
    protectedPath: boolean = true
  ) {
    if (protectedPath) {
      path = this.apiBaseUrl + 'admin/' + path;
    } else {
      path = this.apiBaseUrl + 'customer/' + path;
    }
    if (intercept) {
      return this.httpClient.post(path, data);
    } else {
      return this.httpWithoutInterceptor.post(path, data);
    }
  }

  downloadRequest(
    path: string,
    data: any,
    intercept: boolean = true,
    protectedPath: boolean = true
  ) {
    if (protectedPath) {
      path = this.apiBaseUrl + 'admin/' + path;
    } else {
      path = this.apiBaseUrl + path;
    }
    if (intercept) {
      return this.httpClient.post(path, data, { responseType: 'blob' });
    } else {
      return this.httpWithoutInterceptor.post(path, data);
    }
  }
  deleteRequest(path: string, protectedPath: boolean = true) {
    if (protectedPath) {
      path = this.apiBaseUrl + 'admin/' + path;
    } else {
      path = this.apiBaseUrl + path;
    }
    return this.httpClient.delete(path);
  }

  putRequest(path: string, data: object, protectedPath: boolean = true) {
    if (protectedPath) {
      path = this.apiBaseUrl + 'admin/' + path;
    } else {
      path = this.apiBaseUrl + path;
    }
    return this.httpClient.put(path, data);
  }
}
