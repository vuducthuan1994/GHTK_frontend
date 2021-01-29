import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  loading : boolean = false;
  constructor(public loadingService : LoadingService) { }

  ngOnInit() {
  }

}
