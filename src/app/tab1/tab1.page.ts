import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { observable } from 'rxjs';
import { SocketioService } from '../socketio.service';

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

  constructor(private http:HttpClient,private router:Router, private socketService:SocketioService) {}

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

  
  Login = function(){
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
