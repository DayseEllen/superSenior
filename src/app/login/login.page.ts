import { async } from '@angular/core/testing';
import { BDService } from './../services/bd.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/models/usuario';
import { AlertController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Autenticacao } from '../services/autenticacao';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: Usuario;

  constructor(private rota: Router, private autenticacao: Autenticacao, private alertCtrl: AlertController, private location: Location) {
    //
    this.usuario = new Usuario(null, null, null, null, null, null);
  }

  @ViewChild('login') form: NgForm;

  async signIn(login) {
    if (this.form.form.valid) {
     var emailLogin: string = login.username+'@seniorIFPE.com';
      this.usuario = {
        nome: null,
        username: null,
        email: emailLogin,
        genero: null,
        idade: null,
        senha: login.senha,
        pontosPerguntas: 0,
        pontosMemoria: 0,
        pontosArrasta: 0,
        qtPerguntas:0,
        qtMemoria:0,
        qtArrasta:0
      }

      this.usuario = new Usuario(null, null, emailLogin, null, null, login.senha);

      await this.autenticacao.signIn(this.usuario)
        .then(async () => {
          let alert = await this.alertCtrl.create({
            header: 'Ebaa! 😃',
            message: 'Bem vindo(a)!',
            cssClass: 'alertsforms',
            buttons: [{
              text: 'Vamos lá!',
              handler: () => this.rota.navigate(['home'])
            }]
          });
          await alert.present();
          console.log("PEGOUUUU")
        })
        .catch(async (error: any) => {
          if (error.code == 'auth/invalid-email') {
            console.log("O e-mail digitado não é valido");
            let alert = await this.alertCtrl.create({
              header: 'Falha ao entrar 😢',
              message: 'O e-mail digitado não é valido',
              cssClass: 'alertsforms',
              buttons: [
                {
                  text: 'Tentar novamente',
                  handler: () => location.reload()
                }
              ]
            });
            await alert.present();
          } else if (error.code == 'auth/user-disabled') {
            console.log("O usuário está desativado");
            let alert = await this.alertCtrl.create({
              header: 'Falha ao entrar 😢',
              message: 'O usuário está desativado',
              cssClass: 'alertsforms',
              buttons: [
                {
                  text: 'Tentar novamente',
                  handler: () => this.rota.navigate(['login'])
                }
              ]
            });
            await alert.present();
          } else if (error.code == 'auth/user-not-found') {
            console.log("O usuário não foi encontrado");
            let alert = await this.alertCtrl.create({
              header: 'Falha ao entrar 😢',
              message: 'O usuário não foi encontrado',
              cssClass: 'alertsforms',
              buttons: [
                {
                  text: 'Tentar novamente',
                  handler: () => this.rota.navigate(['login'])
                }
              ]
            });
            await alert.present();
          } else if (error.code == 'auth/wrong-password') {
            console.log("A senha digitada não é valida");
            let alert = await this.alertCtrl.create({
              header: 'Falha ao entrar 😢',
              message: 'A senha digitada não é válida',
              cssClass: 'alertsforms',
              buttons: [{
                text: 'Tentar novamente',
                handler: () => this.rota.navigate(['login'])
              }]
            });
            await alert.present();
          }
        });
    }
  }

  ngOnInit() {
    this.usuario = new Usuario(null, null, null, null, null, null);
  }

  abrirPagina(url: String) {
    this.rota.navigate([url]);

  }

}
