import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthApiService } from './auth-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'ToDoListProject';
  userAuth: boolean = false;
  constructor(private authApiService: AuthApiService){
    this.authApiService.user.subscribe((user)=>{
      this.userAuth = !user? false: true;
    })    
  }
  ngDoCheck(): void {    
  }

  ngOnInit(){
    this.authApiService.autoLogin();
   
  }


}
