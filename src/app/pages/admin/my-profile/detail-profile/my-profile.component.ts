import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { SkillItem } from '../model/skill.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  userDetail: any = {
    _id: '',
    experience: [],
    education: [],
    email: '',
    social: {
      facebook: '',
      github: '',
      linkedin: '',
      tweet: '',
    },
    aboutMe: '',
    job: '',
    fullName: '',
    dob: new Date(),
    workPlace: [],
    contact: {
      location: '',
      country: 'Viet Nam',
      address: '',
      phone: '',
      website: '',
    },
    skills: [SkillItem],
  };
  listMongthsOfYear  = ['Jan', 'Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  dateofBirth : any = {
    year : 2020,
    month : 'Jan',
    day: 5,
  }

  constructor(private authServive : AuthService) { }

  ngOnInit() {
    this.mappingDataUserDetail();
    this.initDoB();
  }
  
  initDoB () {
    const time = new Date(this.userDetail.dob);
    this.dateofBirth.year = time.getFullYear() ? time.getFullYear() : 2020 ;
    this.dateofBirth.day = time.getDate()? time.getDate() : 1;
    this.dateofBirth.month = time.getMonth()? this.listMongthsOfYear[time.getMonth()] : 'Jan';
    console.log(this.dateofBirth);
  }
  mappingDataUserDetail() {
    const dataLogin = this.authServive.getCurrentUser();
    for (const key of Object.keys(this.userDetail)) {
      if (dataLogin[key]) {
        this.userDetail[key] = dataLogin[key];
      }
    }
  }
}
