import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  constructor(private rota: Router) { }

  ngOnInit() {
  }
  
  goLogin(){
    this.rota.navigate(['login'])
  }
  goCadastrar(){
    this.rota.navigate(['formulariocadastro']);
  }



}
