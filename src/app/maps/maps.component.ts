import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line max-len
import { BaseArrayClass, GoogleMap, GoogleMaps, GoogleMapsEvent, ILatLng, Marker, MarkerCluster, MarkerClusterOptions } from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {

  map: GoogleMap;

  constructor(private platform: Platform) { }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    const GREENPOINTS: Array<any> = new Array<any>([
      {
        position: {lat: -33.0324719, lng:-71.432095},
        iconData: './assets/images/greenpoint.png'
      }
    ]);

    const bounds: ILatLng[] = GREENPOINTS.map((data: any, idx: number) => {
      console.log(data);
      return data.position;
    });

    this.map = new GoogleMap('map_canvas', {
      camera: {
        target: bounds
      }
    });

    GREENPOINTS.forEach((data: MarkerClusterOptions) => {
      data.disableAutoPan = true;
      const marker: MarkerCluster = this.map.addMarkerClusterSync(data);
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(this.onMarkerClicked);
      marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(this.onMarkerClicked);
    });
  }

  onMarkerClicked(params: any) {
    const marker: Marker = params[1];
    const iconData: any = marker.get('iconData');
    marker.setIcon(iconData);
  }

}
