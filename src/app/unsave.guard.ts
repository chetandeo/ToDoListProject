import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AddTodoComponent } from './add-todo/add-todo.component';

@Injectable({
  providedIn: 'root'
})
export class UnsaveGuard implements CanDeactivate<AddTodoComponent> {
  canDeactivate(component: AddTodoComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot | undefined): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(component.ToDoForm.dirty){
      return window.confirm('You have some unsaved changes, Are you sure you want to navigate?');
    }else
    return true;
  }
 
  
}
