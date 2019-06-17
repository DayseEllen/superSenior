import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NgForm } from '@angular/forms';
import { Autenticacao } from '../services/autenticacao';
import { Usuario } from 'src/models/usuario';
import { AlertController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: Usuario;
  
  constructor(private rota: Router, private autenticacao : Autenticacao, private alertCtrl: AlertController, private location: Location) { 
    //
    this.usuario = new Usuario( null,null, null,null, null);
   }

  @ViewChild('login') form: NgForm;

 async signIn(login){
   if (this.form.form.valid){
    this.usuario = {
      nome: null,
      email: login.email,
      senha: login.senha,
      telefone: null,
      genero: null,
      perguntasRespondidas: null
    }

      this.usuario = new Usuario( null, login.email, login.senha, null, null)

      await  this.autenticacao.signIn(this.usuario)
        .then(async () => {
          let alert = await this.alertCtrl.create({
            header: 'Ebaa! 😃',
            message: 'Bem vindo(a)!',
            buttons:[{
              text: 'Vamos lá!',
              handler: ()=> this.rota.navigate(['home'])
            }]
          });
          await alert.present();
          console.log("PEGOUUUU")
        })
        .catch(async (error: any) => {
          if(error.code == 'auth/invalid-email'){
            console.log("O e-mail digitado não é valido");
            let alert = await this.alertCtrl.create({
              header: 'Falha ao entrar 😢',
              message: 'O e-mail digitado não é valido',
              buttons:[
                {
                  text: 'Tentar novamente',
                  handler: ()=>  location.reload()
                }
              ]
            });
            await alert.present();
          } else if(error.code == 'auth/user-disabled'){
            console.log("O usuário está desativado");
            let alert = await this.alertCtrl.create({
              header: 'Falha ao entrar 😢',
              message: 'O usuário está desativado',
              buttons:[
                {
                  text: 'Tentar novamente',
                  handler: ()=> this.rota.navigate(['login'])
                }
              ]
            });
            await alert.present();
          } else if(error.code == 'auth/user-not-found'){
            console.log("O usuário não foi encontrado");
            let alert = await this.alertCtrl.create({
              header: 'Falha ao entrar 😢',
              message: 'O usuário não foi encontrado',
              buttons:[
                {
                  text: 'Tentar novamente',
                  handler: ()=> this.rota.navigate(['login'])
                }
              ]
            });
            await alert.present();
          } else if(error.code == 'auth/wrong-password'){
            console.log("A senha digitada não é valida");
            let alert = await this.alertCtrl.create({
              header: 'Falha ao entrar 😢',
              message: 'A senha digitada não é válida',
              buttons:[{
                text: 'Tentar novamente',
                handler: ()=> this.rota.navigate(['login'])
              }]
            });
            await alert.present();
          }
        });
    }
  }

  ngOnInit() {
    this.usuario = new Usuario( null, null, null, null, null);
  }

  abrirPagina(url:String){
    this.rota.navigate([url]);

  }


}
