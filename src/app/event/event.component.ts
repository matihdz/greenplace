import { Component, OnInit } from '@angular/core';
import { AlertButton, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {

  constructor(
    public alertController: AlertController){}

  ngOnInit() {}

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
