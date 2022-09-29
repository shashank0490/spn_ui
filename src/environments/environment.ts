/*
* @Author: Vivek Singh
* @Date: 22-07-2022
* @Last Modified by: (Email)
* @Last Modified time:
*/

import { HttpHeaders } from "@angular/common/http";

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
let secretKey ="TRIBAL-MOTA!@$1234";
let baseUrl: string = '';
let fileBaseUrl: string = '';
let currentURL = window.location.hostname;
// let captchaSecretKet = '6Lf1sYEbAAAAAKeJ1UnB9sEoiKw8KHvvY3c6DJS7';
let captchaSecretKet = '6Le51Q0iAAAAAAh6ht5zRpKE8IDojX4F9Aw8dGUB';
// mahindra captcha key need to chaneg it
if (currentURL == 'localhost') {
  baseUrl = 'https://stgspnapi.dhwaniris.in/web/api/';
  fileBaseUrl = 'https://stgspnapi.dhwaniris.in';
} else if (currentURL == 'uatspn.dhwaniris.in') {
  baseUrl = 'https://stgspnapi.dhwaniris.in/web/api/';
} else if (currentURL == 'stgspn.dhwaniris.in') {
  baseUrl = 'https://stgspnapi.dhwaniris.in/web/api/';
}

export const environment = {
  production: false,
  baseUrl: baseUrl,
  fileBaseUrl: fileBaseUrl,
  secretKey:secretKey,
  captchaSecretKet:captchaSecretKet
};
export const sandBoxApi= 'https://api.sandbox.co.in'
export const panHeaders = new HttpHeaders()
.set('x-api-key', 'key_live_ogoJbtsjKgwElQwwe7luecNzkIYDBnhV')
.set('x-api-secret', 'secret_live_cTsjNhPstXASP22KZzXeyOtksxkjuhX5')
// .set('x-api-version', '1.0')
.set('x-api-version', '1.0')
.set('x-api-version', '1.0')
.set('Authorization', 'eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKemQyRndibWxzUUdSb2QyRnVhWEpwY3k1amIyMGlMQ0poY0dsZmEyVjVJam9pYTJWNVgyeHBkbVZmYjJkdlNtSjBjMnBMWjNkRmJGRjNkMlUzYkhWbFkwNTZhMGxaUkVKdWFGWWlMQ0pwYzNNaU9pSmhjR2t1YzJGdVpHSnZlQzVqYnk1cGJpSXNJbVY0Y0NJNk1UWTVNRE0xTURNeU9Td2lhVzUwWlc1MElqb2lVa1ZHVWtWVFNGOVVUMHRGVGlJc0ltbGhkQ0k2TVRZMU9EZ3hORE15T1gwLi1nSGx4a3B0UGxwbXB2bE5POVA2WkRtNk1FZWFVMldzR19BbEdWcWwyYlpfdk03S2Q4VFY2Z3F6cWNTQTJxS0FTeXlmaW5PZ1VCdmY0d2xFMjFvT0xBIiwic3ViIjoic3dhcG5pbEBkaHdhbmlyaXMuY29tIiwiYXBpX2tleSI6ImtleV9saXZlX29nb0pidHNqS2d3RWxRd3dlN2x1ZWNOemtJWURCbmhWIiwiaXNzIjoiYXBpLnNhbmRib3guY28uaW4iLCJleHAiOjE2NTg5MDA3MjksImludGVudCI6IkFDQ0VTU19UT0tFTiIsImlhdCI6MTY1ODgxNDMyOX0.LwQ9H9UbPRvle_NIvWnpo6djw2BaSdVro3zq8Gu5krJBRmgjiis9pn_GOc5aMI80mhi2bS_GXcxatmaIndAZHQ')
.set("Access-Control-Allow-Origin", "*")
.set("Access-Control-Allow-Credentials", "true")
.set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
