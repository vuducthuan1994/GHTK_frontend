import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { ToastService } from '../../../service/toast.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private orderService: OrderService, private toastService: ToastService) { }
  product = {
    name: null,
    weight: null,
    quantity: null,
    product_code: null
  }

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
    products: [],
    pick_name: 'Lê Thị Dung',
    pick_tel: '0356125026',
    pick_money: null,
    pick_address: 'Tầng 4, Tập thể B2 Giảng Võ',
    pick_email: 'dung.ptit4@gmail.com',

    name: null,
    tel: null,
    address: null,
    street: null,
    email: 'dung.ptit4@gmail.com',
    note: '',
    use_return_address: 0
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
      this.toastService.show('success', 'Thêm thành công sản phẩm');
      this.order.products.push(this.product);
    } else {
      this.toastService.show('error', 'Điền thiếu thông tin sản phẩm');
    }
  }
  deleteProduct(_index) {
    this.order.products.splice(_index, 1);
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
    this.orderService.getDistrict(item.id).subscribe(data => {
      this.mappingDataDistrict(data['results'], type);
    });
  }


  onDistrictSelect(item: any, type) {
    this.orderService.getWard(item.id).subscribe(data => {
      this.mappingDataWard(data['results'], type);
    });
  }

  sendOrder() {
    if (this.order_province_selected.length > 0 && this.order_district_slected.length > 0 && (this.order_ward_selected.length > 0 && this.order.street)
      && this.order.email && this.order.name && this.order.products.length > 0 && this.order.tel && this.order.address
    ) {

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
