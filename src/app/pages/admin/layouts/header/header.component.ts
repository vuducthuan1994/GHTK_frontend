import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../../service/toast.service';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private toastService: ToastService , private authService: AuthService) {
   
   }
  currentUser : any;
  ngOnInit() {
    this.currentUser  = this.authService.getCurrentUser();
  }
  logout() {

        localStorage.clear();
        this.router.navigateByUrl('/');
  }
}
