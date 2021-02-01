import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order/order.service';
declare var require: any;
const moment = require('moment');
@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.css'],
  providers: [OrderService]
})

export class OrderManagerComponent implements OnInit {


  constructor(private orderService : OrderService) { }


  public daterange: any = {
    start: moment().startOf('day'),
    end: moment().endOf('day')
  };
  orders = [];
  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
    locale: { format: 'DD/MM/YYYY HH:mm:ss' },
    timePicker: true,
    timePicker24Hour: true,
    timePickerSeconds: true,
    alwaysShowCalendars: false,
    maxDate: moment().endOf('day').toDate()
  };

  public selectedDate(value: any, datepicker?: any) {
    datepicker.start = value.start;
    datepicker.end = value.end;
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }

 
  clickBtnSearch(){
    const filterOption = {
      gte: this.daterange.start.valueOf(),
      lte: this.daterange.end.valueOf()
    };
    this.orderService.getOrders(filterOption).subscribe(data => {
      if(data.success) {
        console.log(data);
        this.orders = data.data;      }
    })
  }

  checkOrder(order) {
    let options  = {label : order.orderInfomation.label}
    this.orderService.checkOrder(options).subscribe(data =>{
      console.log(data);
    })
  }

  ngOnInit() {
  }

}
