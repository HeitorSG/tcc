import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket;

  constructor() { }

  setupSocketConnection(){
    var options = {
      rememberUpgrade:true,
      transports: ['websocket'],
      secure:true, 
      rejectUnauthorized: false
          }
    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.on('', socket =>{
      alert("Username / Password Invalid, Please try again!");
    });


  }
  checkCad(router){
    this.socket.on('created', () => {
      router.navigate(['tabs/tab1']);
    })
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
      alert('Wrong Email or Password');
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
