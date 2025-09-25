import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private messageService: MessageService
  ) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get fresh token on each request
    const token = localStorage.getItem('userToken');
    
    if(token) {
      req = req.clone({
        setHeaders: {
          'authorization': 'Bearer ' + token
        }
      })
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Clear token and user data
          localStorage.removeItem('userToken');
          localStorage.removeItem('userData');
          
          // Show message
          this.messageService.add({
            severity: 'warn', 
            summary: 'Phiên đăng nhập hết hạn', 
            detail: 'Vui lòng đăng nhập lại để tiếp tục sử dụng!'
          });
          
          // Navigate to login page
          this.router.navigate(['/dang-nhap']);
        }
        return throwError(error);
      })
    );
  }
}