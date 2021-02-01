import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
@NgModule({
    declarations: [
        OrderComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        AngularMultiSelectModule
    ],
    exports: [
        OrderComponent
    ],
    providers: [],

})
export class OrderModule { }