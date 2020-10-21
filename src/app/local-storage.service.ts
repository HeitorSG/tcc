import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import {GlobalConstants} from '../common/global-constants';
import { BehaviorSubject, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  userinfo:BehaviorSubject<any> = new BehaviorSubject<any>(0);
  constructor(public storage:StorageMap) { }

  set(index, data){
    this.storage.set(index, data).subscribe(() => {

    });
  }

  get(index, data){
    this.storage.get(index).subscribe((userinfo:BehaviorSubject<any>) => {
      this.userinfo = userinfo;
      console.log(this.userinfo);
    });
    console.log(this.userinfo);
  }

  clear(){
    this.storage.clear().subscribe(() => {

    });
  }

  delete(index){
    this.storage.delete(index).subscribe(() => {});
  }
}
