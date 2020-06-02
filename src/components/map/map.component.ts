import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit , AfterViewInit  {

  private map;
  @Input() location;
  @Input() admin;
  @Output() markerLocation: EventEmitter<any>;

  constructor(public router: Router) {
    this.markerLocation = new EventEmitter();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.location,
      zoom: 15,
      trackResize: false
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: this.admin ? 1 : 15,
      maxZoom: 19,
      attribution: '&copy; <a href="https://chumtravel.herokuapp.com/">Come Chum</a>'
    });

    tiles.addTo(this.map);
    const Icon = L.icon({
      iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
      iconSize:     [50, 50], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    const marker = L.marker(this.location, {icon: Icon , draggable: this.admin});
    marker.on('dragend', function(event) {
      var marker = event.target;
      var position = marker.getLatLng();
      this.location = position.lat + ',' + position.lng;
      console.log(this.location);
      console.log(this.markerLocation);
      this.markerLocation.emit(this.location);
    });
    marker.addTo(this.map);
  }

}
