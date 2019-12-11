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
  usuarios: Usuario[];

  constructor(private rota: Router, private autenticacao: Autenticacao,
     private alertCtrl: AlertController, private location: Location, private bdService: BDService) {
    //
    //this.usuario = new Usuario(null, null, null, null, null, null);
  }
  private async carregarUsuarios() {
    this.usuarios = await this.bdService.listWithUIDs<Usuario>('/usuarios');
  }
  @ViewChild('login') form: NgForm;
  
  async signIn(login) {
    if (this.form.form.valid) {
     /* var emailLogin = login.username + '@seniorIFPE.com';
      this.usuario = {
        nome: this.autenticacao,
        username: login.username,
        email: emailLogin,
        genero: 'Feminino',
        idade: 19,
        senha: login.senha,
        pontosPerguntas: 0,
        pontosMemoria: 0,
        pontosArrasta: 0,
        qtPerguntas: 0,
        qtMemoria: 0,
        qtArrasta: 0
      }*/
      var username = login.username;
      var minusculo = username.toLowerCase();

      //this.usuario = new Usuario(this.autenticacao.getNomeUser(), null, emailLogin, null, null, login.senha);
      this.carregarUsuarios();
      await this.autenticacao.signIn(minusculo+ '@seniorifpe.com', login.senha)
        .then(async () => {
          let alert = await this.alertCtrl.create({
            header: 'Ebaa! 😃',
            message: 'Bem vindo(a)!',
            cssClass: 'alertsformlog',
            buttons: [{
              text: 'Vamos lá!',
              handler: () => this.rota.navigate(['home'])
            }]
          });
          await alert.present();
        })
        .catch(async (error: any) => {
          if (error.code == 'auth/invalid-email') {
            console.log("O e-mail digitado não é valido");
            let alert = await this.alertCtrl.create({
              header: 'Falha ao entrar 😢',
              message: 'O e-mail digitado não é valido',
              cssClass: 'alertsformlog',
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
              cssClass: 'alertsformlog',
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
              cssClass: 'alertsformlog',
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
              cssClass: 'alertsformlog',
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
    // this.usuario = new Usuario(null, null, null, null, null, null);
  }

  abrirPagina(url: String) {
    this.rota.navigate([url]);

  }

}
