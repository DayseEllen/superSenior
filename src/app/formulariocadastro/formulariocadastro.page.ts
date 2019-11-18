import { AlertController, ToastController } from '@ionic/angular';
import { BDService } from '../services/bd.service';
import { Usuario } from './../../models/usuario';
import { Autenticacao } from '../services/autenticacao';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { async } from 'q';



@Component({
  selector: 'app-formulariocadastro',
  templateUrl: './formulariocadastro.page.html',
  styleUrls: ['./formulariocadastro.page.scss'],
  providers:[BDService]
})
export class FormulariocadastroPage implements OnInit {
   usuario: Usuario;
   usuarios: Usuario[];
  constructor(private rota:Router, 
    private bdService: BDService, 
    private alertCtrl: AlertController, 
    private autenticacao : Autenticacao, 
    ) { 

    }

  @ViewChild('cadastro') form: NgForm;

  
  
  maiuscula(palavra){
    palavra = palavra.split("");
    var espaco = "";
    for(var i=0;i<palavra.length;i++){
      if(palavra[i-1]){
      if(palavra[i-1]==" "){palavra[i]=palavra[i].replace(palavra[i],palavra[i].toUpperCase());}
      }
      else{palavra[i]=palavra[i].replace(palavra[i],palavra[i].toUpperCase());}
      espaco+=palavra[i];
      }
      palavra = espaco;
      return palavra;

  }
  
  abrirPagina(url:String){
    this.rota.navigate([url]);
 }
 

  ngOnInit() {

  }
  
}
