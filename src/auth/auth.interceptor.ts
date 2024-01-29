import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
  
  token = localStorage.getItem('userToken')
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.token) {
      req = req.clone({
        setHeaders: {
          'authorization': 'Bearer ' + this.token
        }
      })
    }

    return next.handle(req);
  }
}