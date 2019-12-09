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
  usuario: Usuario = null;
  usuarios: Usuario[] = [];
  constructor(private rota: Router,
    private bdService: BDService,
    private alertCtrl: AlertController,
    private autenticacao: Autenticacao,
  ) {
  }

  @ViewChild('cadastro') form: NgForm;

  async createAccount(cadastro){
      if (this.form.form.valid){
        this.usuario = {
          nome: cadastro.nome,
          username:cadastro.username,
          email: cadastro.username+'@supersenior.com',
          genero: cadastro.genero,
          idade: cadastro.idade,
          senha: cadastro.senha,
          pontosPerguntas: 0,
          pontosMemoria: 0,
          pontosArrasta:0,
          qtPerguntas:0,
          qtMemoria:0,
          qtArrasta:0
        }
        console.log(this.usuario.email);
        await this.autenticacao.createUser(this.usuario)
            .then((usuario: any) => {
             usuario.sendEmailVerification();
              console.log("Pegou!");
            
            })
            .catch((error: any) => {
              if(error.code == 'auth/email-already-in-use'){
                console.log("O e-mail digitado já está em uso");
              } else if(error.code == 'auth/invalid-email'){
                console.log("O e-mail digitado não é valido");
              } else if(error.code == 'auth/operation-not-allowed'){
                console.log("Não está habilitado criar usuários");
              } else if(error.code == 'auth/weak-password'){
                console.log("A senha digitada é muito fraca");
              }
            });
      }
  }

  abrirPagina(url:String){
    this.rota.navigate([url]);
 }

  ngOnInit() {

  }

}
