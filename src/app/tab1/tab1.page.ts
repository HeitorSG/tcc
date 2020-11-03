import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { observable } from 'rxjs';
import { SocketioService } from '../socketio.service';
import {LocalStorageService} from '../local-storage.service';
import { GlobalConstants } from 'src/common/global-constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  Username:string = "";
  Password:string = "";
  userdata:any = "";

  constructor(private http:HttpClient,private router:Router, private socketService:SocketioService, private storage:LocalStorageService) {}

  ngOnInit(){
    console.log('inicio');

  };

  printUser(){
    console.log();
    console.log(this.Username);
  };

  printPass(){
    console.log(this.Password);
  };

  goToCad(){
    this.router.navigate(['tabs/tab3']);
  }

  Login(){
    console.log("FOI");
    this.socketService.loginSocket(this.Username, this.Password);
    this.socketService.checkLogin(this.router);
  }



}
