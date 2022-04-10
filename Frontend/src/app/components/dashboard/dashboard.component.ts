import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';
import { AuthStorageService } from '../../services/auth.storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  username: string;
  title = environment.projectTitle;
  constructor(private authService: AuthService,
    private authStorageService: AuthStorageService, private router: Router) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  /*
  function to get the current logged in user/user details
  */
  getCurrentUser() {
    this.username = "JK"
    // this.authService.getCurrentUser().subscribe((res: any) => {
    //   this.username = res.data.first_name + " " + res.data.last_name;
    // })
  }
  /*
  function to logout( clears session token also redirtedcts to login)
  */
  logout() {
    // this.authService.logout().subscribe((res: any) => {
    // })
    this.authStorageService.removeToken();
    this.router.navigate(['login']);
  }

}
