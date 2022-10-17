import { DoCheck, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserApi } from './userApi.model';
import { Todo } from './Todo';

export interface AuthResponseData{  
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;

}

@Injectable({
  providedIn: 'root'
})

export class AuthApiService implements DoCheck {

  user = new BehaviorSubject<UserApi>(null as any);
  private tokenExpireTimer: any;
  private beforeTokenExpireTimer: any;

  constructor(private http: HttpClient, private router:Router) { }
  ngDoCheck(): void {
    //throw new Error('Method not implemented.');
  }

  forgetPwd(email:string){
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCntk3T5InC7WC3SZRIoEi79OLwdJCJRHo',
    {requestType: "PASSWORD_RESET", email:email})
  }

  signUp(email: string, password: string){   
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCntk3T5InC7WC3SZRIoEi79OLwdJCJRHo',
    {email: email, password: password, returnSecureToken: true})
    .pipe(catchError(this.handleError),
    tap(resData=>{
      this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn
      )
    })
    );    
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCntk3T5InC7WC3SZRIoEi79OLwdJCJRHo',
    {email: email, password:password, returnSecureToken:true})
    .pipe(catchError(this.handleError),
    tap(resData=>{
      this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn
      );
    }));
  }

  autoLogin(){
    const userData:{
      email:string,
       id: string,
        _token: string,
         _tokenExpirationDate: string}= JSON.parse(localStorage.getItem('userData')? localStorage.getItem('userData'): null as any);
         if(!userData){                   
          return;
         }
         const loadUser = new UserApi(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
         if(loadUser.token){         
          this.user.next(loadUser);
          const expirationDuration = new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();         
          this.autoLogout(expirationDuration)
         }
  }

  logout(){
    this.user.next(null as any);
    clearTimeout(this.beforeTokenExpireTimer);
    this.beforeTokenExpireTimer = null;
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');   
    if(this.tokenExpireTimer){
      clearTimeout(this.tokenExpireTimer);
    }
    this.tokenExpireTimer=null;
  }

  autoLogout(expirationDuration:number){
    console.log(expirationDuration);
    this.beforeTokenExpireTimer=setTimeout(()=>{
      alert("Session Expire in 10 Seconds")
    }, expirationDuration-25000)    
    this.tokenExpireTimer = setTimeout(()=>{      
      alert("Session Expired !")      
      this.logout();
    },expirationDuration)
  }

 private handleAuthentication(email: string, userId: string, token:string, expiresIn: number){
  const expirationDate = new Date(new Date().getTime()+expiresIn*1000);
  const user = new UserApi(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user))
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMsg = 'Unknown Error Occured !';
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMsg);
    }
    switch(errorRes.error.error.message){
      case "EMAIL_EXISTS":
        errorMsg = 'Email Already Exists !';
        break;
    case "INVALID_PASSWORD":
        errorMsg = 'Password is Invalid!';
        break;
    case "EMAIL_NOT_FOUND":
        errorMsg = 'User Not Found!';
        break;
    }
    return throwError(errorMsg);

  }



}
