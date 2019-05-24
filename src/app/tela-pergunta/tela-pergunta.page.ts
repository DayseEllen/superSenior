import { BDService } from '../services/bd.service';


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pergunta } from 'src/models/pergunta';

@Component({
  selector: 'app-tela-pergunta',
  templateUrl: './tela-pergunta.page.html',
  styleUrls: ['./tela-pergunta.page.scss'],
  providers: [BDService]
})
export class TelaPerguntaPage implements OnInit {
 
  constructor(private rota: Router, private bdService: BDService) {
    //this.inserirPerguntas();
   }

   //private async inserirPerguntas() {
   // const perguntas = 
    // [
     //   { enunciado: '1 + 1 = ?', resposta: '2', alternativas: [ '1', '2', '3' ] },
      //  { enunciado: '1 + 2 = ?', resposta: '3', alternativas: [ '2', '3', '4' ] }
    // ];

   //  perguntas.forEach(async pergunta => await this.bdService.insertInList<Pergunta>('/perguntas', pergunta));
   //}

  ngOnInit() {
    
    }
   
    mostrarPergunta(){
      console.log(this.bdService.getObjectByKey<Pergunta>('/perguntas','LfKTsB8QdWS5aOZtUDZ'))
      
    }


  abrirPagina(url:String){
    this.rota.navigate([url]);

  }

}
