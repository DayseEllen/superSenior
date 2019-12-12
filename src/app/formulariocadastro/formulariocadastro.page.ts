import { AlertController, ToastController } from '@ionic/angular';
import { BDService } from '../services/bd.service';
import { Usuario } from './../../models/usuario';
import { Autenticacao } from '../services/autenticacao';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { async } from 'q';



@Component({
  selector: 'app-formulariocadastro',
  templateUrl: './formulariocadastro.page.html',
  styleUrls: ['./formulariocadastro.page.scss'],
  providers: [BDService]
})
export class FormulariocadastroPage implements OnInit {
  usuario: Usuario;
  usuarios: Usuario[];
  contador: number = 0;
  constructor(private rota: Router,
    private bdService: BDService,
    private alertCtrl: AlertController,
    private autenticacao: Autenticacao,
  ) {

  }

  @ViewChild('cadastro') form: NgForm;

  async createAccount(cadastro) {
    if (this.form.form.valid) {
      var nome = this.maiuscula(cadastro.nome);
      var username = cadastro.username;
      var minusculo = username.toLowerCase();
      var usernameValido = this.limpaString(minusculo);
      this.usuario = {
        uid: null,
        nome: nome,
        username: usernameValido,
        email: usernameValido + '@seniorifpe.com',
        genero: cadastro.genero,
        idade: cadastro.idade,
        senha: cadastro.senha,
        pontosPerguntas: 0,
        pontosMemoria: 0,
        pontosArrasta: 0,
        qtPerguntas: 0,
        qtMemoria: 0,
        qtArrasta: 0
      }
      console.log(this.usuario.email);
      await this.autenticacao.createUser(this.usuario)
        .then(async () => {
          let alert = await this.alertCtrl.create({
            header: 'Ebaaa! 😃',
            message: 'Você está cadastrado.',
            cssClass: 'alertsformcad',
            buttons: [{
              text: 'Vamos lá!',
              handler: () => this.rota.navigate(['login'])
            }]
          });
          await alert.present();
          this.bdService.insertInList<Usuario>('/usuarios', this.usuario);
        })
        .catch(async (error: any) => {
          if (error.code == 'auth/email-already-in-use') {
            console.log("O nome de usuário digitado já está em uso");
            let alert = await this.alertCtrl.create({
              header: 'Que pena! 😢 ',
              message: 'O usuário já existe.',
              cssClass: 'alertsformcad',
              buttons: [{
                text: "Ok"
              }]
            });
            await alert.present();
          } else if (error.code == 'auth/operation-not-allowed') {
            console.log("Não está habilitado criar usuários");
            let alert = await this.alertCtrl.create({
              header: 'Que pena! 😢 ',
              message: 'Você não está habilitado a criar usuários',
              cssClass: 'alertsformcad',
              buttons: [{
                text: "Ok"
              }]
            });
            await alert.present();
          } else if (error.code == 'auth/weak-password') {
            console.log("A senha digitada é muito fraca");
            let alert = await this.alertCtrl.create({
              header: 'Que pena! 😢 ',
              message: 'A senha digitada é muito fraca',
              cssClass: 'alertsformcad',
              buttons: [{
                text: "Ok"
              }]
            });
            await alert.present();
          }
        });
    }
  }


  maiuscula(palavra) {
    palavra = palavra.split("");
    var espaco = "";
    for (var i = 0; i < palavra.length; i++) {
      if (palavra[i - 1]) {
        if (palavra[i - 1] == " ") { palavra[i] = palavra[i].replace(palavra[i], palavra[i].toUpperCase()); }
      }
      else { palavra[i] = palavra[i].replace(palavra[i], palavra[i].toUpperCase()); }
      espaco += palavra[i];
    }
    palavra = espaco;
    return palavra;
  }


  limpaString(palavra) {
    var tamanho = palavra.length;
    var novaString = "";
    for (var i = 0; i < tamanho; i++) {
      if (palavra.charAt(i) != " ") {
        novaString += palavra.charAt(i);
      }
    }
    palavra = novaString;
    return palavra;
  }

  async alertSenha() {
    if (this.contador == 0) {
      let alert = await this.alertCtrl.create({
        header: 'ATENÇÃO! ',
        message: 'A senha precisa ter no mínimo 6 caracteres.',
        cssClass: 'alertsformcad',
        buttons: [{
          text: "Ok"
        }]
      });
      this.contador++;
      await alert.present();
    } else {
      console.log(this.contador)
    }
  }

  validarIdade() {
    var el = document.getElementById("inputName4");
    var nome = el.innerHTML.valueOf();
    console.log(nome)
  }

  abrirPagina(url: String) {
    this.rota.navigate([url]);
  }


  ngOnInit() {

  }

}