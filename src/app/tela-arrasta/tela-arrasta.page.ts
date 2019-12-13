import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
//import { DragulaService } from 'ng2-dragula/components/dragula.provider';

import { BDService } from '../services/bd.service';

import { Imagem } from 'src/models/imagem';


import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/models/usuario';
import { Autenticacao } from '../services/autenticacao';



@Component({
  selector: 'app-tela-arrasta',
  templateUrl: './tela-arrasta.page.html',
  styleUrls: ['./tela-arrasta.page.scss'],
  providers: [BDService]
})
export class TelaArrastaPage implements OnInit, OnDestroy {



  imagensCarregadas: Imagem[];
  imagem: Imagem;
  imagens: Imagem[];
  imagens2: Imagem[];
  imagemEscolhida: Imagem;
  nomes = [];
  isOk: boolean;
  subs = new Subscription();
  janelasOk: boolean[] = [false, false, false, false, false, false, false];
  janela1 = [];
  janela2 = [];
  janela0 = [];
  janela3 = [];
  janela4 = [];
  janela5 = [];
  janela6 = [];
  allImagesSelect: Imagem[] = [];
  pontos: number = 0;
  nivel: number = 1;
  nivel1: boolean = false;
  nivel2: boolean = false;
  nivel3: boolean = false;
  usuario: Usuario;
  user: Usuario;
  usuarios: Usuario[] = [];
  pontosAS: number = 0;
  qt: number;
  porcentagemAS: string;
  nivelA: string;
  sit: boolean;
  porcentagem: string;
  telaIs: boolean = true;

  constructor(private rota: Router, private alert: AlertController, private bdService: BDService, private dragulaService: DragulaService, private elementRef: ElementRef, private autenticacao: Autenticacao) {
    this.carregarUsuarios();
    this.carregarImagens();
  }

  private async carregarUsuarios() {
    this.usuarios = await this.bdService.listWithUIDs<Usuario>('/usuarios');
    this.getUser();
    this.pontosAS = this.usuario.pontosArrasta;
    this.calcularNivel();
    this.calcularPorcentagem();
  }
  calcularPorcentagem() {
    if (this.nivel === 1) {
      this.porcentagem = String(((100 * this.pontosAS) / 15).toFixed(0));
    } else
      if (this.nivel === 2) {

        this.porcentagem = String(((100 * (this.pontosAS - 15)) / 20).toFixed(0));
      } else
        if (this.nivel === 3) {
          this.porcentagem = String(((100 * (this.pontosAS - 35)) / 21).toFixed(0));
        }
  }
  calcularNivel() {
    if (!this.usuario) {
      this.usuario = <Usuario>{};
      this.usuario.pontosArrasta = this.pontosAS;
    }

    if (this.pontosAS >= 0 && this.pontosAS < 15) {
      this.nivel = 1;
      this.nivel1 = true;
    }
    if (this.pontosAS >= 15 && this.pontosAS < 35) {
      this.nivel = 2;
      this.nivel2 = true;
    }
    if (this.pontosAS >= 35 && this.pontosAS <= 56) {
      this.nivel = 3;
      this.nivel3 = true;
    }
  }
  private getUser() {
    this.usuario = null;
    if (this.autenticacao.isLoggedIn()) {
      for (var i = 0; i < this.usuarios.length; i++) {
        if (this.autenticacao.getEmail() === this.usuarios[i].email) {
          this.usuario = this.usuarios[i];
        }
      }
    }
    return this.usuario;
  }


  containerUmModificado() {
    this.janelasOk[0] = true;

    if (this.nomes[0] === this.janela0[0].nome) {
      this.pontos++;
      this.pontosAS++;
      this.verificaPontosFaseNivel();
    } else {
      setTimeout(() => {
        this.exibirMensagemErro();
      }, 400);
    }
  }
  containerDoisModificado() {
    this.janelasOk[1] = true;

    if (this.nomes[1] === this.janela1[0].nome) {
      this.pontos++;
      this.pontosAS++;
      this.verificaPontosFaseNivel();
    } else {
      setTimeout(() => {
        this.exibirMensagemErro();
      }, 400);
    }
  }
  containerTresModificado() {
    this.janelasOk[2] = true;

    if (this.nomes[2] === this.janela2[0].nome) {
      this.pontos++;
      this.pontosAS++;
      this.verificaPontosFaseNivel();
    } else {
      setTimeout(() => {
        this.exibirMensagemErro();
      }, 400);
    }
  }
  containerQuatroModificado() {
    this.janelasOk[3] = true;

    if (this.nomes[3] === this.janela3[0].nome) {
      this.pontos++;
      this.pontosAS++;
      this.verificaPontosFaseNivel();
    } else {
      setTimeout(() => {
        this.exibirMensagemErro();
      }, 400);
    }
  }
  containerCincoModificado() {
    this.janelasOk[4] = true;

    if (this.nomes[4] === this.janela4[0].nome) {
      this.pontos++;
      this.pontosAS++;
      this.verificaPontosFaseNivel();
    } else {
      setTimeout(() => {
        this.exibirMensagemErro();
      }, 400);
    }
  }
  containerSeisModificado() {
    this.janelasOk[5] = true;

    if (this.nomes[5] === this.janela5[0].nome) {
      this.pontos++;
      this.pontosAS++;
      this.verificaPontosFaseNivel();
    } else {
      setTimeout(() => {
        this.exibirMensagemErro();
      }, 400);
    }
  }
  containerSeteModificado() {
    this.janelasOk[6] = true;

    if (this.nomes[6] === this.janela6[0].nome) {
      this.pontos++;
      this.pontosAS++;
      this.verificaPontosFaseNivel();
    } else {
      setTimeout(() => {
        this.exibirMensagemErro();
      }, 400);
    }
  }
  private async carregarImagens() {
    this.imagensCarregadas = await this.bdService.listWithUIDs<Imagem>('/imagens');
    this.imagensSelecionadas();
    this.randomNomes();
    if (!this.dragulaService.find("bag")) {
      this.dragulaService.createGroup("bag", {
        revertOnSpill: true,
        removeOnSpill: false
      });
    }
  }

  randomImagem() {
    this.imagemEscolhida = this.imagensCarregadas[Math.floor(this.imagensCarregadas.length * Math.random())];
    for (var i = 0; i < this.imagensCarregadas.length; i++) {
      if (this.imagensCarregadas[i].url == this.imagemEscolhida.url) {
        this.imagensCarregadas.splice(i, 1);
      }
    }
    return this.imagemEscolhida;
  }

  imagensSelecionadas() {
    this.imagens = [];
    this.nomes = [];
    for (var i = 0; i < (this.nivel * 2) + 2; i++) {
      this.imagem = this.randomImagem();
      this.imagens.push(this.imagem);
      this.nomes.push(this.imagem.nome);
    }
    this.allImagesSelect = this.imagens;
    this.telaIs = true;
  }

  randomNomes() {
    var ind_atual = this.nomes.length, val_tempo, ind_al;
    while (0 !== ind_atual) {

      ind_al = Math.floor(Math.random() * ind_atual);
      ind_atual -= 1;

      val_tempo = this.nomes[ind_atual];
      this.nomes[ind_atual] = this.nomes[ind_al];
      this.nomes[ind_al] = val_tempo;
    }
    return this.nomes;
  }

  async exibirMensagemErro() {
    let alert = await this.alert.create({
      header: 'Que pena! 😢 Você errou',
      message: 'Está quase lá, preste mais atenção na próxima!',
      cssClass: 'alertsp',
      buttons: [
        {
          text: 'Clique aqui para tentar novamente.',
          handler: () => {
            this.zerarFase()
            this.zerarJanelas()
          }
        }
      ]
    });
    await alert.present();
  }
  async exibirMensagemGanhouFase() {
    let alert = await this.alert.create({
      header: 'Parabéns!!! Você conquistou essa fase. 😃',
      message: 'Continue assim e você logo subirá de nível',
      cssClass: 'alertsp',
      buttons: [
        {
          text: 'Clique aqui avançar de fase.',
          handler: () => this.proximaFase()
        }
      ]
    });
    await alert.present();
  }
  async exibirMensagemNivel2() {
    let alert = await this.alert.create({
      header: 'Parabéns!!! Você conquistou essa  e avançou de nível. 😃',
      message: 'Agora você está no nível 2!',
      cssClass: 'alertsp',
      buttons: [
        {
          text: 'Clique aqui para avançar de nível.',
          handler: () => this.exibirNivel2()
        }
      ]
    });
    await alert.present();
  }
  async exibirMensagemNivel3() {
    let alert = await this.alert.create({
      header: 'Parabéns!!! Você conquistou essa  e avançou de nível. 😃',
      message: 'Agora você está no nível 3!',
      cssClass: 'alertsp',
      buttons: [
        {
          text: 'Clique aqui para avançar de nível.',
          handler: () => this.exibirNivel3()
        }
      ]
    });
    await alert.present();
  }
  zerarJanelas() {
    this.janelasOk[0] = false;
    this.janelasOk[1] = false;
    this.janelasOk[2] = false;
    this.janelasOk[3] = false;
    this.janelasOk[4] = false;
    this.janelasOk[5] = false;
    this.janelasOk[6] = false;
    this.janela0 = [];
    this.janela1 = [];
    this.janela2 = [];
    this.janela3 = [];
    this.janela4 = [];
    this.janela5 = [];
    this.janela6 = [];
    this.pontos = 0;
  }
  zerarFase() {
    this.imagens = this.allImagesSelect;
    if (this.pontosAS === 15 || this.pontosAS === 35) {
      this.calcularPorcentagem();
    } else {
      this.pontosAS -= this.pontos;
      this.calcularPorcentagem();
    }
  }
 

  proximaFase() {
    this.sit = this.alterarNivel();
    this.imagensCarregadas.push(this.imagens[0]);
    if (this.imagensCarregadas.length <8) {
      this.carregarImagens();
      this.sit = false;
      this.randomNomes();
      this.zerarJanelas();
      if (!this.dragulaService.find("bag")) {
        this.dragulaService.createGroup("bag", {
          revertOnSpill: true,
          removeOnSpill: false
        });
      }
    }
    if (this.sit) {
      this.imagensSelecionadas();
      this.randomNomes();
      this.zerarJanelas();
      if (!this.dragulaService.find("bag")) {
        this.dragulaService.createGroup("bag", {
          revertOnSpill: true,
          removeOnSpill: false
        });
      }
    }
  }

  exibirNivel2() {
    this.nivel1 = false;
    this.nivel2 = true;
    this.imagensSelecionadas();
    this.randomNomes();
    this.zerarFase();
    this.zerarJanelas();
    this.telaIs = true;
    this.pontosAS = 15;
    if (!this.dragulaService.find("bag")) {
      this.dragulaService.createGroup("bag", {
        revertOnSpill: true,
        removeOnSpill: false
      });
    }
  }

  exibirNivel3() {
    this.nivel2 = false;
    this.nivel3 = true;
    this.imagensSelecionadas();
    this.randomNomes();
    this.zerarFase();
    this.zerarJanelas();
    this.telaIs = true;
    this.pontosAS = 35;
    if (!this.dragulaService.find("bag")) {
      this.dragulaService.createGroup("bag", {
        revertOnSpill: true,
        removeOnSpill: false
      });
    }
  }

  alterarNivel() {
    if (this.pontosAS === 15 && this.nivel === 1) {
      this.nivel = 2;
      this.telaIs = false;
      this.exibirMensagemNivel2();
      return false;
    }
    if (this.pontosAS === 35 && this.nivel === 2) {
      this.nivel = 3;
      this.telaIs = false;
      this.exibirMensagemNivel3();
      return false;
    }
    if (this.pontosAS === 56 && this.nivel === 3) {
      this.telaIs = false;
      this.exibirMensagemZerou();
      return false;
    }
    return true;
  }
  verificaPontosFaseNivel() {
    this.calcularPorcentagem();
    if (this.nivel === 1 && this.pontos === 3) {
      this.exibirMensagemGanhouFase();
    } else if (this.nivel === 2 && this.pontos === 5) {
      this.exibirMensagemGanhouFase();
    } else if (this.nivel === 3 && this.pontos === 7) {
      this.exibirMensagemGanhouFase();
    }
  }
  async exibirMensagemZerou() {
    let alert = await this.alert.create({
      header: 'Parabéns!!! Você chegou até o fim. 😃',
      cssClass: 'alertsp',
      buttons: [
        {
          text: 'Clique aqui para voltar ao Menu Principal.',
          handler: () => this.abrirPagina('home')
        }

      ]
    });
    await alert.present();
  }
  ngOnInit() {

  }

  ngOnDestroy() {
    this.dragulaService.destroy("bag");
    this.subs.unsubscribe();
  }
  abrirPagina(url: String) {
    this.rota.navigate([url]);
    if(this.pontosAS!==56){
      this.zerarFase();
      this.zerarJanelas();
      this.updateBancoDados();
    }else{
      this.pontosAS=0;
      this.pontos=0;
      this.usuario.qtArrasta++;
      this.updateBancoDados();
    }
    
  }
  updateBancoDados(){
    this.user = new Usuario(this.autenticacao.getUser().uid,
        this.usuario.nome, this.usuario.username,
        this.usuario.email, this.usuario.genero, this.usuario.idade, this.usuario.senha, this.usuario.nomeM, this.usuario.pontosPerguntas, this.usuario.pontosMemoria, this.pontosAS, this.usuario.qtPerguntas, this.usuario.qtMemoria, this.usuario.qtArrasta);
      this.bdService.update('/usuarios', this.usuario.uid, this.user);
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
