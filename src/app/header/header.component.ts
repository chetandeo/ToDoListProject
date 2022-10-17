import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AuthApiService } from '../auth-api.service';
import { Subscription } from 'rxjs';
import { TodoApiService } from '../todo-api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck, OnDestroy {

  items!: MenuItem[];
  itemsPublic! : MenuItem[]
  scrollableItems!: MenuItem[];
  activeItem!: MenuItem;
  activeItem2!: MenuItem;
  private userSub!: Subscription;

  //todos:Todo[];
  complete:{allTodo: number, complete: number, pending: number} = {allTodo: 0, complete: 0, pending: 0};

   userAuth=false;

  constructor(private authApiService: AuthApiService, private todoApiService: TodoApiService) {
    todoApiService.tempData.subscribe((val)=>{
      this.complete=val;
    })
   }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngDoCheck(): void {
    this.complete = this.todoApiService.geStatics();
  }

  ngOnInit(): void {    
    this.userSub=this.authApiService.user.subscribe(user=>{
      this.userAuth = !user ? false : true;
    })    

    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: 'welcome'},
      {label: 'ToDo List', icon: 'pi pi-fw pi-calendar', routerLink: 'dashboard'},
      {label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: 'profile'}          
  ];
  this.itemsPublic = [
    {label: 'ToDo App'}
  ]

  this.scrollableItems = Array.from({ length: 50 }, (_, i) => ({ label: `Tab ${i + 1}`}));

  this.activeItem = this.items[0];

  this.activeItem2 = this.scrollableItems[0];
        
  }

  onLogout(){
    this.userAuth = false;
    this.authApiService.logout();
    this.userSub.unsubscribe();
  }

}
