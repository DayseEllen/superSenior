import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-memoria',
  templateUrl: './tela-memoria.page.html',
  styleUrls: ['./tela-memoria.page.scss'],
})
export class TelaMemoriaPage implements OnInit {

  constructor(private rota: Router) { }

  ngOnInit() {
  }

  abrirPagina(url:String){
    this.rota.navigate([url]);

  }
}
