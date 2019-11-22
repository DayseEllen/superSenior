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
  
  constructor( private autenticacao : Autenticacao, 
    private rota: Router, private bdService: BDService,) {
      this.carregarUsuarios();
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
  }
  


  singOut(){
   this.autenticacao.logout();
 }
  
}

