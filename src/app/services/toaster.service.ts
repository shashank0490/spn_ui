import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  defaultConfig = {
    // theme: 'snackbar',
    // position: 'bottom-center',
    autoClose: false,
    dismissible: false,
    icon: '❎',
    duration: 3000,
    id: 'pause',
    style: {
      border: '1px solid #fff',
      padding: '16px',
      color: '#fff',
    },
    iconTheme: {
      primary: '#713200',
      secondary: '#FFFAEE',
    },
  }
  constructor(private toast:HotToastService ) { }

  showNotification(type:string,msg:string ){
      if(type=='error'){
        this.toast.error(msg, {id: 'pause'});
      }
      if(type=='info'){
        this.toast.info(msg);
      }
      if(type=='warning'){
        this.toast.warning(msg);
      }
      if(type=='success'){
        this.toast.success(msg);
      }
      if(type=='loading'){
        this.toast.loading(msg);
      }
  }
  dismiss(){
    this.toast.close()
  }
}
