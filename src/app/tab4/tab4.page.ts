import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkPluginWeb } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import {LocalStorageService} from '../local-storage.service';
import { SocketioService } from '../socketio.service';

declare var ol: any;

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  @ViewChildren('teste') myview: QueryList<ElementRef>;

  latitude: number = -21.6756695;
  longitude: number = -49.7537441;
  map:any;
  layers:any;
  marker:any;
  circleVector:any;
  markerVector:any;
  clayer:any;
  mlayer:any;
  circle:any;
  circlegeo:any;
  devices:any[];
  activeCircles:any[];
  alert:any;
  constructor(private storage:LocalStorageService, private socket:SocketioService, private router:Router, private alertController:AlertController) { 
  }

  ngOnInit() {
    
    //init the map first layer
    this.storage.get('user').subscribe((data) => {

      console.log(data.id);
      this.socket.getDevices(data.id); 
      
      
    });


    /*this.socket.checkDevice().subscribe({
      next:(res) => {
        if(res != 0){
          this.devices = res;
          console.log(this.devices);
        }
      }
    });*/

    const socketteste = this.socket.getSocket();
    socketteste.on('device_return', (data) =>{
      console.log(data);
      this.devices = data;
    });

    socketteste.on('ping_return_true', (data) => {
      this.markerUpdate(data.name, data.coordinates);
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
      this.pingDevice(device.name, 'ping_device'); 
      
      //console.log(device);
    })},2500);

    this.map = new ol.Map({
      target:'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center:ol.proj.fromLonLat([-49.75374415,-21.6756695]),
        zoom: 20
      })
    });

  }

  pingDevice(deviceName, where) {
    this.storage.get('user').subscribe((data) => {
      this.socket.pingDevice(deviceName, data.id, where);
    });

  }

  markerControl(deviceName, coords) {
    
    const socketRealtime = this.socket.getSocket();
    this.pingDevice(deviceName, 'ping_device_map');
    socketRealtime.on('ping_return_true_map', (data) => {
      console.log(data);
      if(data.name == deviceName) {
        console.log(this.map.getLayers().getArray().filter(layer => layer.get('name') === deviceName + 'marker'));
        if(this.map.getLayers().getArray().filter(layer => layer.get('name') === deviceName + 'marker') == null){window.location.reload();}
        if(this.map.getLayers().getArray().filter(layer => layer.get('name') === data.name+ 'marker').length > 0) {
          //check if theres a marker assoaciateed with the deviceName already on the map, removing that marker if true
          this.map.getLayers().getArray().filter(layer => layer.get('name') === data.name + 'marker').forEach(layer => this.map.removeLayer(layer));
          socketRealtime.removeListener('ping_return_true_map');
        }
        else {
          //create marker layer and attach it to the map
          this.marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(coords)))
          this.mlayer = new ol.layer.Vector({
            name:data.name + 'marker',
            source:new ol.source.Vector(),
            style: new ol.style.Style({
              image: new ol.style.Icon({
                anchor: [0.5, 1],
                scale:1,
                src:'./assets/icon/map-marker.png'
              })
            })
          });
          this.map.addLayer(this.mlayer);
          this.mlayer.getSource().addFeature(this.marker);
          this.map.getView().setCenter(ol.proj.fromLonLat(coords));
          
        }
        this.circleControl(data.name, data.coordinates);
        //this.markerUpdate(deviceName);  
        socketRealtime.removeListener('ping_return_true_map');
      }
    });
  
      
    
    
    
    
    
  }

  goTo(url){
    this.router.navigate([url]);
  }

  async markerUpdate(deviceName, coords){

    const socketRealtime = this.socket.getSocket();
    var alert 
   
     if(this.map.getLayers().getArray().filter(layer => layer.get('name') === deviceName + 'marker') == null){window.location.reload();}
        if(this.map.getLayers().getArray().filter(layer => layer.get('name') === deviceName + 'marker').length > 0){
          this.map.getLayers().getArray().filter(layer => layer.get('name') === deviceName + 'marker').forEach(layer => this.map.removeLayer(layer));
          //create marker layer and attach it to the map
          this.marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(coords)));
          this.mlayer = new ol.layer.Vector({
            name:deviceName + 'marker',
            source:new ol.source.Vector(),
            style: new ol.style.Style({
              image: new ol.style.Icon({
                anchor: [0.5, 1],
                scale:1,
                src:'./assets/icon/map-marker.png'
              })
            })
          });
        this.map.addLayer(this.mlayer);
        this.mlayer.getSource().addFeature(this.marker);
        this.map.getView().setCenter(ol.proj.fromLonLat(coords));
        console.log(this.activeCircles);
        if(this.activeCircles != undefined){
          this.activeCircles.forEach(async(circle) => {
            if(circle.N != undefined){
            if(circle.N.name == deviceName && circle.intersectsCoordinate(ol.proj.fromLonLat(coords)) == true){
              console.log("dentro do circulo");
            }
            else if( circle.N.name == deviceName && circle.intersectsCoordinate(ol.proj.fromLonLat(coords)) == false){
              console.log("fora do circulo");
              circle.N = undefined;
              this.alert = await this.alertController.create({
                cssClass:'customAlert',
                header:'Fora do Circulo',
                buttons:[
                  {
                    text:'okay',
                    handler:(data) => {
                     
                    }
                  }
                ]
              });
              await this.alert.present();
              
            }
          }
          })
        }
      }
      
      
   
      

    
  }

  circleControl(deviceName, coords) {
    if(this.map.getLayers().getArray().filter(layer => layer.get('name') === deviceName + 'marker') == null){window.location.reload();}
    if(this.map.getLayers().getArray().filter(layer => layer.get('name') === deviceName + 'circle').length > 0) {
      //check if theres a circle with the matching deviceName already on the map, removing that circle if true
      this.map.getLayers().getArray().filter(layer => layer.get('name') === deviceName + 'circle').forEach(layer => this.map.removeLayer(layer));
    }
    else {
      //Create circle layer and attach it to the map
      this.circleVector = new ol.source.Vector();
      this.clayer = new ol.layer.Vector({
        name:deviceName + 'circle',
        source: this.circleVector
      });
      this.map.addLayer(this.clayer);
      this.circle = new ol.geom.Circle(ol.proj.fromLonLat(coords), 40);
      this.circle.set("name", deviceName);
      if(this.activeCircles != undefined){
        this.activeCircles.push(this.circle);
      }
      else if(this.activeCircles == undefined) {
        this.activeCircles = [this.circle];
      }
      
      console.log(this.circle.getCenter());
      this.circleVector.addFeature(new ol.Feature(this.circle));
      console.log(this.circle.intersectsCoordinate(ol.proj.fromLonLat(coords)));
    }
  }
      
    

  
}
