import { Component, OnInit } from '@angular/core';
import { __importDefault } from 'tslib';
import { AuthApiService } from '../auth-api.service';
import { AuthService } from '../auth.service';
import { Todo } from '../Todo';
import { TodoApiService } from '../todo-api.service';
import { TodoService } from '../todo.service';
import { User } from '../user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser:string='';
  complete:{allTodo: number, complete: number, pending: number} = {allTodo: 0, complete: 0, pending: 0};

  constructor(private authService: AuthService, private _toDoService: TodoService, private authApiService: AuthApiService, private todoApiService: TodoApiService) {
    this.authApiService.user.subscribe(res=>{
      if(res)
      this.currentUser = res.email;
    })
    this.todoApiService.tempData.subscribe(val=>{
      this.complete = val;
    })
  
  }
 
  ngOnInit(): void {     
    
  }
    

}
