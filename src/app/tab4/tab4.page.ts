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
  vectors:any;
  clayer:any;
  circle:any;
  circlegeo:any
  constructor(private storage:LocalStorageService, private socket:SocketioService) { }

  ngOnInit() {
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
    this.layers = new ol.layer.Vector({
      source:new ol.source.Vector(),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 1],
          scale:1,
          src:'./assets/icon/map-marker.png'
        })
      })
        /*features:[
          new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([-49.75374415,-21.6756695]))
          })
        ]*/

      
    });

    this.map.addLayer(this.layers);
  }

  addMarker(){
    this.storage.getMap('user');
    this.socket.checkMap();  
    this.marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([-49.75374415,-21.6756695])))
    this.layers.getSource().addFeature(this.marker);

    
      this.vectors = new ol.source.Vector();
      this.clayer = new ol.layer.Vector({
        source: this.vectors
      });
      this.map.addLayer(this.clayer);
      this.circle = new ol.geom.Circle(ol.proj.fromLonLat([-49.75374415,-21.6756695]), 40);
      console.log(this.circle.getCenter());
      this.vectors.addFeature(new ol.Feature(this.circle));
      console.log(this.circle.intersectsCoordinate(ol.proj.fromLonLat([-49.75374415,-21.6756695])));
    }

  
}
