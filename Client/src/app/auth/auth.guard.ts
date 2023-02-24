import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {GoogleService} from "../services/google.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  googleService: GoogleService = inject(GoogleService)
  router: Router = inject(Router)

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.googleService.getIdTokenFromStorage()) {
      return true
    } else {
      this.router.navigate(['../'])
      return false
    }
  }

}
