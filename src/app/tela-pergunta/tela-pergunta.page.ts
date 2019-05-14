import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-pergunta',
  templateUrl: './tela-pergunta.page.html',
  styleUrls: ['./tela-pergunta.page.scss'],
})
export class TelaPerguntaPage implements OnInit {
  

  constructor(private rota: Router) { }

  ngOnInit() {
  }

  abrirPagina(url:String){
    this.rota.navigate([url]);

  }

}
