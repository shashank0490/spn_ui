import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';

@Injectable({
  providedIn: 'root'
})
export class NgoUserGuard implements CanActivate {

  constructor(
    private commonService: CommonFunctionService,
    private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot){
        let isAuthenticated = sessionStorage.getItem('token')?true :false ;
        if (!isAuthenticated) {
            this.router.navigate(['/login']);
        }
        return isAuthenticated;
    }
}
