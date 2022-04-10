import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthStorageService } from '../../services/auth.storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: string;
  userRole: string;
  toggle: boolean = false;
  isBodyExpanded: boolean  = false;
  @Output() menuBtnClickedEvent = new EventEmitter();
  constructor(private authService: AuthService,
    private authStorageService: AuthStorageService, private router: Router) { }


  ngOnInit() {
    this.getCurrentUser();
  }

  /*
  function to get the current logged in user/user details
  */
  getCurrentUser() {
    let user = this.authService.getCurrentUser();
    this.username = user?.data.first_name + ' ' + user?.data.last_name;
    if (user?.data.user_type == 1) {
      this.userRole = "Administrator";
    }
  }

  /*
  function to logout( clears session token also redirtedcts to login)
  */
  logout() {
    // this.authService.logout().subscribe((res: any) => {
    // })
    this.authStorageService.removeToken();
    this.router.navigate(['/login']);
  }
  toggleMinimize() {
    this.toggle = !this.toggle;
  }

  toogleMenu(){
    this.isBodyExpanded = !this.isBodyExpanded;
    this.menuBtnClickedEvent.emit(this.isBodyExpanded);
  }


}
