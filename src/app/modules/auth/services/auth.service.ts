import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.api;
  constructor(private readonly http: HttpClient, private readonly cookieService: CookieService) { }

  sendCredentials(email:string, password:string) : Observable<any>{
    const body = {email, password}
    return this.http.post(`${this.URL}/auth/login`,body)
              .pipe(
                tap((responseOk: any) => {
                  console.log('Sesion iniciada....  ')
                  const {tokenSession, data} = responseOk
                  this.cookieService.set('token', tokenSession, 4, '/')
                }),
                catchError((err, caught) => {
                  console.log(caught);
                  return throwError(() => new Error(err.message));
                })
              )
  }
}
