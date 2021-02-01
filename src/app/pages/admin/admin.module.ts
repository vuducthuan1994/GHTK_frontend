import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserManagementComponent } from './user-management/user-management.component';
import { BrowserModule } from '@angular/platform-browser';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderComponent } from './layouts/header/header.component';
import { NavBarComponent } from './layouts/nav-bar/nav-bar.component';
import { MyProfileModule } from './my-profile/my-profile.module';
import { OrderModule } from './order/order.module';
import { OrderManagerComponent } from './order-manager/order-manager.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { OrderService } from './order/order.service';

@NgModule({
  declarations: [
    UserManagementComponent,
    OrderManagerComponent,
    AdminComponent,
    HeaderComponent,
    NavBarComponent
  ],
  imports: [
    Daterangepicker,
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule,
    MyProfileModule,
    OrderModule  ],
  exports: [
    AdminComponent
  ],
  providers: [DatePipe,OrderService]

})
export class AdminModule { }