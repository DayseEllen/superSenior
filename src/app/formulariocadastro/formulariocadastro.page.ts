import { AlertController } from '@ionic/angular';
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
   usuarios: Usuario[];
  constructor(private rota:Router, private bdService: BDService, private alertCtrl: AlertController) { }

  

  async cadastrarUsuario(cadastro){
    this.usuarios = await this.bdService.listWithUIDs<Usuario>('/usuarios');
    if(this.conferirSeExiste(cadastro,this.usuarios)){
      let alert = await this.alertCtrl.create({
        header: 'Falha no cadastro 😢',
        message: 'O usuário já existe.',
        buttons:[
          'Ok'
        ]
      });
      await alert.present();
      console.log("Existe")
    }else
      if(!this.conferirSeExiste(cadastro,this.usuarios)){
        this.usuario = {
          nome: cadastro.nome,
          email: cadastro.email,
          senha: cadastro.senha,
          telefone: null,
          genero: cadastro.genero,
          perguntasRespondidas: null
        }
        this.bdService.insertInList<Usuario>('/usuarios',this.usuario);
        let alert = await this.alertCtrl.create({
          header: 'Ebaa! 😃',
          message: 'Você está cadastrado.',
          buttons:['Ok']
        });
        await alert.present();
        console.log("Não existe")
        this.rota.navigate(['login']);

      }

  }

 private conferirSeExiste(cadastro, usuarios:Usuario[]){
   for(var i=0;i<usuarios.length;i++){
   if(usuarios[i].email == cadastro.email){
     return true;
   }
  }
  return false;

  }
  
  abrirPagina(url:String){
    this.rota.navigate([url]);
 }
 

  ngOnInit() {
  }
  
}
