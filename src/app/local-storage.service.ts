import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private storage:StorageMap) { }

  set(index, data){
    this.storage.set(index, data).subscribe(() => {

    });
  }

  get(index){
    this.storage.get(index).subscribe((getData) => {
      console.log(getData);
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
