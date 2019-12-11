import { Autenticacao } from './../services/autenticacao';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  constructor(private rota: Router, private alertCtrl: AlertController, private bdService: BDService, private autenticacao: Autenticacao) {
  }

  private async carregarUsuarios() {
    this.usuarios = await this.bdService.listWithUIDs<Usuario>('/usuarios');
  }

  @ViewChild('recuperar') form: NgForm;

  async recuperarSenha(recuperar) {
    if (this.form.form.valid) {
      if (this.verificaSeExisteUsuario(recuperar.username)) {
        this.getUser(recuperar.username);

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
      }

    }
  }

  verificaSeExisteUsuario(username) {
    this.carregarUsuarios();

    for (var i = 0; i < this.usuarios.length; i++) {

      if (username === this.usuarios[i].username) {
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


  ngOnInit() {
  }

}
