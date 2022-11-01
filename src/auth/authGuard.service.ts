import { AuthService } from './../services/authService.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(
    private authService : AuthService,
    private router : Router
  ) {}

  token = localStorage.getItem('userToken')

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.token) {
      return true
    } else {
      this.router.navigate(['/dang-nhap'])
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state)
  }
}