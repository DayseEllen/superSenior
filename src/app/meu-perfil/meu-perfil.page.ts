import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.page.html',
  styleUrls: ['./meu-perfil.page.scss'],
})
export class MeuPerfilPage implements OnInit {
  

  constructor(private alertCtlr: AlertController) { }

  ngOnInit() {
  }
  

  async abrirAlert(){
    let alert = await this.alertCtlr.create({
      header: "Fulano de Tal",
      subHeader: "SubHeader",
      message: "Mensagem do alert",
      buttons: ["ok"]
    });
    await alert.present();

  }
  

}

