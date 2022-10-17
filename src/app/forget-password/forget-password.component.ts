import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthApiService } from '../auth-api.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  @ViewChild('loginForm')  loginForm!: NgForm; 

  constructor(private authApiService: AuthApiService) { }

  ngOnInit(): void {
  }
  onForgetPassword(email:string){
    this.authApiService.forgetPwd(email).subscribe((res)=>{
      console.log(res);
      
    },(err:HttpErrorResponse)=>{
      alert(err.error.error.message);
      
    },()=>{
      console.log('completed!');
      this.loginForm.reset();
    })
    
  }

}
