import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-arrasta',
  templateUrl: './tela-arrasta.page.html',
  styleUrls: ['./tela-arrasta.page.scss'],
})
export class TelaArrastaPage implements OnInit {

  constructor(private rota: Router) { }

  ngOnInit() {
  }

  abrirPagina(url:String){
    this.rota.navigate([url]);

  }

}
