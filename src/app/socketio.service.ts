import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import { GlobalConstants } from 'src/common/global-constants';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { ActionSheetController, mdTransitionAnimation, AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  constructor(private socket:Socket, private alertController:AlertController) { }

  setupSocketConnection() {
    this.socket.on('connected', (data) =>{
      //this.socket.removeAllListeners();
      console.log('chegou', data);
    });

    this.socket.on('disconnect', () => {
      //this.socket.removeAllListeners();
    });
  }

 

  pingDevice(deviceName, OwnerID, where){
    this.socket.emit(where, {
      deviceName: deviceName,
      OwnerID: OwnerID
    });
  }

  checkCad(router) {
    this.socket.on('created', () => {
      router.navigate(['tab1']);
    })
  }
  
  


  getDevices(OwnerID) {
    this.socket.emit('get_devices', {
      OwnerID: OwnerID
    });
  }

  deleteDevice(deviceName, OwnerID) {
    this.socket.emit('delete_device', {
      Name:deviceName,
      OwnerID:OwnerID
    });
  }

  mapInit(data) {
    console.log(data);
    this.socket.emit('map_connection',{
      id: data.id,
    });
  }

  checkLogin(router) {
    this.socket.on('valid', (data)=> {
      router.navigate(['tab2'],{state:{
        id:data.id,
        name:data.name,
        email:data.email,
        password:data.password
      }
      });
      this.socket.removeListener('valid');
    });
    
    this.socket.on('invalid', (data) => {
      this.socket.removeListener('invalid');
      console.log("conta errada");
      this.presentAlert();
      
    });

  }

  cadastrarDevice(Name, Ownername, Ownerid) {
    this.socket.emit('cadastro_device',
    {
      Name:Name,
      OwnerName:Ownername,
      OwnerID:Ownerid
    });
  }

  cadastrarUser(Name, Email, Password, Tel, CPF) {
    this.socket.emit('cadastro_user',{
      Name:Name,
      Email:Email,
      Password:Password,
      Tel:Tel,
      CPF:CPF
    })
  }

  loginSocket(Email, Password) {
    this.socket.emit('login_user',{
      email:Email,
      password:Password
    });
  }

  sendCoords(deviceName, OwnerID, coords) {
    this.socket.emit('send_coords',{
      Name: deviceName,	
      OwnerID: OwnerID,
      coords: coords
    })
  }

  getSocket(){
    return this.socket;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass:'customAlert',
      header:'Alert!!! Wrong Email or Password',
    });
    await alert.present();
  }
}
