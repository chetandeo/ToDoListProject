import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthApiService } from '../auth-api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private authApiService: AuthApiService) { }

  ngOnInit(): void {
  }


}
