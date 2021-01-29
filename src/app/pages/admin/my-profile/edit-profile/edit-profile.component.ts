import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { MyProFileService } from '../my-profile.service';
import { LoadingService } from '../../../../common/loading/loading.service';
import { SkillItem } from '../model/skill.model';
import { ToastService } from '../../../../service/toast.service';
import { timeout } from 'q';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  listDaysOfMonth: Number[] = [];
  listYears: Number[] = [];
  listMongthsOfYear  = ['Jan', 'Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  platFormTitle: string = null;
  platFormDescripton: string = null;

  newSkill: SkillItem = new SkillItem({ name: null, point: 0 });
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
    about_me: '',
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
  dateofBirth : any = {
    year : 2020,
    month : 'Jan',
    day: 5,
  }

  constructor(private authServive: AuthService,
    private myProFileService: MyProFileService,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) { }

  initData() {
    for (let i = 1; i < 32; i++) {
      this.listDaysOfMonth.push(i);
    }
    for (let i = 1900; i < 2021; i++) {
      this.listYears.push(i);
    }
  }

  ngOnInit() {
    this.initData();
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

  mappingDataDateOfBirthBeforeUpdate(dob : any) {
    let time = new Date();
    console.log(time)
    time.setFullYear(dob.year);
    time.setDate(dob.day);
    time.setMonth(this.listMongthsOfYear.indexOf(dob.month));
    console.log(time);
    return time;
  }
  mappingDataUserDetail() {
    const dataLogin = this.authServive.getCurrentUser();
    for (const key of Object.keys(this.userDetail)) {
      if (dataLogin[key]) {
        this.userDetail[key] = dataLogin[key];
      }
    }
  }
  checkSkillExistence(skillLabel: String): boolean {
    return this.userDetail.skills.some(s => s.name === skillLabel);
  }

  addSkill(skill: SkillItem) {
    if (skill.name) {
      if (!this.checkSkillExistence(skill.name)) {

        const cloneSkill = Object.assign({}, skill);
        this.userDetail.skills.push(cloneSkill);
        this.newSkill.name = null;
      } else {
        this.toastService.show('error', 'Skill is exits !');

      }
    } else {
      this.toastService.show('error', 'Fill SKill Now !');

    }
  }
  removeSkill(skill: SkillItem) {
    const indexRemove = this.userDetail.skills.findIndex(item => item.name === skill.name );
    this.userDetail.skills.splice(indexRemove,1);
    console.log(indexRemove);
  }

  updateUser() {
    this.loadingService.show();
    this.userDetail.dob = this.mappingDataDateOfBirthBeforeUpdate(this.dateofBirth);
    this.myProFileService.updateUser(this.userDetail._id, this.userDetail).subscribe(data => {
      this.loadingService.hide();
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(data));
      $.blockUI({
        message: $('.blockui-growl-message'), 
        fadeIn: 700, 
        fadeOut: 700, 
        timeout: 3000, //unblock after 3 seconds
        showOverlay: false, 
        centerY: false, 
        css: { 
            width: '250px',
            backgroundColor: 'transparent',
            top: '80px',
            left: 'auto',
            right: '15px',
            border: 0,
            opacity: .95,
            zIndex: 1200,
        } 
    }); 
    })
  }
} 
