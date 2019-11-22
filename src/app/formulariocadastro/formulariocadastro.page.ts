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
   usuario: Usuario=null;
   usuarios: Usuario[]=[];
  constructor(private rota:Router, 
    private bdService: BDService, 
    private alertCtrl: AlertController, 
    private autenticacao : Autenticacao, 
    ) { 
this.carregarUsuarios();
    }

    private async carregarUsuarios(){
      this.usuarios = await this.bdService.listWithUIDs<Usuario>('/usuarios');
  
    }

@ViewChild('cadastro') form: NgForm
 async cadastrarComGoogle(cadastro){
   if(this.form.form.valid===true){
    await this.autenticacao.signInWithGoogle();
    if(this.verificaSeExiste()==false){
      this.usuario = new Usuario(
        this.autenticacao.getUid(),this.autenticacao.getDisplayName(),
        this.autenticacao.getEmail(),cadastro.genero,cadastro.idade,0,0,0);
         this.inserirUsuario(this.usuario);
     }else{
       console.log("User já castrado antes")
     }



    
}
  }
 

  verificaSeExiste(){
    for(var i=0;i<this.usuarios.length;i++){
      if(this.usuarios[i].email===this.autenticacao.getEmail()){
        return true;
      }
    }
    return false;
  }

 private async inserirUsuario(usuario){
   await this.bdService.insertInList<Usuario>('/usuarios',usuario);
  }



  abrirPagina(url:String){
    this.rota.navigate([url]);
 }
 

  ngOnInit() {

  }
  
}
