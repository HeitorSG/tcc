import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, QueryList, AfterViewInit, ViewChildren } from '@angular/core';
import { ActionSheetController, mdTransitionAnimation, AlertController} from '@ionic/angular';
import { Router} from '@angular/router';
import {SocketioService} from '../socketio.service';
import {LocalStorageService} from '../local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit, AfterViewInit {
  @ViewChildren('teste') myview: QueryList<ElementRef>;
  devices:any[];
  constructor(private actionSheetController:ActionSheetController, private router:Router, private alertController:AlertController, private socket:SocketioService, private storage:LocalStorageService, private cd:ChangeDetectorRef) { }

  ngAfterViewInit(){
    
    
  }

  ngOnInit() {
      this.storage.get('user').subscribe( (data) => {
        if(data == undefined){
          this.router.navigate(['tab1'])
        }
        console.log(data.id);
        this.socket.getDevices(data.id); 
      
      this.socket.checkDevice().subscribe({
        next:(res) => {
          if(res != 0) {
            this.devices = res
            //console.log(this.devices);
            //this.pingDevice('teste3');
          }
        }
      });
    });

    const socketteste = this.socket.getSocket();
    socketteste.on('ping_return_true', (data) => {
      console.log(data);
      this.myview.toArray().map(x => {
        if(x.nativeElement != undefined) {
          if(x.nativeElement.id == data.id) {
            x.nativeElement.innerHTML = "<ion-icon  name='ellipse' color='primary' ></ion-icon>";
          }
        }
      });
    });

    socketteste.on('ping_return_false', (data) => {
      console.log(data);
      this.myview.toArray().map(x => {
        if(x.nativeElement != undefined) {
          if(x.nativeElement.id == data.id) {
            x.nativeElement.innerHTML = "<ion-icon  name='ellipse' color='danger' ></ion-icon>";
          }
        }
      });
    });
  

    

    setInterval(() => {
      console.log("passou");
      this.devices.forEach(async (device:any) => {
      this.pingDevice(device.name); 
      //console.log(device);
    })},2500);
   
    
      
   
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass:'customAlert',
      header:'Add Device',
      inputs:[{
        name:'DeviceName',
        type:'text',
        placeholder:'Device Name'
      }],
      buttons:[
        {
          text:'Cancel',
          role:'cancel',
          handler:() => {
            console.log("confirm cancel");
          }
        },
        {
          text:'okay',
          handler:(data) => {
            this.storage.get('user').subscribe((datastg) => {
              this.socket.cadastrarDevice(data.DeviceName, datastg.name, datastg.id);
            });
           setTimeout(() => {window.location.reload();},300);
          }
        }
      ]
    });
    await alert.present();
  }

  async presentActionSheet(deviceName) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Device',
      cssClass: 'my-custom-class',
      animated:true,
      mode:'md',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.storage.get('user').subscribe((data) => {
            console.log(data.id);
            this.socket.deleteDevice(deviceName, data.id);
          });
        }
      }, {
        text: 'Edit',
        icon: 'create',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  deviceId(deviceid){ 
    if(deviceid != undefined){
      return deviceid;
    }

  }

  pingDevice(deviceName) {
    this.storage.get('user').subscribe((data) => {
      this.socket.pingDevice(deviceName, data.id, 'ping_device)');
    });

  }

  checkViewCnt(deviceid) {
    if(this.devices[this.devices.indexOf[deviceid]] != undefined){
      if(this.devices[this.devices.indexOf[deviceid]].connected == true) {
        return true;
      }
      else{
        return false;
      }
    }
  }

  goToVideoCall() {
    this.router.navigate(['tab5']);
  }
}
