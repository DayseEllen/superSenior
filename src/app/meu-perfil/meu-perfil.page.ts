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
  porcentagem: string;
  nivel: string;
  pontosP: number;
  
  constructor( private autenticacao : Autenticacao, 
    private rota: Router, private bdService: BDService,) {
      this.carregarUsuarios();
}
private async carregarUsuarios(){
  this.usuarios = await this.bdService.listWithUIDs<Usuario>('/usuarios');
    this.getUser();
    this.pontosP = this.usuario.pontosPerguntas;
    this.calcularNivelPergunta();
    this.calcularPorcentagem();
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
    
  }
  
  singOut(){
   this.autenticacao.logout();
 }

 calcularPorcentagem(){
  if(this.nivel == "Nível 1"){
     this.porcentagem = String(((100 * this.usuario.pontosPerguntas) / 6).toFixed(0));
  }
  if(this.nivel == "Nível 2"){
    this.porcentagem = String(((100 * (this.usuario.pontosPerguntas-6)) / 6).toFixed(0));
  }
  if(this.nivel == "Nível 3"){
    this.porcentagem = String(((100 * (this.usuario.pontosPerguntas-12)) / 6).toFixed(0));
  }
}

calcularNivelPergunta(){
  if (!this.usuario) {
    this.usuario = <Usuario> {};
    this.usuario.pontosPerguntas = this.pontosP;
   }

  if(this.usuario.pontosPerguntas >=0 && this.usuario.pontosPerguntas <6){
      this.nivel = "Nível 1";
    }
    if(this.usuario.pontosPerguntas >=6 && this.usuario.pontosPerguntas <12){
      this.nivel = "Nível 2";
    }
    if(this.usuario.pontosPerguntas >=12 && this.usuario.pontosPerguntas <18){
      this.nivel  = "Nível 3";
    }
}

}