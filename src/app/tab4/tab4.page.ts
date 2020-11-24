import { Component, OnInit } from '@angular/core';
import { NetworkPluginWeb } from '@capacitor/core';
import {LocalStorageService} from '../local-storage.service';
import { SocketioService } from '../socketio.service';

declare var ol: any;

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

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
  devices:[];
  constructor(private storage:LocalStorageService, private socket:SocketioService) { }

  ngOnInit() {
    //init the map first layer
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

  markerControl(deviceName, coords) {
    if(this.map.getLayers().getArray().filter(layer => layer.get('name') === deviceName + 'marker').length > 0) {
      //check if theres a marker assoaciateed with the deviceName already on the map, removing that marker if true
      this.map.getLayers().getArray().filter(layer => layer.get('name') === deviceName + 'marker').forEach(layer => this.map.removeLayer(layer));
    }
    else {
      //create marker layer and attach it to the map
      this.marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(coords)))
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
      
    }
    this.markerUpdate(deviceName);   
  }

  markerUpdate(deviceName){
    //updates the marker position checking the realtime feed on socket.io device coordinates
    this.socket.checkDeviceMap().subscribe({
      next:(res) => {
        if(res != 0){
          console.log(res);
          if(res != undefined){
            this.map.getLayers().getArray().filter(layer => layer.get('name') === deviceName + 'marker').forEach(layer => this.map.removeLayer(layer));
            //create marker layer and attach it to the map
            this.marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(res.coordinates)))
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
          this.map.getView().setCenter(ol.proj.fromLonLat(res.coordinates));
          }
        }
      }
    });

    
  }

  circleControl(deviceName) {
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
      this.circle = new ol.geom.Circle(ol.proj.fromLonLat([-49.75374415,-21.6756695]), 40);
      console.log(this.circle.getCenter());
      this.circleVector.addFeature(new ol.Feature(this.circle));
      console.log(this.circle.intersectsCoordinate(ol.proj.fromLonLat([-49.75374415,-21.6756695])));
    }
  }
      
    

  
}
