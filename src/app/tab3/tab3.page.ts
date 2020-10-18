import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { observable } from 'rxjs';
import {LocalStorageService} from '../local-storage.service';
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

  constructor(private http:HttpClient,private router:Router,storage:LocalStorageService) {}

  createAccount = function(){
    var body = JSON.stringify({
      Name:this.Name,
      Email:this.Email,
      Password:this.Password,
      Tel:this.Tel,
      CPF:this.CPF
    });
    this.http.post('http://localhost:3000/cadastro', body, httpOptions).subscribe(data =>{
      console.log(data);
    })
  }
  

}
