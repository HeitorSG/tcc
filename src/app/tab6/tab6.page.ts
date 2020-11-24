import { Component, OnInit } from '@angular/core';
import { ActionSheetController, mdTransitionAnimation, AlertController} from '@ionic/angular';
import { Router} from '@angular/router';
import {SocketioService} from '../socketio.service';
import {LocalStorageService} from '../local-storage.service';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {
  devices:[];
  constructor(private actionSheetController:ActionSheetController, private router:Router, private alertController:AlertController, private socket:SocketioService, private storage:LocalStorageService) { }

  ngOnInit() {
      this.storage.get('user').subscribe( (data) => {
        console.log(data.id);
        this.socket.getDevices(data.id); 
      });
      this.socket.checkDevice().subscribe({
        next:(res) => {
          if(res != 0){
            this.devices = res;
            console.log(this.devices);
          }
        }
      });
      
   
  }

  async presentAlert(){
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

  goToVideoCall(){
    this.router.navigate(['tab5']);
  }
}
