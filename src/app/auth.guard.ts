import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authApiService: AuthApiService, private router: Router){}
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //     let user: boolean = false;
  //     this.authService.userAuthenticated.subscribe((userStatus)=>{
  //       user = userStatus;        
  //     })
  //     if(user){
  //       return user;
  //     }
  //       else
  //       this.router.navigate(['login']);        
  //       return false;
      
  // }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authApiService.user.pipe(
      take(1),
      map(user=>{
        const isAuth = !user ? false : true
        if(isAuth){
          
          return true;
        }
        return this.router.createUrlTree(['login'])
      })
    );
}



  
}
