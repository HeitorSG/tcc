import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router,ActivatedRoute} from '@angular/router';
import { observable } from 'rxjs';
import { SocketioService } from '../socketio.service';
import {LocalStorageService} from '../local-storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  param;
  constructor(public activatedRoute: ActivatedRoute, private storage:LocalStorageService, private router:Router) {}
  
  ngOnInit(){
    if(window.history.state.navigationId == 2){
      this.param = window.history.state;
      this.storage.set('user',this.param);
    
    }

  }
  
  goTo(url){
    this.router.navigate([url]);
  }
}
