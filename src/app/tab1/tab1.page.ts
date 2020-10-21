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
    this.storage.get('user',this.userdata);
    console.log(GlobalConstants.user);

  };

  printUser(){
    console.log();
    console.log(this.Username);
  };

  printPass(){
    console.log(this.Password);
  };

  
  Login(){
    console.log("FOI");
    this.socketService.loginSocket(this.Username, this.Password);
    this.socketService.checkLogin(this.router);
    
    
    
    
   /* const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };
    var res;
    var  body = JSON.stringify({
      email: this.Username,
      password: this.Password
  });
  
  
 
  this.http.post('http://localhost:3000/login', body, httpOptions).subscribe(data =>{
    if(data.authentication == 'true'){
      this.router.navigate(['tabs/tab2']);
    }
  })*/
  }



}
