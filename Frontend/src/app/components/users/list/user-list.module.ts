import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list.component';
// import { VendorService } from '../vendor.service';
import { Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [SharedModule, NgbModule],
  declarations: [UserListComponent],
  exports: [UserListComponent],
  // providers : [VendorService]
})
export class UserListModule { }
