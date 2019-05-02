import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulariocadastro',
  templateUrl: './formulariocadastro.page.html',
  styleUrls: ['./formulariocadastro.page.scss'],
})
export class FormulariocadastroPage implements OnInit {

  constructor(private rota:Router) { }

  ngOnInit() {
  }
  goInit(){
    this.rota.navigate(['cadastrar'])
  }

}
