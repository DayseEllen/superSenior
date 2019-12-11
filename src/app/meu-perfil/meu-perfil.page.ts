import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Usuario } from 'src/models/usuario';
import { BDService } from '../services/bd.service';
import { Autenticacao } from '../services/autenticacao';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.page.html',
  styleUrls: ['./meu-perfil.page.scss'],
})

export class MeuPerfilPage implements OnInit {
  usuario: Usuario;
  usuarios: Usuario[] = [];
  porcentagemP: string;
  porcentagemM: string;
  porcentagemAS: string;
  nivelP: string;
  nivelM: string;
  nivelAS:string;
  pontosP: number;
  pontosM: number;
  pontosAS:number;

  constructor(private autenticacao: Autenticacao, private rota: Router, private bdService: BDService, ) {
      this.carregarUsuarios();
  }

  private async carregarUsuarios() {
    this.usuarios = await this.bdService.listWithUIDs<Usuario>('/usuarios');
    this.getUser();
    this.pontosP = this.usuario.pontosPerguntas;
    this.pontosM = this.usuario.pontosMemoria;
    this.pontosAS = this.usuario.pontosArrasta;
    this.calcularNivelPergunta();
    this.calcularPorcentagemP();
    this.calcularNivelMemoria();
    this.calcularPorcentagemM();
    this.calcularNivelArrastaSolta();
    this.calcularPorcentagemAS();
  }
  private getUser() {
    this.usuario = null;
    if (this.autenticacao.isLoggedIn()) {
      for (var i = 0; i < this.usuarios.length; i++) {
        if (this.autenticacao.getEmail() === this.usuarios[i].email) {
          this.usuario = this.usuarios[i];
        }
      }
    }
    return this.usuario;
  }

  ngOnInit() {
  }

  singOut() {
    this.autenticacao.signOut()
      .then(() => {
        this.rota.navigate(['cadastrar'])
      })
      .catch((error) => {
        console.error(error);
      });
  }

  calcularPorcentagemP() {
    if (this.nivelP == "Nível 1") {
      this.porcentagemP = String(((100 * this.usuario.pontosPerguntas) / 6).toFixed(0));
    }
    if (this.nivelP == "Nível 2") {
      this.porcentagemP = String(((100 * (this.usuario.pontosPerguntas - 6)) / 6).toFixed(0));
    }
    if (this.nivelP == "Nível 3") {
      this.porcentagemP = String(((100 * (this.usuario.pontosPerguntas - 12)) / 6).toFixed(0));
    }
  }

  calcularNivelPergunta() {
    if (!this.usuario) {
      this.usuario = <Usuario>{};
      this.usuario.pontosPerguntas = this.pontosP;
    }

    if (this.usuario.pontosPerguntas >= 0 && this.usuario.pontosPerguntas < 6) {
      this.nivelP = "Nível 1";
    }
    if (this.usuario.pontosPerguntas >= 6 && this.usuario.pontosPerguntas < 12) {
      this.nivelP = "Nível 2";
    }
    if (this.usuario.pontosPerguntas >= 12 && this.usuario.pontosPerguntas < 18) {
      this.nivelP = "Nível 3";
    }
  }

  calcularPorcentagemM() {
    if (this.nivelM == "Nível 1") {
      this.porcentagemM = String(((100 * this.usuario.pontosMemoria) / 5).toFixed(0));
    }
    if (this.nivelM == "Nível 2") {
      this.porcentagemM = String(((100 * (this.usuario.pontosMemoria - 5)) / 5).toFixed(0));
    }
    if (this.nivelM == "Nível 3") {
      this.porcentagemM = String(((100 * (this.usuario.pontosMemoria - 10)) / 5).toFixed(0));
    }
  }

  calcularNivelMemoria() {
    if (!this.usuario) {
      this.usuario = <Usuario>{};
      this.usuario.pontosMemoria = this.pontosM;
    }

    if (this.usuario.pontosMemoria >= 0 && this.usuario.pontosMemoria < 5) {
      this.nivelM = "Nível 1";
    }
    if (this.usuario.pontosMemoria >= 5 && this.usuario.pontosMemoria < 10) {
      this.nivelM = "Nível 2";
    }
    if (this.usuario.pontosMemoria >= 10 && this.usuario.pontosMemoria < 16) {
      this.nivelM = "Nível 3";
    }
  }
  calcularPorcentagemAS() {
    if (this.nivelAS === "Nível 1") {
      this.porcentagemAS = String(((100 * this.pontosAS)/15).toFixed(0));
    }else
    if (this.nivelAS === "Nível 2") {
      
      this.porcentagemAS = String(((100 * (this.pontosAS - 15)) /20).toFixed(0));
    }else
    if (this.nivelAS === "Nível 3") {
      this.porcentagemAS = String(((100 * (this.pontosAS - 35)) / 21).toFixed(0));
    }
  }
  calcularNivelArrastaSolta() {
    if (!this.usuario) {
      this.usuario = <Usuario>{};
      this.usuario.pontosArrasta = this.pontosAS;
    }

    if (this.pontosAS >= 0 && this.pontosAS < 15) {
      this.nivelAS = "Nível 1";
    }
    if (this.pontosAS >= 15 && this.pontosAS <35) {
      this.nivelAS = "Nível 2";
    }
    if (this.pontosAS >= 35 && this.pontosAS <= 56) {
      this.nivelAS = "Nível 3";
    }
  }
}