import { Component, DoCheck, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthApiService } from '../auth-api.service';
import { Todo } from '../Todo';
import { TodoApiService } from '../todo-api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  value:boolean = true
  cardTableView:boolean=true;
  urlComplete:string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsGVgy6KKGOsI_TeuoiQTgJUoJdg5CoSZ_0Ag7U8Y&s';
  urlPending:string= 'https://t3.ftcdn.net/jpg/01/82/45/90/360_F_182459037_Z5oMYBIAJRKrGG8D6xkxtXErXJ0HT8Vs.jpg';


  localItem: any;
  localItem2: string | null = '';  
  toDoAddMode: boolean = false;  
  editMode: boolean = false;
  todos: Todo[] = [];
  index: number = 0;
  user: string='';
  isLoading: boolean= false;

  
  id:number = 0;
  ToDoForm!: FormGroup;
  
  constructor(private router: Router,
     private activatedRoute: ActivatedRoute,
     private authApiService: AuthApiService, 
     private todoApiService: TodoApiService) { 

    authApiService.user.subscribe((res)=>{
      if(res!==null)
      this.user = res.id;
    })
    this.isLoading = true;
    todoApiService.toDosChanged.subscribe(todos=>{
      this.isLoading = false;
      if(todos){
        this.todos=todos;        
      }         
    },(err)=>{
      this.isLoading = false;
      console.error(err);      
    })
   } 


   deleteTodo(todo: Todo){
    this.todoApiService.deleteToDo(todo, this.user);
   }  

  ngOnInit(): void {
    this.isLoading = true;    
    this.todoApiService.fetchToDos(this.user).subscribe((res)=>{
      this.isLoading = false
      if(res)
      this.todos = res
      console.log(res);
      
    })
   }    
 
  viewMode(){
    this.toDoAddMode = !this.toDoAddMode;  
  }
  toDoEditMode(index?:number){
    if(index!==null && index!==undefined){
    this.index = index; 
    this.router.navigate([index,'edit'], {relativeTo: this.activatedRoute})
    }  
    this.editMode = !this.editMode;
    
  }

  switchToView(){
    this.cardTableView = !this.cardTableView;
  }
   
  onCheck(index:number){
    this.todoApiService.toggleToDo(index, this.user)
    
  }
  
  
}
