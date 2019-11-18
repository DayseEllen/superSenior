import { Autenticacao } from '../services/autenticacao';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  constructor(private rota:Router,  private autenticacao : Autenticacao) { 
  }

  ngOnInit(){
  }

  abrirPagina(url:String){
    this.rota.navigate([url]);
  }
}
