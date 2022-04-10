import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserCreatComponent } from '../users/create/user-create.component';
import { UserEditComponent } from '../users/edit/user-edit.component';
import { UserListComponent } from '../users/list/user-list.component';
import { HomeComponent } from './home.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
          { path: '', canActivate: [AuthGuard], component: DashboardComponent },

          { path: 'users', component: UserListComponent },
          { path: 'users/edit/:id', component: UserEditComponent },
          { path: 'users/create', component: UserCreatComponent },

          {
            path: '**',
            canActivate: [AuthGuard],
            component: DashboardComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
