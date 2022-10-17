import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthApiService } from '../auth-api.service';
import { Todo } from '../Todo';
import { TodoApiService } from '../todo-api.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  id:number = 0;
  ToDoForm!: FormGroup;
  editMode: boolean = false;
  currentUser: string = '';
  userId:string='';
 
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router, 
    private todoApiService: TodoApiService,
    private authApiService: AuthApiService ) {
      authApiService.user.subscribe((user)=>{
        if(user){
        this.currentUser = user.email;
      this.userId = user.id}
      })
      
     }

  ngOnInit(): void {      
    this.activatedRoute.params.subscribe(
      (param: Params)=>{
        this.id = +param['id'];
        this.editMode = param['id'] != null;
        this.initForm();
      }
    )
  }  
  onSubmit(){
    //console.log(this.ToDoForm.value.title);    
    const todo: Todo = {sno: new Date().getMilliseconds(),
      title: this.ToDoForm.value.title,
      desc: this.ToDoForm.value.desc,
      active: true,
      user: this.currentUser};
      
    if(this.editMode){
      this.todoApiService.editToDo(todo,this.id, this.userId)
    }else{
      this.todoApiService.addToDo(todo, this.userId)
    }
    this.ToDoForm.reset();

  }
  onCancel(){
   //this.cancel.emit()
   this.router.navigate(['/dashboard'])
   this.id = 0;
   this.editMode = false;
  }

  initForm(){
    let title = '';
    let desc = '';
    if(this.editMode){
      const todo = this.todoApiService.getToDo(this.id);
      title = todo.title;
      desc =  todo.desc;
    }
    this.ToDoForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'desc': new FormControl(desc, Validators.required)
    });
  }




}
