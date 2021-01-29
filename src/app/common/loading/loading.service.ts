import { Injectable } from "@angular/core";

@Injectable()

export class LoadingService{
   public  loading = false;
    constructor() {}

    show() {
      this.loading = true;
    }

    hide() {
        this.loading = false;
    }

}