import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Autenticacao } from '../services/autenticacao';
import { Router } from '@angular/router';
import { Usuario } from 'src/models/usuario';
import { BDService } from '../services/bd.service';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.page.html',
  styleUrls: ['./meu-perfil.page.scss'],
})

export class MeuPerfilPage implements OnInit {
  usuario: Usuario;
  usuarios: Usuario[]=[];
  porcentagemP: string;
  porcentagemM: string;
  
  constructor( private autenticacao : Autenticacao, 
    private rota: Router, private bdService: BDService,) {
      this.porcentagemP='50'
      this.porcentagemM='50'
}
private async carregarUsuarios(){
  this.usuarios = await this.bdService.listWithUIDs<Usuario>('/usuarios');
    this.getUser();
  
}
  private getUser(){
     this.usuario=null;
       if(this.autenticacao.isLoggedIn()){
       for(var i=0;i<this.usuarios.length;i++){
         if(this.autenticacao.getEmail()===this.usuarios[i].email){
           this.usuario=this.usuarios[i];
         }
       }
       }
       return this.usuario;
     }

     

  ngOnInit() {
    this.carregarUsuarios();
    
  }
  
  singOut(){
   this.autenticacao.logout();
 }

  calcularNivelPergunta(){
    if (!this.usuario) {
      this.usuario = <Usuario> {};
      this.usuario.pontosPerguntas = 50;
    }

    if(this.usuario.pontosPerguntas >=0 && this.usuario.pontosPerguntas <6){
        return "Nível 1";
      }
      if(this.usuario.pontosPerguntas >=6 && this.usuario.pontosPerguntas <12){
        return "Nível 2";
      }
      if(this.usuario.pontosPerguntas >=12 && this.usuario.pontosPerguntas <18){
        return "Nível 3";
      }
 }

  calcularPorcentagem(){
   if(this.usuario.pontosPerguntas == 0 || this.usuario.pontosPerguntas == 6 || this.usuario.pontosPerguntas == 12){
    return 0;
   }
   if(this.usuario.pontosPerguntas == 1 || this.usuario.pontosPerguntas == 7 || this.usuario.pontosPerguntas == 13){
    return 20;
   }
   if(this.usuario.pontosPerguntas == 2 || this.usuario.pontosPerguntas == 8 || this.usuario.pontosPerguntas == 14){
    return '35%';
  }
  if(this.usuario.pontosPerguntas == 3 || this.usuario.pontosPerguntas == 9 || this.usuario.pontosPerguntas == 15){
    return '50%';
  }
  if(this.usuario.pontosPerguntas == 4 || this.usuario.pontosPerguntas == 10 || this.usuario.pontosPerguntas == 16){
    return '70%';
  }
  if(this.usuario.pontosPerguntas == 5 || this.usuario.pontosPerguntas == 11 || this.usuario.pontosPerguntas == 17){
    return '85%';
 }
  
}

calcularNivelMemoria(){
  if (!this.usuario) {
    this.usuario = <Usuario> {};
    this.usuario.pontosPerguntas = 50;
  }

  if(this.usuario.pontosMemoria >=0 && this.usuario.pontosMemoria <6){
      return "Nível 1";
    }
    if(this.usuario.pontosMemoria >=6 && this.usuario.pontosMemoria <12){
      return "Nível 2";
    }
    if(this.usuario.pontosMemoria >=12 && this.usuario.pontosMemoria <18){
      return "Nível 3";
    }
}

calcularPorcentagemMemoria(){
  if(this.usuario.pontosMemoria == 0 || this.usuario.pontosMemoria == 6 || this.usuario.pontosMemoria == 12){
   return '0';
  }
  if(this.usuario.pontosMemoria == 1 || this.usuario.pontosMemoria == 7 || this.usuario.pontosMemoria == 13){
   return '20';
  }
  if(this.usuario.pontosMemoria == 2 || this.usuario.pontosMemoria == 8 || this.usuario.pontosMemoria == 14){
   return '35%';
 }
 if(this.usuario.pontosMemoria == 3 || this.usuario.pontosMemoria == 9 || this.usuario.pontosMemoria == 15){
   return '50%';
 }
 if(this.usuario.pontosMemoria == 4 || this.usuario.pontosMemoria == 10 || this.usuario.pontosMemoria == 16){
   return '70%';
 }
 if(this.usuario.pontosMemoria == 5 || this.usuario.pontosMemoria == 11 || this.usuario.pontosMemoria == 17){
   return '85%';
}
 
}

}