import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BDService } from '../services/bd.service';

import {Imagem} from 'src/models/imagem';


@Component({
  selector: 'app-tela-arrasta',
  templateUrl: './tela-arrasta.page.html',
  styleUrls: ['./tela-arrasta.page.scss'],
  providers: [BDService]
})
export class TelaArrastaPage implements OnInit {

  imagens: Imagem[];
  imagem: Imagem;
  carregadas: Imagem[];
  imagemEscolhida: Imagem;
  imgsUtilizadas: Imagem[];
  nome1: string;
  nome2: string;
  nome3: string;

  constructor(private rota: Router, private bdService: BDService) {
   // this.inserirImagens();
   this.carregarImagens();
  
   }
   
   private async carregarImagens(){
     this.imagens = await this.bdService.listWithUIDs<Imagem>('/imagens');
     this.imagensSelecionadas();
   }

   randomImagem(){
    this.imagemEscolhida = this.imagens[Math.floor(this.imagens.length * Math.random())];
    for (var i = 0; i < this.imagens.length; i++) {
      if (this.imagens[i].url == this.imagemEscolhida.url) {
        this.imagens.splice(i, 1);
      }
    }
     return this.imagemEscolhida;
   }

   imagensSelecionadas(){
     this.carregadas=[];
     var nomes=[];
     for(var i = 0;i < 4;i++){
       this.imagem = this.randomImagem();
       this.carregadas.push(new Imagem(this.imagem.url));
       nomes.push(this.imagem.nome);
    }
    this.nome1=nomes.pop();
    this.nome2=nomes.pop();
    this.nome3=nomes.pop();
   }
 
  ngOnInit() {
  }

  abrirPagina(url:String){
    this.rota.navigate([url]);
  }
 /* inserirImagens(){
    const imagens =
    [
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/alarme.png?alt=media&token=8306d8d6-d66b-46e2-90d9-ed0e4f226867', nome:'Alarme'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/bluetooth.png?alt=media&token=18a31869-7670-48ae-b4da-9cd2f767a6eb', nome:'Bluetooth'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/bombeiros.png?alt=media&token=4a452df0-cd19-4cff-98c6-3700f90503bf', nome:'Bombeiros-193'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/camera.png?alt=media&token=c4f70dcd-920f-4887-be70-ebc3bfba80b7', nome:'Câmera'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/chorme.png?alt=media&token=0297d4e4-78cf-4899-adb8-82ea96aff999', nome:'Chrome'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/contatos.jpg?alt=media&token=7806ee21-9e90-4843-8330-73e2bdd86a37', nome:'Contatos'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/dadosmoveis.jpg?alt=media&token=22f9a8cf-76a7-4fcc-a82e-e07fb99c8a47', nome:'Dados móveis'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/facebook.png?alt=media&token=e4b7a927-5d71-417f-bacc-38b44b055a94', nome:'Facebook'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/galeria.jpg?alt=media&token=b21f865e-5732-4920-85bc-4bb11a7841ec', nome:'Galeria'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/instagram.png?alt=media&token=c27846c9-f20b-4b85-bc81-c3116ffdc3bc', nome:'Instagram'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/instagram.png?alt=media&token=c27846c9-f20b-4b85-bc81-c3116ffdc3bc', nome:'Lanterna'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/localizacao.png?alt=media&token=ec939e8a-eb7c-40f2-a37b-42e98433e822', nome:'Localização'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/messenger.png?alt=media&token=ccc1673e-c163-410a-86ec-e4c6f744af78', nome:'Messenger'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/modo_aviao.png?alt=media&token=56b7ff16-480f-48e9-b073-764a5cbe90f8', nome:'Modo avião'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/mudo.png?alt=media&token=15c6dc95-00f1-4c17-b2da-56583689a414', nome:'Perfil de Som - Mudo'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/playstore.png?alt=media&token=e342dc70-fda9-4f23-af15-4f47c4bbef2f', nome:'Play Store'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/policia.png?alt=media&token=b24f4395-495d-441b-a8da-a0e055f339e7', nome:'Policia - 190'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/rota%C3%A7%C3%A3o%20de%20tela.png?alt=media&token=e5ab9077-ef7c-4a99-9a8a-e27a0fdf38ad', nome:'Rotação de tela'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/Samu.jpg?alt=media&token=9c82cb49-f576-45fa-88dd-1c771e927e50', nome:'Samu - 192'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/som_e_vibracao.png?alt=media&token=af682d41-d7ad-401a-8aad-3bb6be70fe11', nome:'Perfil de som - Com som'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/telefone.png?alt=media&token=7d4cdb29-720f-49f2-bfeb-9c8cb3a15c00', nome:'Telefone'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/vibra%C3%A7ao.jpg?alt=media&token=efdd7f7a-5b1b-4512-92bf-0401e61a0d3e', nome:'Perfil de Som - Vibrar'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/whatsapp.png?alt=media&token=8a4290f8-9852-4dbb-af39-910d0a600f46', nome:'WhatsApp'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/wifi.png?alt=media&token=10a6568f-50e8-422d-8596-d6eebed6bd04', nome:'WiFi'},
      {url:'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/youtube.png?alt=media&token=d84ddb5b-aceb-4f36-887b-2116dc731e78', nome:'Youtube'}
  
    ];
    imagens.forEach(async imagem => await this.bdService.insertInList<Imagem>('/imagens',imagem));
  }*/





}
