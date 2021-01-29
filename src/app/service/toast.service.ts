import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
declare var swal: any;
@Injectable()

export class ToastService {
    constructor(public router: Router) { }

    show(type: String, message: String) {
        const toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            padding: '2em'
        });
        toast({
            type: type,
            title: message,
            padding: '2em',
        })
    }
    confirm(title, callback,type?,buttonTrue?,text?) {
        swal({
            title: title,
            text: text ? text : 'Bạn chắc chắn chứ !',
            type:  type ? type : 'warning',
            showCancelButton: true,
            confirmButtonText: buttonTrue ? buttonTrue : 'OK' ,
            padding: '2em'
        }).then(function (result) {
            if (result.value) {
                callback(result.value);
            }
        })
    }
}