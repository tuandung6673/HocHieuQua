import { MessageService } from 'primeng/api';

import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()

export class AdminGuard implements CanActivate, CanActivateChild {
  userData = JSON.parse(localStorage.getItem('userData'));
  userRole : any;
  constructor(private messageService: MessageService, private router: Router) {
    this.userRole = JSON.parse(this.userData.roles);  
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.userRole[0].role_id == 'admin') {
      return true;
    } else {
      this.messageService.add({severity: 'warn', summary: 'Thông báo', detail: 'Bạn không có quyền truy cập chức năng này'});
      this.router.navigate(["/"]);
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state)
  }
}