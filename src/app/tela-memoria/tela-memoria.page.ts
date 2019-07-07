import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-memoria',
  templateUrl: './tela-memoria.page.html',
  styleUrls: ['./tela-memoria.page.scss'],
})
export class TelaMemoriaPage implements OnInit {

  isZeroSelecionada: boolean;

  constructor(private rota: Router) { }

  ngOnInit() {
   // this.carregarImagens();
  }

  modificarSelecaoZero() {
    this.isZeroSelecionada = !this.isZeroSelecionada;
  }

  abrirPagina(url:String){
    this.rota.navigate([url]);

  }
}
