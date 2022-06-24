import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// eslint-disable-next-line max-len
import { BaseArrayClass, Circle, DirectionsRenderer, DirectionsResult, DirectionsService, Geocoder, GeocoderResult, GoogleMap, GoogleMaps, GoogleMapsAnimation, GoogleMapsEvent, GoogleMapsMapTypeId, ILatLng, Marker, MarkerCluster, MarkerClusterOptions, MyLocation } from '@ionic-native/google-maps';
import { LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {

  // eslint-disable-next-line @typescript-eslint/naming-convention

  searchAddress = '';
  gMap: GoogleMap = null;
  loading: any;

  directionsDisplay: DirectionsRenderer;
  userLocation: MyLocation;

  constructor(public loadingCtrl: LoadingController, private platform: Platform) { }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  async calculateAndDisplayRoute(marker: Marker) {
    const result: DirectionsResult = await DirectionsService.route({
      origin: this.userLocation.latLng,
      destination: marker.getPosition(),
      travelMode: 'WALKING'
    });

    if (result) {
      console.log('R', result);

      if (result) {
        this.directionsDisplay.setDirections(result);
      }
    }
  }

  async loadMap() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });

    const GREENPOINTS: BaseArrayClass<any> = new BaseArrayClass<any>([
      {
        position: {lat: -33.0324719, lng:-71.432095},
        iconData: './assets/images/greenpoint.png'
      }
    ]);

    const bounds: ILatLng[] = GREENPOINTS.map((data: any, idx: number) => data.position);

    this.gMap = GoogleMaps.create('map_canvas', {
      camera: {
        target: bounds
      },
      mapType: GoogleMapsMapTypeId.NORMAL
    });

    if (this.gMap) {

      this.directionsDisplay = new DirectionsRenderer(this.gMap, this.gMap);
      this.gMap.getMyLocation().then((location: MyLocation) => {
        this.loading.dismiss();
        this.userLocation = location;
        this.gMap.animateCamera({
          target: location.latLng,
          zoom: 17,
          tilt: 30
        });

        GREENPOINTS.forEach((data: any) => {
          data.disableAutoPan = true;
          const marker: Marker = this.gMap.addMarkerSync(data);
          const iconData: any = marker.get('iconData');
          marker.setIcon(iconData);

          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe((result) => {
            this.onMarkerClicked(result);
          });
          //marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(this.onMarkerClicked);
        });
      });
    }
  }

  async searchLocation() {
    if (this.searchAddress.length < 3) {return;}

    this.loading = await this.loadingCtrl.create({
      message: 'Por favor espera...'
    });

    await this.loading.present();
    this.gMap.clear();

    Geocoder.geocode({
      address: this.searchAddress
    }).then(async (results: GeocoderResult[]) => {
      this.loading.dismiss();

      if (results.length > 0) {
        console.log(1);

        const marker: Circle = await this.gMap.addCircleSync({
          radius: 512,
          center: results[0].position,
          title: 'Ubicación buscada',
          animation: GoogleMapsAnimation.BOUNCE
        });


        this.gMap.animateCamera({
          target: marker.getCenter(),
          zoom: 17
        });

        console.log(3);

      } else {
        alert('Not found');
      }
    });
  }

  onMarkerClicked(params: any) {
    const marker: Marker = params[1];
    this.calculateAndDisplayRoute(marker);
  }
}
