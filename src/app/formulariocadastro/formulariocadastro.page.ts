import { BDService } from '../services/bd.service';
import { Usuario } from './../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulariocadastro',
  templateUrl: './formulariocadastro.page.html',
  styleUrls: ['./formulariocadastro.page.scss'],
  providers:[BDService]
})
export class FormulariocadastroPage implements OnInit {
   usuario:Usuario;
  constructor(private rota:Router, private bdService: BDService) { }

  
  cadastrarUsuario(cadastro){
    this.usuario = {
      nome: cadastro.nome,
      email: cadastro.email,
      senha: cadastro.senha,
      telefone: null,
      genero: cadastro.genero,
      perguntasRespondidas: null
    }
    this.bdService.insertInList<Usuario>('/usuarios',this.usuario);
    //console.log(this.usuario);
  }
  abrirPagina(url:String){
    this.rota.navigate([url]);

  }

  ngOnInit() {
  }
  
}
