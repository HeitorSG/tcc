import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { observable } from 'rxjs';
import {LocalStorageService} from '../local-storage.service';
import { SocketioService } from '../socketio.service';
import { Local } from 'protractor/built/driverProviders';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  Name:string = "";
  Email:string = "";
  Password:string = "";
  Tel:string = "";
  CPF:string = "";

  constructor(private http:HttpClient,private router:Router,private storage:LocalStorageService, private socketservice:SocketioService) {}

  createAccount(){
    this.socketservice.cadastrarUser(this.Name,this.Email,this.Password,this.Tel,this.CPF);
    this.socketservice.checkCad(this.router);
  }
  

}
