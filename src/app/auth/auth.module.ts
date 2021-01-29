import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { LoginRedirect } from './login-redirect.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../service/toast.service';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingService } from '../common/loading/loading.service';

@NgModule({
    declarations: [LoginComponent , RegisterComponent],
    imports: [BrowserModule, CommonModule,FormsModule, CommonModule, ReactiveFormsModule],
    exports: [],
    providers: [AuthService,LoginRedirect,ToastService,LoadingService]
  })
  export class AuthModule { }