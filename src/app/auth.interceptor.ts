import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { CommonFunctionService } from './services/common-function/common-function.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ToasterService } from './services/toaster.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  getToken() {
    let token = sessionStorage.getItem('token');
    return token;
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private commonService:CommonFunctionService,private toastService: ToasterService) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let isToken = sessionStorage.getItem('token');
    if(isToken){
      request = request.clone({
        setHeaders: ({
          'x-access-token': `${this.getToken()}`
        })
      })
    }

    this.commonService.loaderSubscriber.next(true)
    return this.handler(next , request);
  }

  handler(next: HttpHandler, request: HttpRequest<unknown>) {
    return next.handle(request)
      .pipe(
        tap((event) => {
          if(event instanceof HttpResponse){
            this.commonService.loaderSubscriber.next(false)
          }
        },
          (error: HttpErrorResponse) => {
            this.commonService.loaderSubscriber.next(false)
            throw error;
          }
        ),
        catchError((error: HttpErrorResponse) => {
          this.openSnackBar(error)
          this.commonService.loaderSubscriber.next(false)
          return throwError(error);
        })
      )
  }
  openSnackBar(errorBody:any) {
    console.log('openSnackBar', errorBody)
    // let error = err?.error?.err ? err?.error?.err : err?.error?.message ? err.error.message : 'Server Error';
    let errorMsg: string = 'Server Error';
    if (Array.isArray(errorBody?.error?.err)) {
      errorMsg = errorBody?.error?.err[0]?.message ? errorBody?.error?.err[0]?.message : errorMsg;
    } else {
      errorMsg = errorBody?.error?.err?.message ? errorBody?.error?.err?.message : errorMsg;
    }
    console.log('error', errorMsg);
    this.toastService.showNotification('error', errorMsg);
  }

}
