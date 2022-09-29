import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  environment,
  panHeaders,
  sandBoxApi,
} from '../../../environments/environment';
import {
  REGISTRATION,
  LOGIN,
  Designation,
  OTP,
  ORGANISATION,
  USER,
  INVITE,
} from '../../services/apis-endpoint/api-endpoint';
import { of } from 'rxjs/internal/observable/of';
@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private httpService: HttpClient) {}

  createOrganisation(bodyContent: any) {
    //   return of({
    //     "timestamp": 1662449488,
    //     "success": true,
    //     "code": "SUCCESS",
    //     "message": "Form successfully created.",
    //     "data": {
    //         "id": 3,
    //         "txnId": "bc60fe5c-f659-48a3-be21-dc19c141a568",
    //         "name": "Test Ngo 1",
    //         "pancard": "TYVER6578P",
    //         "website": "www.google.com",
    //         "aboutInn": "This is about INN",
    //         "createdAt": "2022-09-06T07:28:09.717Z",
    //         "updatedAt": "2022-09-06T07:28:09.717Z",
    //         "isActive": "1",
    //         "entryFrom": "1"
    //     }
    // })
    return this.httpService.post(
      `${environment.baseUrl}${REGISTRATION.createOrgs}`,
      bodyContent
    );
  }
  createUser(bodyContent: any) {
    return this.httpService.post(
      `${environment.baseUrl}${REGISTRATION.userRegistration}`,
      bodyContent
    );
  }

  getAllOrganisation() {
    return this.httpService.get(
      `${environment.baseUrl}${REGISTRATION.getAllOrgs}`
    );
  }

  verifyPan(pan: any) {
    let formObject = new FormData();
    formObject.append('pan', pan);
    formObject.append('type', 'getpan');
    return this.httpService.get(
      `${sandBoxApi}/pans/${pan}?consent=y&reason=For KYC of User`,
      { headers: panHeaders }
    );
  }

  login(bodyContent: any) {
    return this.httpService.post(
      `${environment.baseUrl}${LOGIN.login}`,
      bodyContent
    );
  }

  registerUser(bodyContent: any) {
    return this.httpService.post(
      `${environment.baseUrl}${REGISTRATION.userRegistration}`,
      bodyContent
    );
  }
  loginUser(bodyContent: any) {
    return this.httpService.post(
      `${environment.baseUrl}${LOGIN.login}`,
      bodyContent
    );
  }
  logout() {
    return this.httpService.post(`${environment.baseUrl}${LOGIN.logout}`, {
      lat: '',
      lng: '',
    });
  }

  getDesignation() {
    return this.httpService.get(
      `${environment.baseUrl}${Designation.getDesignation}`
    );
  }
  getOrganisationByPan(pancard='') {
    return this.httpService.get(
      `${environment.baseUrl}${ORGANISATION.getOrgByPan}${pancard}`
    );
  }
  createDesignation(bodyContent: any) {
    return this.httpService.post(
      `${environment.baseUrl}${Designation.createDesignation}`,
      bodyContent
    );
  }
  sendOtp(bodyContent = {}) {
    // return this.httpService.get('https://run.mocky.io/v3/40f190b3-9a32-4fd7-9023-7a896ea0dd4d');
    return this.httpService.post(
      `${environment.baseUrl}${OTP.getOtp}`,
      bodyContent
    );
    //   return of({
    //     "timestamp": 1662711480,
    //     "success": true,
    //     "message": "Otp sent successfully.",
    //     "data": {
    //         "otpTxnId": "2f381cae-6fdc-4c34-84b8-cf8f07beac1d"
    //     }
    // })
  }
  forgotPassword(bodyContent = {}) {
    return this.httpService.post(
      `${environment.baseUrl}${LOGIN.forgotPassword}`,
      bodyContent
    );
  }

  otpVerify(bodyContent = {}) {
    return this.httpService.post(
      `${environment.baseUrl}${LOGIN.otpVerify}`,
      bodyContent
    );
  }

  resetPassword(bodyContent = {}) {
    return this.httpService.post(
      `${environment.baseUrl}${LOGIN.resetPassword}`,
      bodyContent
    );
  }
  logOut(bodyContent={}){
    return this.httpService.post(
      `${environment.baseUrl}${LOGIN.logout}`,
      bodyContent
    );
  }
  resetUserPasswordInitialize(bodyContent={}){
    return this.httpService.post(
      `${environment.baseUrl}${LOGIN.createNewPasswordInit}`,
      bodyContent
    );
  }
  resetUserPassword(bodyContent={}){
    return this.httpService.post(
      `${environment.baseUrl}${LOGIN.createNewPassword}`,
      bodyContent
    );
  }
  updateUser(bodyContent={}){
    return this.httpService.post(
      `${environment.baseUrl}${USER.updateUser}`,
      bodyContent
    );
  }
  getUser(id:any){
    return this.httpService.get(
      `${environment.baseUrl}${USER.getUser}id=${id}`);
  }
  getUserUpdateOtp(bodyContent={}){
    return this.httpService.post(
      `${environment.baseUrl}${USER.getOtp}`,
      bodyContent
    );
  }

  sendInvite(bodyContent={}){
    return this.httpService.post(
    `${environment.baseUrl}${INVITE.sendInvite}`,
      bodyContent
    );
  }
  getInvitedUsers(){
    return this.httpService.get(
    `${environment.baseUrl}${INVITE.getInvitedUser}`);
  }
  getOrganisationByTxnId(txnId=''){
    return this.httpService.get(
      `${environment.baseUrl}${ORGANISATION.getOrgByTxn}${txnId}`
    );
  }

}
