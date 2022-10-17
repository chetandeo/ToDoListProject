import { HttpClient } from '@angular/common/http';
import { DoCheck, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, Subject, tap } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { Todo } from './Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService implements OnInit, DoCheck{
  toDos:Todo[]=[];
  currentUser:string = '';
  toDosChanged = new Subject<Todo[]>()
  tempData = new BehaviorSubject<{allTodo: number, complete: number, pending: number}>({allTodo: 0, complete: 0, pending: 0});


  constructor(private authApiService: AuthApiService, private http: HttpClient) {
   
   }
  ngDoCheck(): void {
    const localItem =  localStorage.getItem('userData');
    if(localItem==null){
       this.currentUser =''
    }else{
     let obj = JSON.parse(localItem);
     this.currentUser = obj.id;  
    }
  }
  ngOnInit(): void {
    this.authApiService.user.subscribe((user)=>{
      if(user){
      this.currentUser = user.id;
      this.fetchToDos(this.currentUser).subscribe(res=>{
      if(res){
      this.toDos = res;
      this.toDosChanged.next(this.toDos) ; 
    }else{
      this.toDos = [];
    }      
      });
    }
    })
  

  }

  geStatics(){
    let tempData = 0;
    let count = this.toDos.length;
    if(count==0){
      return {allTodo: 0, complete: 0, pending: 0};
    }else{
      this.toDos.forEach(x=>{
       if(x.active===false){
        tempData++;
       }
       this.tempData.next({allTodo: count, complete: tempData, pending: count-tempData})
      })
      return {allTodo: count, complete: tempData, pending: count-tempData};
    }
  }

   addToDo(todo:Todo, user:string){
    this.toDos.push(todo);
    this.http.put('https://todo-angular-pro-default-rtdb.firebaseio.com/'+user+'.json',this.toDos)
    .subscribe(res=>{
      console.log(res);      
    })
    this.toDosChanged.next(this.toDos);
   }

   deleteToDo(todo:Todo, user:string){
    let j = -1;
  const result=this.toDos.some((obj)=>{
    j++;
    return obj.sno==todo.sno;
  })
  this.toDos.splice(j, 1);
  this.http.put('https://todo-angular-pro-default-rtdb.firebaseio.com/'+user+'.json',this.toDos)
    .subscribe(res=>{
      console.log(res);      
    })
    this.toDosChanged.next(this.toDos);
  if(!result){
    return -1;
  }else{
    return j;    
  }  
   }

   getToDo(index:number){
    return this.toDos[index];
   }

   toggleToDo(index: number, user:string){
    this.toDos[index].active = !this.toDos[index].active;
    this.http.put('https://todo-angular-pro-default-rtdb.firebaseio.com/'+user+'.json',this.toDos)
    .subscribe(res=>{
      console.log(res);      
    })
    this.toDosChanged.next(this.toDos);

   }

   editToDo(todo:Todo, index: number, user:string){
    this.toDos[index]=todo;
    this.http.put('https://todo-angular-pro-default-rtdb.firebaseio.com/'+user+'.json',this.toDos)
    .subscribe(res=>{
      console.log(res);      
    })
    this.toDosChanged.next(this.toDos);

   }

   fetchToDos(currentUser:string){
    return this.http.get<Todo[]>('https://todo-angular-pro-default-rtdb.firebaseio.com/'+currentUser+'.json', )
    .pipe(
      map(todos=>{
        return todos?.map(todos=>{
          return{
            ...todos
          };
        });
      }),tap(todos=>{
        if(todos)      
        this.toDos = todos
      })
    );
   }
}
