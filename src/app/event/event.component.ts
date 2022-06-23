import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from '../services/auth-service/auth-service.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {

  logged :any

  constructor(public alertController: AlertController, private authServiceService:AuthServiceService) { }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem("logged")))
    this.logged = this.authServiceService.isLoggedIn
  }

  async presentAlert(){
    const alert= await this.alertController.create({
      header: "Evento",
      message: "Haz sido inscrito al evento",
      buttons: ["OK"],
    });
    await alert.present()
    let result = await alert.onDidDismiss();
    console.log(result);
  }
}
