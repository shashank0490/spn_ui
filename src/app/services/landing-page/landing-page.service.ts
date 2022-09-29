import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { LANDING_PAGE } from "../../services/apis-endpoint/api-endpoint";
@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  constructor(
    private httpService: HttpClient
  ) { }

  getNavbarMenuList() {
    return this.httpService.get(`${environment.baseUrl}${LANDING_PAGE.getMenuList}`);
  }

  getSelectedNavbarContent(slug: string) {
    return this.httpService.get(`${environment.baseUrl}${LANDING_PAGE.getSelectedSlugContent}${slug}`);
  }
}
