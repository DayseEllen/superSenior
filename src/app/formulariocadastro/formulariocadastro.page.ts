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
  private usuarios: Usuario[];
  constructor(private rota:Router, private bdService: BDService, private alertCtrl: AlertController) { }

  
  async cadastrarUsuario(cadastro){
    this.usuarios = await this.bdService.listWithUIDs<Usuario>('/usuarios');
    for(var i =0;i<this.usuarios.length;i++){
      if(cadastro.email==this.usuarios[i].email && cadastro.senha == this.usuarios[i].senha){
        let alert = await this.alertCtrl.create({
          header: 'Falha no cadastro 😢',
          message: 'O usuário já existe.',
          buttons:[
            'Ok'
          ]
        });
        await alert.present();
        break;
      }else{
        if(cadastro.email!=this.usuarios[i].email && cadastro.senha != this.usuarios[i].senha){
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
          this.rota.navigate(['login']);
          break;
        }
      } 
      }

  }
  abrirPagina(url:String){
    this.rota.navigate([url]);
 }
 

  ngOnInit() {
  }
  
}
