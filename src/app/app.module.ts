import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { TabMenuModule } from 'primeng/tabmenu';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {TableModule} from 'primeng/table';
import {DataViewModule} from 'primeng/dataview';
import { HttpClientModule } from '@angular/common/http';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    WelcomeComponent,
    AddTodoComponent,
    NotFoundComponent,
    ProfileComponent,
    FooterComponent,
    ForgetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule, 
    TabMenuModule,
    MenubarModule,
    ButtonModule,
    PasswordModule,
    PanelModule,
    InputTextModule,
    CardModule,
    CheckboxModule,
    ToggleButtonModule,
    TableModule,
    DataViewModule,
    MessageModule,
    MessagesModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
