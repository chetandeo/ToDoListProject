import { DoCheck, Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { AuthService } from './auth.service';
import { Todo } from './Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements  DoCheck{

  todos: Todo[] = []; 
  tempData = new BehaviorSubject<{allTodo: number, complete: number, pending: number}>({allTodo: 0, complete: 0, pending: 0});
  currentUserTodos:Todo[] = []
  currentUser:string = '';
  

   constructor(private authService: AuthService, private authApiService: AuthApiService) {       
     authApiService.user.subscribe((res)=>{
      if(res!==null)
      this.currentUser= res.email;
     })  
            
   }

  ngDoCheck(): void {
    
  }
    
  getStat(){        
    let tempData = 0;
    let count = this.todos.length;
    if(count==0){
      return {allTodo: 0, complete: 0, pending: 0}
    }else{
    this.todos.forEach(x=>{      
      if(x.active===false){
          tempData++;
      }
      this.tempData.next({allTodo: this.todos.length, complete: tempData, pending: this.todos.length-tempData});    
    })
    return {allTodo: this.todos.length, complete: tempData, pending: this.todos.length-tempData}
  }
    
   

   }


fetchData(){
  let localItem = localStorage.getItem(this.currentUser)
  if(localItem == null){
    this.todos = [];
  }else{
    this.todos = JSON.parse(localItem);
  }  
  
  // todos.forEach((x)=>{
  //   if(user!==null){
  //   if(x.user==user.email){
  //     this.currentUserTodos.push(x)
  //   }}
  // }) 
}

getToDo(index: number){
  return this.todos[index];
}

addToDo(todo: Todo){
  this.todos.push(todo);
  localStorage.setItem(this.currentUser, JSON.stringify(this.todos));               
 }

 deleteTodo(Todo: Todo, index: number){
  let j = -1;
  const result=this.todos.some((obj)=>{
    j++;
    return obj.sno==index;
  })
  console.log(this.todos);
  console.log(j);
    
  this.todos.splice(j, 1);
  localStorage.setItem(this.currentUser, JSON.stringify(this.todos));
  if(!result){
    return -1;
  }else{
    return j;    
  }  
  
 }
 toggleTodo(Todo:Todo, index: number){
  this.todos.find(x=> {
    if(x.sno==index){
      console.log(x);      
      x.active = !x.active;
    }else {console.log('not found');}    
  })   
  localStorage.setItem(this.currentUser, JSON.stringify(this.todos));
  
}
editToDo(index: number, newToDo: Todo){
  let j = -1;
  const result=this.todos.some((obj)=>{
    j++;
    return obj.sno==index;
  })
  this.todos[j]=newToDo ;
  localStorage.setItem(this.currentUser, JSON.stringify(this.todos));
  if(!result){
    return -1;
  }else{
    return j;    
  }  



  // this.todos[index]= newToDo;  
  // localStorage.setItem("todos", JSON.stringify(this.todos));

}

}
