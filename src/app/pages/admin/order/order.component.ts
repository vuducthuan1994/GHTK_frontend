import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { ToastService } from '../../../service/toast.service';
import { LoadingService } from '../../../common/loading/loading.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private orderService: OrderService, 
    private toastService: ToastService,
    private loadingService: LoadingService
    ) { }
  product = {
    name: null,
    weight: null,
    quantity: 1,
    product_code: null,
    price: 0
  }
  products =  [];

  provinces = [];
  pick_province_selected = [];
  order_province_selected = [];

  pick_districts = [];
  pick_district_slected = [];
  order_districts = [];
  order_district_slected = [];


  pick_wards = [];
  pick_ward_selected = [];
  order_wards = [];
  order_ward_selected = [];

 
  order = {
    weight : 0,
    total_money : 0,
    pick_name: 'Lê Thị Dung',
    pick_tel: '0356125026',
    pick_money: 0,
    value:0,
    pick_address: 'Tầng 4, Tập thể B2 Giảng Võ',
    pick_email: 'dung.ptit4@gmail.com',
    fee_ship : 0,
    name: null,
    tel: null,
    address: null,
    street: null,
    email: 'dung.ptit4@gmail.com',
    note: '',
    transport: 'road',
    pick_option : 'cod',
    hamlet: 'Khác',
    is_freeship : 0,
    use_return_address: 0,
    fb_link : null,
    deliver_work_shift: 2
  }

  dropdownProvinceSettings = {};
  dropdowndistrictSettings = {};
  dropdownWardSettings = {};
  ngOnInit() {
    this.orderService.getProvinces().subscribe(data => {
      this.mappingDataProvinces(data['results']);
    })

    this.provinces = [];
    this.dropdownProvinceSettings = {
      singleSelection: true,
      text: "Tỉnh/Thành phố",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "col-12 text-info bg-white"
    };
    this.dropdowndistrictSettings = JSON.parse(JSON.stringify(this.dropdownProvinceSettings));
    this.dropdownWardSettings = JSON.parse(JSON.stringify(this.dropdownProvinceSettings));
    this.dropdowndistrictSettings['text'] = 'Quận/Huyện';
    this.dropdownWardSettings['text'] = 'Phường/Xã';
    this.pick_province_selected = [
      {
        id: '01',
        itemName: 'Thành phố Hà Nội',
        province_type: "Thành phố Trung ương"
      }
    ];
    this.pick_district_slected = [
      { id: "001", itemName: "Quận Ba Đình", province_type: "Quận" }
    ];
    this.pick_ward_selected = [
      { id: "00031", itemName: "Phường Giảng Võ" }
    ]
  }

  resetOrder () {
    
  this.order = {
    weight : 0,
    fee_ship: 0,
    total_money: 0,
    pick_name: 'Lê Thị Dung',
    pick_tel: '0356125026',
    pick_money: 0,
    pick_address: 'Tầng 4, Tập thể B2 Giảng Võ',
    pick_email: 'dung.ptit4@gmail.com',
    value: 0,
    name: null,
    tel: null,
    address: null,
    street: null,
    email: 'dung.ptit4@gmail.com',
    note: '',
    transport: 'road',
    pick_option : 'cod',
    hamlet: 'Khác',
    is_freeship : 0,
    use_return_address: 0,
    fb_link : null,
    deliver_work_shift: 2
  }
  }

  mappingDataProvinces(data) {
    data.forEach(item => {
      let province = {
        id: item.province_id,
        itemName: item.province_name,
        province_type: item.province_type
      };
      this.provinces.push(province);
    });
  }
  addProduct() {
    if (this.product.name && this.product.product_code && this.product.quantity && this.product.weight) {
      const newProduct = JSON.parse(JSON.stringify(this.product));
      this.products.push(newProduct);
      this.order.pick_money += newProduct.price * newProduct.quantity;
      this.order.weight+=newProduct.weight;
      this.order.value += newProduct.price * newProduct.quantity;
      this.getFee();
    } else {
      this.toastService.show('error', 'Điền thiếu thông tin sản phẩm');
    }
  }
  deleteProduct(_index) {
    if (_index>=0) {
      this.order.pick_money -= this.products[_index].price * this.products[_index].quantity;
      this.order.value -= this.products[_index].price * this.products[_index].quantity;
      this.order.weight-= this.products[_index].weight;
      this.products.splice(_index, 1);
      this.getFee();
    }
  }
  mappingDataDistrict(data, type = 'pick') {
    if (type == 'pick') {
      this.pick_districts = [];
      this.pick_district_slected = [];
      this.pick_wards = [];
      this.pick_ward_selected = [];
    }
    if (type == 'order') {
      this.order_districts = [];
      this.order_district_slected = [];
      this.order_wards = [];
      this.order_ward_selected = [];
    }
    data.forEach(item => {
      let districItem = {
        id: item.district_id,
        itemName: item.district_name,
        province_type: item.district_type
      };
      if (type == 'pick') {
        this.pick_districts.push(districItem);
      }
      if (type == 'order') {
        this.order_districts.push(districItem);
      }
    });
  }

  mappingDataWard(data, type = 'pick') {
    if (type == 'pick') {
      this.pick_wards = [];
    }
    if (type == 'order') {
      this.order_wards = [];
    }

    data.forEach(item => {
      let wardItem = {
        id: item.ward_id,
        itemName: item.ward_name,
      };
      if (type == 'pick') {
        this.pick_wards.push(wardItem);
      }
      if (type == 'order') {
        this.order_wards.push(wardItem);
      }
    });
  }

  onProvinceSelect(item: any, type) {
    this.getFee();
    this.orderService.getDistrict(item.id).subscribe(data => {
      this.mappingDataDistrict(data['results'], type);
    });
  }


  onDistrictSelect(item: any, type) {
    this.getFee();
    this.orderService.getWard(item.id).subscribe(data => {
      this.mappingDataWard(data['results'], type);
    });
  }

  onIsFreeShipChange(value) {
    if(value == 0) {
      this.order.total_money = this.order.pick_money +  this.order.fee_ship;
    }
    if(value == 1) {
      this.order.total_money = this.order.pick_money;
    }
  }

  getFee() {
    if(this.order_district_slected.length > 0 &&
        this.order_province_selected.length > 0 &&
        this.pick_district_slected.length >0 &&
        this.pick_province_selected.length > 0 &&
        this.order.weight > 0
      ) {
     
        const obj= {
          pick_province : this.pick_province_selected[0].itemName,
          pick_district : this.pick_district_slected[0].itemName,
          weight :this.order.weight * 1000,
          province: this.order_province_selected[0].itemName,
          district : this.order_district_slected[0].itemName
        }
        this.orderService.getFee(obj).subscribe( data =>{
          this.order.fee_ship = data.fee.fee;
          if(this.order.is_freeship == 0) {
            this.order.total_money = this.order.pick_money +  this.order.fee_ship;
          }
        })
      }
  }

  sendOrder() {
    console.log(this.order);
    if (this.pick_ward_selected.length > 0 && this.order_province_selected.length > 0 && this.order_district_slected.length > 0 && (this.order_ward_selected.length > 0 || this.order.street)
      && this.order.email && this.order.name && this.products.length > 0 && this.order.tel && this.order.address
    ) {
      this.order['pick_province'] = this.pick_province_selected[0].itemName;
      this.order['pick_district'] = this.pick_district_slected[0].itemName;
      this.order['pick_ward'] = this.pick_ward_selected[0].itemName;

      this.order['province'] = this.order_province_selected[0].itemName;
      this.order['district'] = this.order_district_slected[0].itemName;
      if( this.order_ward_selected.length > 0 ) {
        this.order['ward'] = this.order_ward_selected[0].itemName;
      }
      let orderInfomation = {
        products : this.products,
        order: this.order
      }
      this.loadingService.show();
      this.orderService.sendOrder(orderInfomation).subscribe(data => {
        if(data.success) {
          this.resetOrder();
          this.toastService.show('success', 'Đăng đơn hàng thành công') 
        } else {
          this.toastService.show('error', `${data.message}`)
        }
        this.loadingService.hide();

      });
    } else {
      this.toastService.show('error', 'Điền thiếu thông tin đơn hàng')
    }

  }


  OnItemDeSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
}
