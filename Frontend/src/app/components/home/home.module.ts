import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { AllowedRolesDirectiveModule } from '../../directive/allowed-roles.directive';
import { HeaderModule } from '../header/header.module';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
@NgModule({
  imports: [HomeRoutingModule,FormsModule, ReactiveFormsModule,CommonModule, HeaderModule],
  declarations: [HomeComponent,SidebarComponent],
  exports: [HomeComponent, NgbModule, HeaderModule],
  providers: []
})
export class HomeModule { }
