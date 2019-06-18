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
  providers:[BDService]
})
export class FormulariocadastroPage implements OnInit {
   usuario: Usuario;
   usuarios: Usuario[];
  constructor(private rota:Router, 
    private bdService: BDService, 
    private alertCtrl: AlertController, 
    private autenticacao : Autenticacao, 
    ) { 

    }

  @ViewChild('cadastro') form: NgForm;

  async createAccount(cadastro){
      if (this.form.form.valid){
        var nome = this.maiuscula(cadastro.nome);
        this.usuario = {
          nome: nome,
          email: cadastro.email,
          senha: cadastro.senha,
          telefone: null,
          genero: null,
          perguntasRespondidas: null
        }
        console.log(this.usuario.email);
        await this.autenticacao.createUser(this.usuario)
            .then(async() => {
              let alert = await this.alertCtrl.create({
                header: 'Ebaaa! 😃',
                message: 'Você está cadastrado.',
                buttons:[{
                  text: 'Vamos lá!',
                  handler: ()=> this.rota.navigate(['login'])
                }]
              });
              await alert.present();
              console.log("Pegou!");
              this.bdService.insertInList<Usuario>('/usuarios',this.usuario);
            
            })
            .catch(async(error: any) => {
              if(error.code == 'auth/email-already-in-use'){
                console.log("O e-mail digitado já está em uso");
                let alert = await this.alertCtrl.create({
                  header: 'Que pena! 😢 ',
                  message: 'O usuário já existe.',
                  buttons:[{
                    text:"Ok"
                  }]
                });
                await alert.present();
              } else if(error.code == 'auth/invalid-email'){
                console.log("O e-mail digitado não é valido");
                let alert = await this.alertCtrl.create({
                  header: 'Que pena! 😢 ',
                  message: 'O email digitado não é válido',
                  buttons:[{
                    text:"Ok"
                  }]
                });
                await alert.present();
              } else if(error.code == 'auth/operation-not-allowed'){
                console.log("Não está habilitado criar usuários");
                let alert = await this.alertCtrl.create({
                  header: 'Que pena! 😢 ',
                  message: 'Você não está habilitado a criar usuários',
                  buttons:[{
                    text:"Ok"
                  }]
                });
                await alert.present();
              } else if(error.code == 'auth/weak-password'){
                console.log("A senha digitada é muito fraca");
                let alert = await this.alertCtrl.create({
                  header: 'Que pena! 😢 ',
                  message: 'A senha digitada é muito fraca',
                  buttons:[{
                    text:"Ok"
                  }]
                });
                await alert.present();
              }
            });
      }
  }
  
  maiuscula(palavra){
    palavra = palavra.split("");
    var espaco = "";
    for(var i=0;i<palavra.length;i++){
      if(palavra[i-1]){
      if(palavra[i-1]==" "){palavra[i]=palavra[i].replace(palavra[i],palavra[i].toUpperCase());}
      }
      else{palavra[i]=palavra[i].replace(palavra[i],palavra[i].toUpperCase());}
      espaco+=palavra[i];
      }
      palavra = espaco;
      return palavra;

  }
  
  abrirPagina(url:String){
    this.rota.navigate([url]);
 }
 

  ngOnInit() {

  }
  
}
