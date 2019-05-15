import { BdperguntaService } from './../services/bdpergunta.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerguntaI } from 'src/models/pergunta.interface';

@Component({
  selector: 'app-tela-pergunta',
  templateUrl: './tela-pergunta.page.html',
  styleUrls: ['./tela-pergunta.page.scss'],
})
export class TelaPerguntaPage implements OnInit {
 
  perguntas: PerguntaI[];
  constructor(private rota: Router, private bdpergunta: BdperguntaService) { }

  ngOnInit() {
    this.bdpergunta.listar<PerguntaI>(this.perguntas)
      .subscribe(res => this.perguntas = res);
    
    
  }

  abrirPagina(url:String){
    this.rota.navigate([url]);

  }

}
