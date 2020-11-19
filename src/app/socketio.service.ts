import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import { GlobalConstants } from 'src/common/global-constants';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  constructor(private socket:Socket) { }

  setupSocketConnection(){

    this.socket.on('', socket =>{
      alert("Username / Password Invalid, Please try again!");
    });

  
  }

  checkCad(router){
    this.socket.on('created', () => {
      router.navigate(['tab1']);
    })
  }
  
  checkDevice():Observable<any>{
    const result: BehaviorSubject<any> = new BehaviorSubject<any>(0);
    this.socket.on('device_return', (data) =>{
      console.log(data);
      result.next(data);
      result.complete();
    });
    return result.asObservable();
  }

  getDevices(OwnerID){
    this.socket.emit('get_devices',{
      ownerid: OwnerID
    });
  }

  mapInit(data){
    console.log(data);
    this.socket.emit('map_connection',{
      id: data.id,
    });
  }

  checkLogin(router){
    this.socket.on('valid', (data)=> {
      router.navigate(['tab2'],{state:{
        id:data.id,
        name:data.name,
        email:data.email,
        password:data.password
      }
      });
    });
    
    this.socket.on('invalid', socket => {
      console.log("conta errada");
      window.alert('Wrong Email or Password!');
    });

  }

  cadastrarDevice(Name, Ownername, Ownerid){
    this.socket.emit('cadastro_device',
    {
      Name:Name,
      OwnerName:Ownername,
      OwnerID:Ownerid
    });
  }

  cadastrarUser(Name, Email, Password, Tel, CPF){
    this.socket.emit('cadastro_user',{
      Name:Name,
      Email:Email,
      Password:Password,
      Tel:Tel,
      CPF:CPF
    })
  }

  loginSocket(Email, Password){
    this.socket.emit('login_user',{
      email:Email,
      password:Password
    });
  }
}
