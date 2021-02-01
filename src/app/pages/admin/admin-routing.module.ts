import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminComponent } from './admin.component';
import { LoginRedirect } from '../../auth/login-redirect.service';
import { MyProfileComponent } from './my-profile/detail-profile/my-profile.component';
import { EditProfileComponent } from './my-profile/edit-profile/edit-profile.component';
import { OrderComponent } from './order/order.component';
import { OrderManagerComponent } from './order-manager/order-manager.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate :[LoginRedirect],
    children: [
      {
        path: 'order',
        component: OrderComponent,
        pathMatch: 'full',
        canActivate :[LoginRedirect]
      },
      {
        path: 'user-management',
        component: UserManagementComponent,
        pathMatch: 'full',
        canActivate :[LoginRedirect]
      },
      {
        path: 'order-management',
        component: OrderManagerComponent,
        pathMatch: 'full',
        canActivate :[LoginRedirect]
      },
      {
        path: 'my-profile',
        component: MyProfileComponent,
        canActivate :[LoginRedirect]
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
        pathMatch: 'full',
        canActivate :[LoginRedirect]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LoginRedirect]
})
export class AdminRoutingModule { }