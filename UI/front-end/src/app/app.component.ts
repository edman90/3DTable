import { Component, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'front-end';
  // @ts-ignore
  private map;
  private req = this.http.get<any>('http://127.0.0.1:5000/servo')

  public moveServo(): void {
    this.req.subscribe()
    console.log("called")
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

  }


  coordinateForm = this.formBuilder.group({
    address: '',
    latitude: '',
    longitude: ''
  });


    constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

    ngAfterViewInit(): void {
      this.initMap();
    }


  onSubmit(): void {
    // Process checkout data here
    console.warn('Selected Latitude', this.coordinateForm.value.latitude);
    console.warn('Selected Longitude', this.coordinateForm.value.longitude);
    // @ts-ignore
    let lat = parseFloat(this.coordinateForm.value.latitude);
    // @ts-ignore
    let long = parseFloat(this.coordinateForm.value.longitude);
    L.marker([lat, long],{}).addTo(this.map);
    this.map.panTo(new L.LatLng(lat, long));
    this.coordinateForm.reset();
  }
}
