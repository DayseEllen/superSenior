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
    ) { }

  @ViewChild('cadastro') form: NgForm;

    createAccount(cadastro){
      if (this.form.form.valid){
        this.usuario = {
          nome: "Dayse",
          email: cadastro.email,
          senha: cadastro.senha,
          telefone: null,
          genero: "feminino",
          perguntasRespondidas: null
        }
        console.log(this.usuario.email);
            this.autenticacao.createUser(this.usuario)
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

 /* async cadastrarUsuario(cadastro){
    this.usuarios = await this.bdService.listWithUIDs<Usuario>('/usuarios');
    if(this.conferirSeExiste(cadastro,this.usuarios)){
      let alert = await this.alertCtrl.create({
        header: 'Falha no cadastro 😢',
        message: 'O usuário já existe.',
        buttons:[
          'Ok'
        ]
      });
      await alert.present();
      console.log("Existe")
    }else
      if(!this.conferirSeExiste(cadastro,this.usuarios)){
        this.usuario = {
          nome: cadastro.nome,
          email: cadastro.email,
          senha: cadastro.senha,
          telefone: null,
          genero: cadastro.genero,
          perguntasRespondidas: null
        }
        this.bdService.insertInList<Usuario>('/usuarios',this.usuario);
        let alert = await this.alertCtrl.create({
          header: 'Ebaa! 😃',
          message: 'Você está cadastrado.',
          buttons:['Ok']
        });
        await alert.present();
        console.log("Não existe")
        this.rota.navigate(['login']);

      }

  }

 private conferirSeExiste(cadastro, usuarios:Usuario[]){
   for(var i=0;i<usuarios.length;i++){
   if(usuarios[i].email == cadastro.email){
     return true;
   }
  }
  return false;

  }
  */
  abrirPagina(url:String){
    this.rota.navigate([url]);
 }
 

  ngOnInit() {
  }
  
}
