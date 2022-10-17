import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authApiService: AuthApiService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user: boolean = false;
      this.authApiService.user.subscribe((userStatus)=>{
        user = !userStatus ? false : true;        
      })
      if(user){
        this.router.navigate(['welcome']);
        return false;
      }
        else{
          return true;
        }        
  }
  
}
