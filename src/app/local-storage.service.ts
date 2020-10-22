import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import {GlobalConstants} from '../common/global-constants';
import { BehaviorSubject, observable } from 'rxjs';
import { SocketioService } from './socketio.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(public storage:StorageMap,private socket:SocketioService) { }

  set(index, data){
    this.storage.set(index, data).subscribe(() => {

    });
  }

  getMap(index){
    this.storage.get(index).subscribe((getData) => {
      console.log(getData);
      this.socket.mapInit(getData);
    });
  
  }

  clear(){
    this.storage.clear().subscribe(() => {

    });
  }

  delete(index){
    this.storage.delete(index).subscribe(() => {});
  }
}
