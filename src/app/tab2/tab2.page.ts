import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  cards: any[] = [];

  constructor() {
    this.cards = [
      {
          "cardTitle": "¿Sabías que?",
          "cardBody": "Apartado para preguntas frecuentes y datos de interés"
      },
      {
          "cardTitle": "Noticias",
          "cardBody": "En esta sección te podrás enterar de las últimas novedades sobre el medio ambiente y su f..."
      }
    ]
  }

}
