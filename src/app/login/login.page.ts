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

  usuario: Usuario;
  
  constructor(private rota: Router, private autenticacao : Autenticacao, private alertCtrl: AlertController, private location: Location) { 
    //
    //this.usuario = new Usuario( null,null, null,null);
   }

  @ViewChild('login') form: NgForm;

 

  ngOnInit() {
    //this.usuario = new Usuario( null, null, null, null);
  }

  abrirPagina(url:String){
    this.rota.navigate([url]);

  }


}
