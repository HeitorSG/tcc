import { Component, OnInit } from '@angular/core';
import { NetworkPluginWeb } from '@capacitor/core';
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
  constructor() { }

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
  }

}
