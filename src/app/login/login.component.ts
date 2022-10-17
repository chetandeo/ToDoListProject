import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { AuthApiService } from '../auth-api.service';
import { AuthService } from '../auth.service';
import { TodoApiService } from '../todo-api.service';
import { User } from '../user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginMode = false;
  isAuth:boolean = false;
  isLoading = false;
  msgsErr = '';
  msgsSuc = '';

  constructor(private authService: AuthService, private router: Router, private authApiService: AuthApiService, private toDoApiService:TodoApiService) {
    authApiService.user.subscribe((user)=>{
      this.isAuth = !user ? false : true;
    })
   }
  
  ngOnInit(): void { }

  switchLoginMode(){
    this.msgsErr=''
    this.loginMode = !this.loginMode;
  }
  onSignUp(userData: NgForm){
    if(!userData.valid){
      return;
    }
    this.isLoading = true;
    this.msgsErr='';
    const user: User = {
      name: userData.value.name,
      username: userData.value.email,
      mobile: userData.value.mobile,
      securityQue: userData.value.securityQue,
      password: userData.value.pwd
    }
    this.authApiService.signUp(userData.value.email, userData.value.pwd).subscribe((res)=>{
      //console.log(res);
      this.isLoading = false;      
    },(error)=>{
      this.isLoading = false;
      this.msgsErr=error;
    },()=>{
      this.isLoading = false;
      this.msgsSuc ="User Register Successfully !"
      userData.reset();
    })      
  }

  onLogin(email: string, pwd: string){
    this.isLoading = true    
    this.authApiService.login(email, pwd).subscribe((res)=>{
      //console.log(res);
      this.isLoading = false;      
    },(error)=>{
      this.isLoading = false;
      this.msgsErr = error;
        //alert(error)
    },()=>{
        this.isLoading = false;
        this.msgsSuc='Login Successfully'
        this.loginMode = true;
        this.router.navigate(['welcome']);
        this.authApiService.autoLogin()        
    })
       
  }

}
