import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import { GlobalConstants } from 'src/common/global-constants';
import { environment } from 'src/environments/environment';

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
      router.navigate(['tabs/tab1']);
    })
  }
  
  checkMap(){
    this.socket.on('device_return', (data) =>{
      console.log(data);
      GlobalConstants.deviceid = data.id;
      GlobalConstants.devicename = data.name;
      console.log(GlobalConstants.deviceid);
    })
  }

  mapInit(data){
    console.log(data);
    this.socket.emit('map_connection',{
      id: data.id,
    });
  }

  checkLogin(router){
    this.socket.on('valid', (data)=> {
      router.navigate(['tabs/tab2'],{state:{
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
