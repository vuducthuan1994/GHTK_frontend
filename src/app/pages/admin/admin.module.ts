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

@NgModule({
    declarations: [
      UserManagementComponent,
      AdminComponent,
      HeaderComponent,
      NavBarComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      CommonModule,
      RouterModule,
      MyProfileModule,
      OrderModule
    ],
    exports: [
        AdminComponent
    ],
    providers: [ DatePipe]
    
  })
  export class AdminModule { }