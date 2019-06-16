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

  goForms(){
    this.rota.navigate(['formulariocadastro'])
  }
  
  goLogin(){
    this.rota.navigate(['login'])
  }



}
