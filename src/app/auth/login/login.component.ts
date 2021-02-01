import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastService } from '../../service/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../common/loading/loading.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ]
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isShowPassWord = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
     private authService: AuthService,
      private toastService: ToastService, 
      private router: Router,
      private loadingService: LoadingService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      account: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() { return this.loginForm.controls; }

  onLogin() {
    this.submitted = true;

    // stop here if form is invalid
    if (!this.loginForm.valid) {
      return;
    }
    const user = { account: this.loginForm.value.account, password: this.loginForm.value.password };
    this.authService.login(user).subscribe(data => {
      this.loadingService.show();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.currentUser));
      }
      console.log(localStorage.getItem('currentUser'));
      this.loadingService.hide();
      this.toastService.show('success', 'Đăng nhập thành công !');
      // this.router.navigateByUrl('/admin')
      this.router.navigate(["/admin/order"]);
    
    }, err => {
      this.loadingService.hide();
      this.toastService.show('error', err.error.message);
    });

  }
}

