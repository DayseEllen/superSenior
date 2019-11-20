import { async } from '@angular/core/testing';
import { BDService } from './../services/bd.service';
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

  usuarios: Usuario[]=[];
  usuario: Usuario=null;
  
  constructor(private rota: Router, private autenticacao : Autenticacao, private alertCtrl: AlertController, private location: Location, private bdService: BDService) { 
  
    
   }

  @ViewChild('login') form: NgForm;

  private async carregarUsuarios(){
    this.usuarios = await this.bdService.listWithUIDs<Usuario>('/usuarios');

  }



  async loginGoogle(){
     await this.autenticacao.signInWithGoogle();
     if(this.verificaSeExiste()==false){
      this.usuario = new Usuario(
        this.autenticacao.getUid(),this.autenticacao.getDisplayName(),this.autenticacao.getEmail());
         this.inserirUsuario(this.usuario);
     }else{
       console.log("User já castrado antes")
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

 

  ngOnInit() {
    this.carregarUsuarios();
  }

  abrirPagina(url:String){
    this.rota.navigate([url]);

  }


}
