import { Autenticacao } from './../services/autenticacao';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';



@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {


  constructor(private rota: Router, private menu: MenuController) {
      this.menu.enable(false);
   
   }


  

  

  ngOnInit() {
  }
  
  goLogin(){
    this.rota.navigate(['login'])
  }
  goCadastrar(){
    this.rota.navigate(['formulariocadastro']);
  }



}
