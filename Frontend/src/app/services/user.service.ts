import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrentUser } from '../model/current-user';
import { ApiService } from './api.service';

@Injectable()
export class UserService {
  constructor(private apiService: ApiService) {}

  private currentUserSource = new BehaviorSubject(new CurrentUser());

  currentUser = this.currentUserSource.asObservable();

  updateCurrentUser(currentUser: CurrentUser) {
    this.currentUserSource.next(currentUser);
  }

  getCurrentUserdetails() {
    return this.apiService.getRequest('user/me');
  }

  postRequest(path: string, data: any) {
    return this.apiService.postRequest(path, data);
  }

  getCurrentOrganizationDetails() {
    return this.apiService.getRequest('organization');
  }
}
