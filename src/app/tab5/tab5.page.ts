import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {NgxAgoraService, Stream, AgoraClient, ClientEvent, StreamEvent} from 'ngx-agora';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit,AfterViewInit {
  @ViewChild('vctrl') myview: ElementRef;
  @ViewChild('actrl') aview: ElementRef;
  remoteCalls: string[] = [];
  localCallId = 'agora_local';
  icon: string = "<div style='height:50px; width:50px;'><ion-icon name='videocam-outline' id='videoon' style='height:100%; width:100%;'></ion-icon></div>";
  icona: string = "<ion-icon name='mic-outline' id='audioon' style='height:100%; width:100%;'></ion-icon>";
  private client: AgoraClient;
  private localStream: Stream;
  private uid:number;
  constructor(private ngxAgoraService:NgxAgoraService) {
    this.uid = Math.floor(Math.random() * 100);
   }

   ngAfterViewInit(){
    this.aview.nativeElement.innerHTML = this.icona;
    this.myview.nativeElement.innerHTML = this.icon;
    console.log("this view:", this.myview.nativeElement.innerHTML);
   }

  ngOnInit() {
    this.client = this.ngxAgoraService.createClient({mode:'rtc', codec:'h264'});
    this.assignClientHandler();

    this.localStream = this.ngxAgoraService.createStream({streamID: this.uid, audio:true, video:true, screen: false});
    this.assignLocalStreamHandlers();
    this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));
  }

  join(onSuccess?: (uid:number | string) => void, onFailure?: (error:Error) => void){
    this.client.join('006af7cf4e1dc8e4c1597497b3bbcead4c0IAAxehPYrUa4h/jH5IBWb9cNxA0xuRs/9JYHvgsUcvE1mOnZLEwAAAAAEABO10qJaJyiXwEAAQCWnqJf','foo-bar', this.uid, onSuccess, onFailure);
  }

  publish(){
    this.client.publish(this.localStream, err => console.log('publish local stream error:', err));
  }

  private assignLocalStreamHandlers(){
    this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
      console.log('access allowed');
    });

    this.localStream.on(StreamEvent.MediaAccessDenied, () => {
      console.log('access denied');
    });

  }

  private initLocalStream(onSuccess?: () => any){
    this.localStream.init(
      () => {
        this.localStream.play(this.localCallId);
        if(onSuccess) {
          onSuccess();
        }
      },
      err => console.error('getusermedia failed', err)
    );
  }

  private assignClientHandler(){
    this.client.on(ClientEvent.LocalStreamPublished, evt => {
      console.log('publish local stream successfully');
    });

    this.client.on(ClientEvent.Error, error => {
      console.log('Error Msg:', error.reason);
      if(error.reason === 'DYNAMIC_KEY_TIMEOUT'){
        this.client.renewChannelKey(
          '',
          () => console.log('renewed the channel key successfully'),
          renewError => console.error('renew channel key failed:', renewError)
        );
      }
    });

    this.client.on(ClientEvent.RemoteStreamAdded, evt => {
      const stream = evt.stream as Stream;
      this.client.subscribe(stream, {audio: true, video:true}, err => {
        console.log('sub stream failed');
      });
    });

    this.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
      const stream = evt.stream as Stream;
      const id = this.getRemoteId(stream);
      if(!this.remoteCalls.length){
        this.remoteCalls.push(id);
        setTimeout(() => stream.play(id), 1000);
      }
    });

    this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
      const stream = evt.stream as Stream;
      if(stream){
        stream.stop();
        this.remoteCalls = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });

    this.client.on(ClientEvent.PeerLeave, evt => {
      const stream = evt.stream as Stream;
      if(stream){
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call !==  `${this.getRemoteId(stream)}`);
        console.log(`${evt.uid} left from this channel`);
      }
    });

    this.client.on(ClientEvent.RemoveVideoMuted, evt => {
      console.log("muted");
      var html = document.getElementById('vctrl');
      html.append("<div id='vctrl' (click)='playVideo()' class='videocontrol'><ion-icon name='videocam-off-outline' style='height:100%; width:100%;'></ion-icon></div>");
    });
  }

  private getRemoteId(stream: Stream): string {
    return `agora_remote-${stream.getId()}`;
  }

  private ctrlVideo(){
    if(this.myview.nativeElement.innerHTML.indexOf('videoon') != -1){
      this.myview.nativeElement.innerHTML = "<div style='height:50px; width:50px;'><ion-icon name='videocam-off-outline' id='videooff' style='height:100%; width:100%;'></ion-icon></div>"
      this.localStream.muteVideo();
    }
    else if(this.myview.nativeElement.innerHTML.indexOf('videooff') != -1){
      this.myview.nativeElement.innerHTML = "<div style='height:50px; width:50px;'><ion-icon name='videocam-outline' id='videoon' style='height:100%; width:100%;'></ion-icon></div>"
      this.localStream.unmuteVideo();
    }
   // var html = document.getElementById('vctrl').innerHTML;
    //html = "<div id='vctrl' (click)='playVideo()' class='videocontrol'><ion-icon name='videocam-off-outline' style='height:100%; width:100%;'></ion-icon></div>";
    
  }

  private ctrlAudio(){
    if(this.aview.nativeElement.innerHTML.indexOf('audioon') != -1){
      this.aview.nativeElement.innerHTML = "<ion-icon name='mic-off-outline' id='audiooff' style='height:100%; width:100%;'></ion-icon>";
      this.localStream.muteAudio();
    }
    else if(this.aview.nativeElement.innerHTML.indexOf('audiooff') != -1){
      this.aview.nativeElement.innerHTML = "<ion-icon name='mic-outline' id='audioon' style='height:100%; width:100%;'></ion-icon>";
      this.localStream.unmuteAudio();
    }
    
  }

 

}
