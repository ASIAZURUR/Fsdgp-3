import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeModule } from './components/home/home.module';
import { LoaderComponent } from './components/loader/loader.component';
import { LoginComponent } from './components/login/login.component';
import { UserCreatComponent } from './components/users/create/user-create.component';
import { UserEditComponent } from './components/users/edit/user-edit.component';
import { UserListComponent } from './components/users/list/user-list.component';
import { ValidationComponent } from './components/validation/validation.component';
// import { AllowedRolesDirectiveModule } from './directive/allowed-roles.directive';
import { BackButtonDirectiveModule } from './directive/back-button.directive';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { AuthStorageService } from './services/auth.storage.service';
import { ValidationService } from './services/validation.service';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    LoginComponent,
    ValidationComponent,
    DashboardComponent,
    UserListComponent,
    UserEditComponent,
    UserCreatComponent,
    RegisterComponent,
  ],

  imports: [
    BackButtonDirectiveModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HomeModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatListModule,
    MatNativeDateModule,
    MatRadioModule,
    MatInputModule,
    MatExpansionModule,
    MatBadgeModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'success',
      cancelButtonType: 'secondary', // set defaults here
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    AuthGuard,
    ApiService,
    ValidationService,
    AuthService,
    AuthStorageService,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
