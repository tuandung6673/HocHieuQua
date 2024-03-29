import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { MessageService } from "primeng/api";
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(
    private router : Router,
    private messageService: MessageService
  ) {}

  token = localStorage.getItem('userToken')

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.token) {
      return true
    } else {
      this.messageService.add({severity: 'warn', summary: 'Thông báo', detail: 'Bạn cần đăng nhập để truy cập chức năng này !'})
      this.router.navigate(['/dang-nhap'])
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state)
  }
}