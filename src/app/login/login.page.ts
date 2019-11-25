import { async } from '@angular/core/testing';
import { BDService } from './../services/bd.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NgForm } from '@angular/forms';
import { Autenticacao } from '../services/autenticacao';
import { Usuario } from 'src/models/usuario';
import { AlertController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuarios: Usuario[]=[];
  usuario: Usuario=null;
  
  constructor(private rota: Router, private autenticacao : Autenticacao, private alertCtrl: AlertController, private location: Location, private bdService: BDService) { 
  
    this.carregarUsuarios();
   }

  @ViewChild('login') form: NgForm;

  private async carregarUsuarios(){
    this.usuarios = await this.bdService.listWithUIDs<Usuario>('/usuarios');

  }
  async loginGoogle(){
     await this.autenticacao.signInWithGoogle();
     
  }

 
  ngOnInit() {
    
  }

  abrirPagina(url:String){
    this.rota.navigate([url]);

  }


}
