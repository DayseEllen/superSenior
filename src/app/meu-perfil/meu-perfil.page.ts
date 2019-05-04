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
  

  async alterarNomeAlert(){
    let alert = await this.alertCtlr.create({
      header: "Nome do usuário:",
      inputs:[
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Digite seu novo nome'
        } ],
      buttons:[
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          role: 'cancel',
          handler: ()=> console.log("aqui vai abrir cancelar a ação de alterar")
        },
        {
          text: 'Alterar',
          handler: ()=> console.log("Alteração concluída")
        }
      ]
    });
    await alert.present();
  }

  async alterarEmailAlert(){
    let alert = await this.alertCtlr.create({
      header: "Email do usuário:",
      inputs:[
        {
          name: 'email',
          type: 'text',
          placeholder: 'Digite seu novo e-mail'
        } ],
      buttons:[
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          role: 'cancel',
          handler: ()=> console.log("aqui vai abrir cancelar a ação de alterar")
        },
        {
          text: 'Alterar',
          handler: ()=> console.log("Alteração concluída")
        }
      ]
    });
    await alert.present();
  }

  async alterarGeneroAlert(){
    let alert = await this.alertCtlr.create({
      header: "Gênero do usuário:",
      inputs:[
        {
          name: 'genero',
          type: 'text',
          placeholder: 'Digite seu novo gênero sexual'
        } ],
      buttons:[
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          role: 'cancel',
          handler: ()=> console.log("aqui vai abrir cancelar a ação de alterar")
        },
        {
          text: 'Alterar',
          handler: ()=> console.log("Alteração concluída")
        }
      ]
    });
    await alert.present();
  }
  async alterarSenhaAlert(){
    let alert = await this.alertCtlr.create({
      header: "Sua senha:",
      inputs:[
        {
          name: 'senha',
          type: 'password',
          placeholder: 'Digite sua senha'
        } ,
        {
          name: 'senha1',
          type: 'password',
          placeholder: 'Digite sua nova senha'
        },
        {
          name: 'senhanova',
          type: 'password',
          placeholder: 'Confirme sua nova senha'
        }
      ],
      buttons:[
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          role: 'cancel',
          handler: ()=> console.log("aqui vai abrir cancelar a ação de alterar")
        },
        {
          text: 'Alterar',
          handler: ()=> console.log("Alteração concluída")
        }
      ]
    });
    await alert.present();
  }
  


}

