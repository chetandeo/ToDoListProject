import {Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = new ReplaySubject<{email: string, pwd: string}>();
  userAuthenticated = new BehaviorSubject(false);
  localUsers = JSON.parse(localStorage.getItem("users")? localStorage.getItem("users"): null as any);

  private users1: User[] = [
    {

      name: 'Chetan Deore',
      username: 'cdeore20@gmail.com',
      mobile: '9503002981',
      securityQue: '12thwonder',
      password: '123456'
    },
    {

      name: 'Yash More',
      username: 'yash@gmail.com',
      mobile: '7057342986',
      securityQue: '12thwonder',
      password: 'abcdefg'
    },
    {

      name: 'Vivek Patil',
      username: 'vivek@gmail.com',
      mobile: '9856748596',
      securityQue: '12thwonder',
      password: 'Pass@123'
    },
    {
      name: 'Raj Wagh',
      username: 'raje@gmail.com',
      mobile: '9657895485',
      securityQue: '12thwonder',
      password: '654321'
    }
  ]
  
  constructor(private router: Router, private authApiService: AuthApiService) {  
    
    if(this.localUsers==null){
      localStorage.setItem("users", JSON.stringify(this.users1))
    }
    
   }
 

  signUp(userData: User) {    
    if(this.users1.find(x=>x.username === userData.username)){
      return false;
    }else{  
    this.users1.push(userData);       
    localStorage.setItem("users", JSON.stringify(this.users1))
    return true; 
  }  
  }

  login(email: string, pwd: string) {
    if (this.users1.find(x => x.username === email && x.password === pwd)) {
      this.userAuthenticated.next(true);      
        localStorage.setItem("user", JSON.stringify({email: email, pwd: pwd}));
        this.currentUser.next({email: email, pwd: pwd}); 
      return true;
    } else
      return false;
   }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("currentUserToDos");
    this.userAuthenticated.next(false);
    this.router.navigate(['login']);
  }
  autoLogin(){  
    const localUser = JSON.parse(localStorage.getItem("user")? localStorage.getItem("user"): null as any);
    if(localUser==null){
      this.logout();
    }else{
      this.login(localUser.email, localUser.pwd);
    }
  }
  
  getUsers(){
      return this.users1
  }    

}
