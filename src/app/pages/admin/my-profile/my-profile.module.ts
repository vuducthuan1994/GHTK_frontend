import { NgModule } from '@angular/core';
import { MyProfileComponent } from './detail-profile/my-profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyProFileService } from './my-profile.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
@NgModule({
    declarations: [
        MyProfileComponent,
        EditProfileComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
    ],
    exports: [
        MyProfileComponent,EditProfileComponent
    ],
    providers: [MyProFileService],

})
export class MyProfileModule { }