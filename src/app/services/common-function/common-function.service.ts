import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
declare var require: any
var Crypto = require("crypto-js");
import { BehaviorSubject } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { HotToastService } from '@ngneat/hot-toast';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionService {
  loaderSubscriber = new BehaviorSubject(false);
  isTokenAvailable = new BehaviorSubject(false);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  showFooter = new BehaviorSubject(true);
  showTopBar = new BehaviorSubject(true);
  loginDataUpdate = new BehaviorSubject(false)
  token = sessionStorage.getItem('token')?sessionStorage.getItem('token') : ''
  constructor(
    private router: Router,
    private toast:HotToastService,
    private httpClient: HttpClient
  ) { }
  getSecretKey(secratKey:string,password:string){
    let ciphertext = Crypto.HmacSHA256(password, secratKey).toString();
    return ciphertext;
  }

  navigateToSpecificPage(route: any) {
    this.router.navigate([route]);
  }

  getSelectedRoute() {
    console.log('getSelectedRoute',this.router)
    return this.router.url.split('/')[1];
  }

  sortDataSource(dataset: any, sortKey: string) {
    console.log('sortDataSource', dataset)
    let sortedData: any = [];
    sortedData = dataset.sort((a: any, b: any) => a[sortKey].toString().toLowerCase() > b[sortKey].toString().toLowerCase() ? 1 : -1);
    return sortedData;
  }

  // openSnackBar(errorMessage: any) {
  //   this._snackBar.open(errorMessage ? errorMessage : 'Server Error', '', {
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //     // duration: 100000,
  //   });
  // }

  customToast(errorMessage: any) {
    this.toast.warning(errorMessage ? errorMessage : 'Server Error' , {
      duration: 5000,
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
    });
  }

/**
 * "When the user focuses on an input field, we set the name and autocomplete attributes to a random
 * string."
 * 
 * The reason we do this is because Chrome will remember the name and autocomplete attributes of an
 * input field. If we don't change the name and autocomplete attributes, Chrome will remember the
 * values and fill in the input field with the remembered values.
 * 
 * The reason we use a random string is because we want to make sure that the name and autocomplete
 * attributes are unique. If we use the same name and autocomplete attributes for every input field,
 * Chrome will remember the values and fill in the input field with the remembered values.
 * 
 * @param {string} inputFieldId - The id of the input field you want to focus on.
 */
  onFocusEvent(inputFieldId: string) {
    let focusElement: HTMLElement | null = document.getElementById(inputFieldId);
    if (focusElement) {
      const randomString = Math.random().toString(36).slice(-6);
      focusElement.setAttribute('name', randomString);
      focusElement.setAttribute('autocomplete', randomString);
    }
  }
  uploadTos3(name: string, type: string) {
    name = name.replace(/–/g, '');
    return this.httpClient.post(
      `${environment.baseUrl}getS3Url`,
      [{ file_name: name,mime_type: type}]
    );
  }
  getImageUrl(url:any, img:any) {
    const fd = new FormData();
    fd.append('image', img, img['name'].replaceAll(/–/g, ''));
    return this.httpClient.put(url, img)
  }
  

}
