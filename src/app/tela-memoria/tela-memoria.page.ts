import { Autenticacao } from './../services/autenticacao';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; import { BDService } from '../services/bd.service';
import { AlertController } from '@ionic/angular';
import { Memoria } from 'src/models/memoria';
import { Cartas } from 'src/models/cartas';
import { Usuario } from 'src/models/usuario';



@Component({
  selector: 'app-tela-memoria',
  templateUrl: './tela-memoria.page.html',
  styleUrls: ['./tela-memoria.page.scss'],
  providers: [BDService]
})

export class TelaMemoriaPage implements OnInit {

  memorias: Memoria[];
  memoriaAtual: Memoria;

  urlMemoria: string[] = [];
  urlAtual: string;
  url: string;
  cartas: Cartas[] = [];
  cartasAuxiliar: Cartas[] = [];
  cartasComparacao: Cartas[] = [];
  countCardsOpen: number = 0;

  cartaCoringaUrl: string = '';
  cartaCoringa: Memoria;
  usuarios: Usuario[] = [];
  usuario: Usuario;
  user: Usuario;
  pontosM: number;
  porcentagem: string;
  nivel: string;


  constructor(private rota: Router, private bdService: BDService, private alert: AlertController, private autenticacao: Autenticacao) {
    this.carregarUsuarios();
    this.carregarImagens();
  }

  private async carregarUsuarios() {
    this.usuarios = await this.bdService.listWithUIDs<Usuario>('/usuarios');
    this.getUser();
    this.pontosM = this.usuario.pontosMemoria;
    this.calcularNivelMemoria();
    this.calcularPorcentagem();
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

  /* private async inserirMemorias() {
     const memorias =
   [
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/alarme.png?alt=media&token=8306d8d6-d66b-46e2-90d9-ed0e4f226867'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/bluetooth.png?alt=media&token=18a31869-7670-48ae-b4da-9cd2f767a6eb'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/bombeiros.png?alt=media&token=4a452df0-cd19-4cff-98c6-3700f90503bf'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/camera.png?alt=media&token=c4f70dcd-920f-4887-be70-ebc3bfba80b7'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/chorme.png?alt=media&token=0297d4e4-78cf-4899-adb8-82ea96aff999'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/contatos.jpg?alt=media&token=7806ee21-9e90-4843-8330-73e2bdd86a37'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/dadosmoveis.jpg?alt=media&token=22f9a8cf-76a7-4fcc-a82e-e07fb99c8a47'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/facebook.png?alt=media&token=e4b7a927-5d71-417f-bacc-38b44b055a94'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/galeria.jpg?alt=media&token=b21f865e-5732-4920-85bc-4bb11a7841ec'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/instagram.png?alt=media&token=c27846c9-f20b-4b85-bc81-c3116ffdc3bc'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/lanterna.png?alt=media&token=cf6bae69-6d8c-494e-a7e9-857a30e0be29'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/localizacao.png?alt=media&token=ec939e8a-eb7c-40f2-a37b-42e98433e822'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/messenger.png?alt=media&token=ccc1673e-c163-410a-86ec-e4c6f744af78'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/modo_aviao.png?alt=media&token=56b7ff16-480f-48e9-b073-764a5cbe90f8'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/mudo.png?alt=media&token=15c6dc95-00f1-4c17-b2da-56583689a414'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/playstore.png?alt=media&token=e342dc70-fda9-4f23-af15-4f47c4bbef2f'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/policia.png?alt=media&token=b24f4395-495d-441b-a8da-a0e055f339e7'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/rota%C3%A7%C3%A3o%20de%20tela.png?alt=media&token=e5ab9077-ef7c-4a99-9a8a-e27a0fdf38ad'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/Samu.jpg?alt=media&token=9c82cb49-f576-45fa-88dd-1c771e927e50'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/som_e_vibracao.png?alt=media&token=af682d41-d7ad-401a-8aad-3bb6be70fe11'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/telefone.png?alt=media&token=7d4cdb29-720f-49f2-bfeb-9c8cb3a15c00'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/vibra%C3%A7ao.jpg?alt=media&token=efdd7f7a-5b1b-4512-92bf-0401e61a0d3e'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/whatsapp.png?alt=media&token=8a4290f8-9852-4dbb-af39-910d0a600f46'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/wifi.png?alt=media&token=10a6568f-50e8-422d-8596-d6eebed6bd04'},
     {url: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/youtube.png?alt=media&token=d84ddb5b-aceb-4f36-887b-2116dc731e78'}
  
   ];
   memorias.forEach(async memoria => await this.bdService.insertInList<Memoria>('/memorias', memoria));
   }*/

  ngOnInit() {
  }


  private async carregarImagens() {
    this.memorias = await this.bdService.listWithUIDs<Memoria>('/memorias');
    this.imageSelect();
    setTimeout(() => { this.exibirMensagemInicio() }, 800);
  }

  randomImagem() {
    this.memoriaAtual = this.memorias[Math.floor(this.memorias.length * Math.random())];
    for (var i = 0; i < this.memorias.length; i++) {
      if (this.memorias[i].url == this.memoriaAtual.url) {
        this.memorias.splice(i, 1);
      }
    }
    return this.memoriaAtual.url;
  }

  imageSelect() {
    this.cartas = [];
    this.cartaCoringaUrl = 'assets/images/cartacoringa.svg.png';
    if (this.pontosM >= 0 && this.pontosM < 6) {
      for (var i = 0; i < 3; i++) {
        var url = this.randomImagem();
        this.cartasAuxiliar.push(new Cartas(url));
        this.cartasAuxiliar.push(new Cartas(url));
      }
    } if (this.pontosM >= 6 && this.pontosM < 12) {
      for (var i = 0; i < 4; i++) {
        var url = this.randomImagem();
        this.cartasAuxiliar.push(new Cartas(url));
        this.cartasAuxiliar.push(new Cartas(url));
      }
    }if (this.pontosM >= 12 && this.pontosM < 18) {
      for (var i = 0; i < 3; i++) {
        var url = this.randomImagem();
        this.cartasAuxiliar.push(new Cartas(url));
        this.cartasAuxiliar.push(new Cartas(url));
      }
      this.cartasAuxiliar.push(new Cartas(this.cartaCoringaUrl));
      this.cartasAuxiliar.push(new Cartas(this.cartaCoringaUrl));
    }
    this.randomImagesCards();
  }

  mostrarCartas() {
    for (var i = 0; i < this.cartas.length; i++) {
      this.cartas[i].displayUrl = this.cartas[i].url;
      this.cartas[i].isOpen = true;
    }
    setTimeout(() => {
      this.changeDiferentCards()
    }, 2500);
  }

  randomImagesCards() {
    if (this.pontosM >= 0 && this.pontosM < 6) {
      while (this.cartas.length != 6) {
        var posicionCard = Math.floor(this.cartasAuxiliar.length * Math.random());
        this.cartas.push(this.cartasAuxiliar[posicionCard]);
        this.cartasAuxiliar.splice(posicionCard, 1);
      }
    } if (this.pontosM >= 6 && this.pontosM < 18) {
      while (this.cartas.length != 8) {
        var posicionCard = Math.floor(this.cartasAuxiliar.length * Math.random());
        this.cartas.push(this.cartasAuxiliar[posicionCard]);
        this.cartasAuxiliar.splice(posicionCard, 1);
      }
    } 

  }
  imageClicked(carta) {
    if (!carta.isOpen && this.cartasComparacao.length != 2) {
      this.cartasComparacao.push(carta);
      carta.displayUrl = carta.url;
      carta.isOpen = true;
      if (this.cartasComparacao.length == 2) {
        if (this.cartasComparacao[0].url == this.cartaCoringaUrl && this.cartasComparacao[0].url === this.cartasComparacao[1].url) {
          console.log('Pares de cartas coringa');
          setTimeout(() => this.msgCartaCoringaEncontrada(), 500);
          setTimeout(() => this.mostrarCartas(), 2000)
        } else {
          console.log('Carta ñ coringa');
          setTimeout(() => this.verifyTwoCards(), 500);
        }
      }
    }
  }
  async exibirMensagem() {
    
    if(this.pontosM===5){
      this.calcularNivelMemoria();
      this.calcularPorcentagem();
      let alert = await this.alert.create({
        header: 'Parabéns!!! Você agora está no nível 2. 😃',
        message: "Continue jogando para passar de nível.",
        cssClass: 'alertsm',
        buttons: [
          {
            text: 'Clique aqui para ir para a próxima fase',
            handler: () => {
              this.pontosM ++;
              this.calcularNivelMemoria();
              this.calcularPorcentagem();
              this.imageSelect();
              setTimeout(() =>  this.mostrarCartas(), 1000)
            }
          }
        ]
      });
      await alert.present();
    }else if(this.pontosM===11){
      this.calcularNivelMemoria();
      this.calcularPorcentagem();
      let alert = await this.alert.create({
        header: 'Parabéns!!! Você agora está no nível 3. 😃',
        message: "PRESTE ATENÇÃO NA CARTA COM O 'X' VERMELHO. EVITE ABRIR AS DUAS, OU SEU JOGO RENICIARÁ",
        cssClass: 'alertsm',
        buttons: [
          {
            text: 'Clique aqui para ir para continuar',
            handler: () => {
              this.passarNivel3();
            }
          }
        ]
      });
      await alert.present();
    }else if(this.pontosM===17){
      this.calcularNivelMemoria();
      this.calcularPorcentagem();
      let alert = await this.alert.create({
        header: 'Parabéns!!! Você zerou o jogos da Memória.😃',
        message: "",
        cssClass: 'alertsm',
        buttons: [
          {
            text: 'Clique aqui para reiniciar o jogo',
            handler: () => {
             this.pontosM=0;
             this.imageSelect()
             this.calcularNivelMemoria();
             this.calcularPorcentagem();
             setTimeout(() => this.mostrarCartas(), 1000)
            }
          }
        ]
      });
      await alert.present();
    } else if(this.pontosMensagem(this.pontosM)){
      this.pontosM ++; 
      this.calcularPorcentagem();
      let alert = await this.alert.create({
        header: 'Parabéns!! 😃 Você adivinhou todas as cartas',
        message: 'Você tem: '+this.pontosM+" ponto(s)",
        cssClass: 'alertsm',
        buttons: [
          {
            text: 'Clique aqui para ir para a próxima fase',
            handler: () => {
              this.imageSelect()
              setTimeout(() => this.mostrarCartas(), 1000)
            }
          }
        ]
      });
      await alert.present();
    }
  }

  private pontosMensagem(pontos){
    if(pontos!=5|| pontos!=11 || pontos!=17){
      return true;
    }
    return false;
  }

  async exibirMensagemInicio() {
    let alert = await this.alert.create({
      header: 'O jogo já vai começar',

      message: 'As cartas ficarão abertas por 2 segundos, por isso preste atenção!',
      cssClass: 'alertsm',
      buttons: [
        {
          text: 'Entendi',
          handler: () => this.mostrarCartas()
        }
      ]
    })
    await alert.present();
  }

  async msgCartaCoringaEncontrada() {
    let alert = await this.alert.create({
      header: 'PAR DE CARTA CORINGA ENCONTRADO',

      message: 'As cartas se fecharam novamente. Tente outra vez!',
      cssClass: 'alertsm',
      buttons: [
        {
          text: 'Entendi',
          handler: () => {
            this.punicaoCartaCoringa();
          setTimeout(() => this.mostrarCartas(), 1000)
        }
        }
      ]
    })
    await alert.present();
  }

  punicaoCartaCoringa() {
    this.changeDiferentCards();
    for (var j = 0; j < this.cartas.length; j++) {
      this.cartas[j].isOpen == false;
      this.cartas[j].displayUrl = "assets/images/memoria.png";
      this.cartas[j].isDiscovered = false;
    }
    this.countCardsOpen = 0;
  }

  changeDiferentCards() {
    for (var i = 0; i < this.cartas.length; i++) {
      if (!this.cartas[i].isDiscovered) {
        this.cartas[i].isOpen = false;
        this.cartas[i].displayUrl = "assets/images/memoria.png";
      }
    }
    this.cartasComparacao = [];
  }
  verifyTwoCards() {
    if (this.cartasComparacao[0].url == this.cartasComparacao[1].url) {
      this.changeEqualsCards(this.cartasComparacao[1].url);
      if (this.pontosM >= 0 && this.pontosM <6 && this.countCardsOpen == 6) {
        this.countCardsOpen = 0;
        this.exibirMensagem();
      } if (this.pontosM >= 6 && this.pontosM < 12 && this.countCardsOpen == 8) {
        this.countCardsOpen = 0;
        this.exibirMensagem();
      }
      if (this.pontosM >= 12 && this.pontosM <= 18) {
        if (this.countCardsOpen == 6) {
          this.countCardsOpen = 0;
          this.exibirMensagem();
        }
      }
    }
    else {
      this.changeDiferentCards();
    }

  }
  changeEqualsCards(url: String) {
    for (var i = 0; i < this.cartas.length; i++) {
      if (this.cartas[i].url == url) {
        this.cartas[i].isDiscovered = true;
        this.countCardsOpen++;
      }
    }
    this.cartasComparacao = [];
  }

  abrirPagina(url: String) {
    console.log(this.pontosM);
    this.user = new Usuario(
      this.autenticacao.getUid(), this.autenticacao.getDisplayName(),
      this.autenticacao.getEmail(), this.usuario.genero, this.usuario.idade, this.usuario.pontosPerguntas, this.pontosM, this.usuario.pontosArrasta);
    this.rota.navigate([url]);
    this.bdService.update('/usuarios', this.usuario.uid, this.user);
  }

  calcularPorcentagem(){
    if(this.nivel == "Nível 1"){
       this.porcentagem = String(((100 * (this.pontosM)) / 6).toFixed(0));
    }
    if(this.nivel == "Nível 2"){
      this.porcentagem = String(((100 * (this.pontosM-6)) / 6).toFixed(0));
    }
    if(this.nivel == "Nível 3"){
      this.porcentagem = String(((100 * (this.pontosM-12)) / 6).toFixed(0));
    }
  }

  calcularNivelMemoria(){
    if (!this.usuario) {
     this.usuario = <Usuario> {};
     this.usuario.pontosMemoria = this.pontosM;
    }
 
     if(this.pontosM >=0 && this.pontosM <6){
         this.nivel = "Nível 1";
       }
       if(this.pontosM >=6 && this.pontosM <12){
         this.nivel = "Nível 2";
       }
       if(this.pontosM >=12 && this.pontosM <18){
         this.nivel  = "Nível 3";
       }
  }

  passarNivel3(){
    this.pontosM ++;
    this.calcularNivelMemoria();
    this.calcularPorcentagem();
    this.imageSelect();
    setTimeout(() =>  this.mostrarCartas(), 2000)
   
  }

}