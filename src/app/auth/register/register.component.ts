import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastService } from '../../service/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  isShowPassWord = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toastService: ToastService
    , private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      account: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', []],
      isTosRead: [false, Validators.pattern('true')]
    }, { validator: this.checkPasswords.bind(this) });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  checkPasswords(formGroup: FormGroup) { // here we have the 'passwords' group
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  onSubmit() {
    console.log(this.registerForm);
    this.submitted = true;

    // stop here if form is invalid
    if (!this.registerForm.valid) {
      return;
    }
    this.authService.register(this.registerForm.value).subscribe(data => {
      console.log(data);
      this.toastService.show('success', 'Đăng Ký Thành Công, Vui lòng liên hệ admin');
      const newUser = { account: this.registerForm.value.account, password: this.registerForm.value.password };
      this.authService.login(newUser).subscribe(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('currentUser', JSON.stringify(data.currentUser));
          this.router.navigateByUrl('/admin')
        }
      });
     
    }, (data) => {
        if (data.status = 422) {
          console.log(data);
          this.toastService.show('error', data.error.message)

        }
      })
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }
}
