import { BDService } from './../services/bd.service';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Autenticacao } from '../services/autenticacao';
import { Usuario } from 'src/models/usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  usuario: Usuario;
  usuarios: Usuario[] = [];

  constructor(private rota:Router,  private autenticacao : Autenticacao, private bdService: BDService) { 
    this.carregarUsuarios();
  }

  async carregarUsuarios(){
    this.usuarios = await this.bdService.listWithUIDs<Usuario>('/usuarios');
    this.getUser();
  }
  private getUser() {
    this.usuario=null;
    if(this.autenticacao.isLoggedIn()){
      for (var i = 0; i < this.usuarios.length; i++) {
        if (this.autenticacao.getEmail() === this.usuarios[i].email) {
          this.usuario = this.usuarios[i];
        }
    }
    }
    return this.usuario;
  }
  ngOnInit(){
  }

  abrirPagina(url:String){
    this.rota.navigate([url]);
  }
}
