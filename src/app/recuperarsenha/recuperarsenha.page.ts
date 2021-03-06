import { Autenticacao } from './../services/autenticacao';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { BDService } from '../services/bd.service';
import { Usuario } from 'src/models/usuario';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recuperarsenha',
  templateUrl: './recuperarsenha.page.html',
  styleUrls: ['./recuperarsenha.page.scss'],
})
export class RecuperarsenhaPage implements OnInit {
  usuario: Usuario;
  usuarios: Usuario[] = [];
  contador: number = 0;
  usuario2: Usuario;
  constructor(private rota: Router, private alertCtrl: AlertController, private bdService: BDService, private autenticacao: Autenticacao,private menu: MenuController) {
    this.menu.enable(false);
    this.carregarUsuarios();
  }

  private async carregarUsuarios() {
    this.usuarios = await this.bdService.listWithUIDs<Usuario>('/usuarios');
  }

  @ViewChild('recuperar') form: NgForm;

  async recuperarSenha(recuperar) {
    if (this.form.form.valid) {

      var username = recuperar.username;
      var minusculo = username.toLowerCase();
      var usernameValido = this.limpaString(minusculo);

    this.getUser(usernameValido);
    if (this.form.form.valid) {
      if (this.verificaSeExisteUsuario(usernameValido, recuperar.nomeM)) {
        let alert = await this.alertCtrl.create({
          header: 'Legal! ',
          message: 'A sua senha é: ' + this.usuario.senha,
          cssClass: 'alertsformcad',
          buttons: [{
            text: 'Vamos ao login!',
            handler: () => this.rota.navigate(['login'])
          }]
        });
        await alert.present();

      }else{
        let alert = await this.alertCtrl.create({
          header: 'Que pena! ',
          message: 'Seu apelido e/ou o nome da sua mãe estão incorretos',
          cssClass: 'alertsformcad',
          buttons: [{
            text: 'Tentar novamente',
            handler: () => this.rota.navigate(['recuperarsenha'])
          }]
        });
        await alert.present();
      }
    }
  }
}

  verificaSeExisteUsuario(username:string,nomeM:string) {
    for (var i = 0; i < this.usuarios.length; i++) {
      if (username === this.usuarios[i].username && nomeM === this.usuarios[i].nomeM ) {
        console.log(this.usuarios[i].username)
        return true;
      }

    }
    return false;
  }

  getUser(username) {
    for (var i = 0; i < this.usuarios.length; i++) {
      if (username == this.usuarios[i].username) {
        this.usuario = this.usuarios[i];
      }
    }
    return this.usuarios;

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


  abrirPagina(url: String) {
    this.rota.navigate([url]);

  }

  ngOnInit() {
  }

}
