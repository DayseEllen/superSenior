import { AlertController } from '@ionic/angular';
import { BDService } from '../services/bd.service';


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pergunta } from 'src/models/pergunta';

@Component({
  selector: 'app-tela-pergunta',
  templateUrl: './tela-pergunta.page.html',
  styleUrls: ['./tela-pergunta.page.scss'],
  providers: [BDService]
})
export class TelaPerguntaPage implements OnInit {

  perguntas: Pergunta[];
  perguntaAtual: Pergunta;
  indiceAtual: number;
 
  constructor(private rota: Router, private bdService: BDService, private alert: AlertController) {
    //this.inserirPerguntas();
    this.carregarPerguntas();
   }

   private async carregarPerguntas() {
    this.perguntas = await this.bdService.listWithUIDs<Pergunta>('/perguntas');
    this.indiceAtual = -1;
    this.exibirProximaPergunta();
   }

   exibirProximaPergunta() {
     if(this.indiceAtual == 49){
       this.indiceAtual = -1;
     }
     this.indiceAtual++;
     this.perguntaAtual = this.perguntas[this.indiceAtual];
   }

  async conferirPergunta(resposta: String){
     if(resposta == this.perguntaAtual.resposta){
       let alert = await this.alert.create({
         header: 'Parabéns!! Você acertou a pergunta',
         message: 'E mais! ' + this.perguntaAtual.dica,
         buttons:[
           {
             text: 'Próxima pergunta',
             handler: ()=> this.exibirProximaPergunta()
           }
         ]
       });
       await alert.present();
       /*Lógica de score*/
     }else{
      let alert = await this.alert.create({
        header: 'Que pena! Você errou a pergunta',
        message: 'A dica é: ' + this.perguntaAtual.dica,
        buttons:[
          {
            text: 'Próxima pergunta',
            handler: ()=> this.exibirProximaPergunta()
          },
          {
            text: 'Tentar novamente',
            handler: ()=> this.perguntaAtual
          }
        ]
      });
      await alert.present();
     }
   }

   

 /* private async inserirPerguntas() {
    const perguntas = 
   [
     { enunciado: 'Qual o nome do aplicativo da imagem acima?', resposta: 'WhatsApp', alternativas: [ 'Telefone', 'WhatsApp', 'Facebook' ], dica: 'Podemos mandar áudios e documentos. Ele é o mais usado atualmente.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/whatsapp.png?alt=media&token=8a4290f8-9852-4dbb-af39-910d0a600f46' },
     { enunciado: 'Qual o nome do aplicativo da imagem acima? ', resposta: 'Face/Facebook', alternativas: [ 'Face/Facebook', 'Instagram', 'WhatsApp' ], dica: 'Nele podemos “cutucar um amigo”.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/facebook.png?alt=media&token=e4b7a927-5d71-417f-bacc-38b44b055a94' },
     { enunciado: 'Qual o nome dessa funcionalidade?', resposta: 'Dados móveis', alternativas: [ 'Dados móveis', 'Google Chrome', 'WiFi' ], dica: 'Se ele estiver ativado eu gasto os meus créditos.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/dadosmoveis.jpg?alt=media&token=22f9a8cf-76a7-4fcc-a82e-e07fb99c8a47' },
     { enunciado: 'Qual o nome do aplicativo da imagem acima?', resposta: 'Instagram', alternativas: [ 'Facebook', 'Relógio', 'Instagram' ], dica: 'Podemos seguir pessoas famosas e assistir lives.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/instagram.png?alt=media&token=c27846c9-f20b-4b85-bc81-c3116ffdc3bc' },
     { enunciado: 'Qual o nome do aplicativo da imagem acima?', resposta: 'Messenger', alternativas: [ 'Messenger', 'Youtube', 'Twitter' ], dica: 'Também podemos usá-lo para fazer ligações para os amigos do Facebook.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/messenger.png?alt=media&token=ccc1673e-c163-410a-86ec-e4c6f744af78' },
     { enunciado: 'Qual o nome da rede social que permite o compartilhamento de vídeos, de mensagens de texto, de fotos, a adição de amigos e bater papo com alguém?', resposta: 'Face/Facebook', alternativas: [ 'Instagram', 'Face/Facebook', 'WhatsApp' ], dica: 'Nela podemos “cutucar um amigo”.', urlDaImagem: '' },
     { enunciado: 'Qual o nome do aplicativo da imagem acima?', resposta: 'Youtube', alternativas: [ 'Messenger', 'Instagram', 'Youtube' ], dica: ' Podemos curtir ou descurtir vídeos.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/youtube.png?alt=media&token=af5bcfb3-b866-4c52-8ff6-b5dc12e48835' },
     { enunciado: 'Qual o nome do aplicativo da imagem acima?', resposta: 'PlayStore', alternativas: [ 'Twitter', 'Youtube', 'PlayStore' ], dica: 'Ele é da Google, e já vem em nosso celular Android.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/playstore.png?alt=media&token=e342dc70-fda9-4f23-af15-4f47c4bbef2f' },
     { enunciado: 'Qual o aplicativo que serve para mandarmos mensagens, compartilharmos fotos, vídeos e que podemos fazer chamada de voz (ligar) e criar grupos?', resposta: 'WhatsApp', alternativas: [ 'Instagram', 'Twitter', 'WhatsApp' ], dica: 'Podemos mandar áudios e documentos. Ele é o mais usado atualmente.', urlDaImagem: '' },
     { enunciado: 'Qual a rede social que tem como principal uso tirar fotos, aplicar efeitos nessas fotos e compartilhá-las com seus seguidores?', resposta: 'Instagram', alternativas: [ 'Relógio', 'Instagram', 'WhatsApp' ], dica: 'Podemos seguir pessoas famosas e assistir lives.', urlDaImagem: '' },
     { enunciado: 'Qual o aplicativo que tem como função fazer downloads de outros aplicativos para Android?', resposta: 'PlayStore', alternativas: [ 'Twitter', 'Youtube', 'PlayStore' ], dica: 'Ele é da Google, e já vem em nosso celular Android.', urlDaImagem: '' },
     { enunciado: 'Qual o aplicativo que permite assistir vídeos e se inscrever em canais?', resposta: 'Youtube', alternativas: [ 'Youtube', 'Instagram', 'Facebook' ], dica: ' Podemos curtir ou descurtir vídeos.', urlDaImagem: '' },
     { enunciado: 'Qual navegador que está presente, por padrão, nos Androids?', resposta: 'Google Chrome', alternativas: [ 'Google Chrome', 'PlayStore', 'Lanterna' ], dica: 'Podemos usá-lo para fazer pesquisas na internet.', urlDaImagem: '' },
     { enunciado: 'O aplicativo que é vinculado ao Facebook e serve para mandar mensagens para seus amigos é: ', resposta: 'Messenger', alternativas: [ 'Youtube', 'Messenger', 'Twitter' ], dica: 'Também podemos usá-lo para fazer ligações para os amigos do Facebook.', urlDaImagem: '' },
     { enunciado: 'Qual o nome do perfil de som acima?', resposta: 'Perfil de som - Mudo', alternativas: [ 'Perfil de som - Com som', 'Perfil de som - Mudo', 'Perfil de som - Vibrar' ], dica: 'Se essa funcionalidade estiver ativada seu celular ao receber uma ligação não fará barulho algum.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/mudo.png?alt=media&token=15c6dc95-00f1-4c17-b2da-56583689a414' },
     { enunciado: 'Qual é a funcionalidade, presente  nos celulares, que ajuda a iluminar locais?', resposta: 'Lanterna', alternativas: [ 'Lanterna', 'Dados móveis', 'Bluetooth' ], dica: 'Usamos quando a energia acaba e precisamos iluminar o local.', urlDaImagem: '' },
     { enunciado: 'Qual o nome do ícone da imagem acima?', resposta: 'WiFi', alternativas: [ 'Bluetooth', 'WiFi', 'Google' ], dica: 'Se ele ficar desativado e não possuímos créditos, a internet não funciona.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/wifi.png?alt=media&token=10a6568f-50e8-422d-8596-d6eebed6bd04' },
     { enunciado: 'Qual o nome do perfil de som acima?', resposta: 'Perfil de som - Com som', alternativas: [ 'Perfil de som - Com som', 'Perfil de som - Mudo', 'Perfil de som - Vibrar' ], dica: 'Se essa funcionalidade estiver ativada seu celular ao receber uma ligação começará a tocar.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/som_e_vibracao.png?alt=media&token=af682d41-d7ad-401a-8aad-3bb6be70fe11' },
     { enunciado: 'Qual o nome do ícone da imagem acima?', resposta: 'Google Chrome', alternativas: [ 'Google Chrome', 'PlayStore', 'Lanterna' ], dica: 'Podemos usá-lo para fazer pesquisas na internet.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/chorme.png?alt=media&token=0297d4e4-78cf-4899-adb8-82ea96aff999' },
     { enunciado: 'O que permite o compartilhamento de dados e arquivos de maneira rápida e segura através de aparelhos?', resposta: 'Bluetooth', alternativas: [ 'WiFi', 'Bluetooth', 'Youtube' ], dica: ' Compartilha dados sem precisar de conexão à internet.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da funcionalidade da imagem acima?', resposta: 'Modo Avião', alternativas: [ 'WiFi', 'Lanterna', 'Modo Avião' ], dica: 'Quando ele está ativado eu paro de receber mensagens e ligações.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/modo_aviao.png?alt=media&token=56b7ff16-480f-48e9-b073-764a5cbe90f8' },
     { enunciado: 'O que tem nos celulares e serve para nos conectar à internet, sem o uso dos créditos?', resposta: 'WiFi', alternativas: [ 'Bluetooth', 'Google', 'WiFi' ], dica: 'Se ele ficar desativado e não possuímos créditos, a internet não funciona.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da funcionalidade da imagem acima?', resposta: 'Rotação de tela', alternativas: [ 'Lanterna', 'Som', 'Rotação de tela' ], dica: 'Eu uso quando quero assistir um vídeo e tenho que rodar a tela para ficar “maior”.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/rota%C3%A7%C3%A3o%20de%20tela.png?alt=media&token=e5ab9077-ef7c-4a99-9a8a-e27a0fdf38ad' },
     { enunciado: 'Qual o nome da funcionalidade que me permite ver os meus contatos?', resposta: 'Contatos/Agenda de contatos', alternativas: [ 'Som', 'Lanterna', 'Agenda de Contatos/Contatos' ], dica: 'Existe uma lista com os nomes de todos os números salvos.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da funcionalidade acima?', resposta: 'Localização', alternativas: [ 'Localização', 'Lanterna', 'WiFI' ], dica: 'Quando ela tá ativada as pessoas podem saber onde me encontro.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/localizacao.png?alt=media&token=ec939e8a-eb7c-40f2-a37b-42e98433e822' },
     { enunciado: 'Qual o nome funcionalidade acima?', resposta: 'Lanterna', alternativas: [ 'WiFi', 'Lanterna', 'Dados móveis' ], dica: 'Usamos quando a energia acaba e precisamos iluminar o local.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/lanterna.png?alt=media&token=cf6bae69-6d8c-494e-a7e9-857a30e0be29' },
     { enunciado: 'Para qual número ligamos quando estamos em situações de risco, somos vítimas das ações de infratores, há perturbação da Ordem, etc?', resposta: 'Policia Militar - 190', alternativas: [  'Samu - 192', 'Policia Militar - 190', 'Bombeiros - 193' ], dica: 'Esse número é de uma corporação que garante a nossa segurança.', urlDaImagem: '' },
     { enunciado: 'Qual o nome funcionalidade acima?', resposta: 'Bluetooth', alternativas: [ 'Bluetooth', 'YouTube', 'WiFi' ], dica: ' Compartilha dados sem precisar de conexão à internet.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/bluetooth.png?alt=media&token=18a31869-7670-48ae-b4da-9cd2f767a6eb' },
     { enunciado: 'Qual o nome da funcionalidade da imagem acima?', resposta: 'Alarme', alternativas: [ 'Agenda de Contatos', 'Perfil de som - Vibrar', 'Alarme' ], dica: 'Eu uso ele quando tenho um dia certo para tomar remédios.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/alarme.png?alt=media&token=8306d8d6-d66b-46e2-90d9-ed0e4f226867' },
     { enunciado: 'Qual funcionalidade do celular que desabilita conexões para manter a segurança durante uma viagem de avião?', resposta: 'Modo Avião', alternativas: [ 'Modo Avião', 'WiFi', 'Lanterna' ], dica: 'Quando ele está ativado eu paro de receber mensagens e ligações.', urlDaImagem: '' },
     { enunciado: 'Qual funcionalidade habilita ou desabilita a tela ‘virada’ ou ‘em pé’ do celular?', resposta: 'Rotação de tela', alternativas: [ 'Som', 'Rotação de tela', 'Lanterna' ], dica: 'Eu uso quando quero assistir um vídeo e tenho que rodar a tela para ficar “maior”.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da funcionalidade que me ajuda a marcar o horário para atividades que faço na minha rotina?', resposta: 'Alarme/Relógio', alternativas: [ 'Agenda de Contatos', 'Perfil de som - Vibrar', 'Alarme' ], dica: 'Eu uso ele quando tenho um dia certo para tomar remédios.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da funcionalidade da imagem acima?', resposta: 'Contatos/Agenda de contatos', alternativas: [ 'Som', 'Lanterna', 'Agenda de Contatos/Contatos' ], dica: 'Existe uma lista com os nomes de todos os números salvos.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/contatos.jpg?alt=media&token=7806ee21-9e90-4843-8330-73e2bdd86a37' },
     { enunciado: 'Qual o nome da funcionalidade do meu celular que uso quando vou fazer ligações para alguém?', resposta: 'Telefone', alternativas: [ 'Telefone', 'Contatos', 'Alarme' ], dica: 'Quando vou usá-lo aparece um teclado com números.', urlDaImagem: '' },
     { enunciado: 'Para qual número ligamos quando precisamos resgatar um animal ou uma pessoa, ou quando há um incêndio ou um acidente doméstico?', resposta: 'Bombeiros - 193', alternativas: [  'Samu - 192', 'Policia Militar - 190', 'Bombeiros - 193' ], dica: 'Esse número também serve para ligar quando há afogamento, acidente com animal peçonhento, choque elétrico.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da funcionalidade acima?', resposta: 'Câmera', alternativas: [ 'Câmera', 'Alarme', 'Instagram' ], dica: 'Eu posso tirar fotos e gravar vídeos.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/camera.png?alt=media&token=c4f70dcd-920f-4887-be70-ebc3bfba80b7' },
     { enunciado: 'Qual o nome da funcionalidade da imagem acima?', resposta: 'Galeria', alternativas: [ 'Câmera', 'WhatsApp', 'Galeria' ], dica: 'Existem pastas com minhas fotos e meu vídeos.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/galeria.jpg?alt=media&token=b21f865e-5732-4920-85bc-4bb11a7841ec' },
     { enunciado: 'Qual perfil de som que ativa o som do meu celular?', resposta: 'Perfil de som - Com som', alternativas: [ 'Perfil de som - Com som', 'Perfil de som - Mudo', 'Perfil de som - Vibrar' ], dica: 'Se essa funcionalidade estiver ativada seu celular ao receber uma ligação começará a tocar.', urlDaImagem: '' },
     { enunciado: 'Para qual número ligamos quando sofremos um acidente ou estamos passando mal?', resposta: 'Samu - 192', alternativas: [ 'Samu - 192', 'Policia Militar - 190', 'Bombeiros - 193' ], dica: 'Esse número é de um programa que presta o socorro à população em casos de emergência relacionadas à saúde.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da funcionalidade que me permite visualizar todas a fotos e vídeos que existe no meu celular?', resposta: 'Galeria', alternativas: ['Câmera', 'WhatsApp', 'Galeria'], dica: 'Existem pastas com minhas fotos e meu vídeos.', urlDaImagem: '' },
     { enunciado: 'Qual perfil de som que desativa o som do meu celular?', resposta: 'Perfil de som - Mudo', alternativas: [ 'Perfil de som - Com som', 'Perfil de som - Mudo', 'Perfil de som - Vibrar' ], dica: 'Se essa funcionalidade estiver ativada seu celular ao receber uma ligação não fará barulho algum.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da funcionalidade da imagem acima?', resposta: 'Telefone', alternativas: [ 'Telefone', 'Contatos', 'Alarme' ], dica: 'Quando vou usá-lo aparece um teclado com números.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/telefone.png?alt=media&token=7d4cdb29-720f-49f2-bfeb-9c8cb3a15c00' },
     { enunciado: 'Qual o nome do perfil de som acima?', resposta: 'Perfil de som - Vibrar', alternativas: [ 'Perfil de som - Com som', 'Perfil de som - Mudo', 'Perfil de som - Vibrar' ], dica: 'Se essa funcionalidade estiver ativada seu celular ao receber uma ligação ficará tremendo.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/vibra%C3%A7ao.jpg?alt=media&token=efdd7f7a-5b1b-4512-92bf-0401e61a0d3e' },
     { enunciado: 'Qual o nome da funcionalidade que me permite registrar momentos especiais que aconteceram na minha vida?', resposta: 'Câmera', alternativas: [ 'Câmera', 'Alarme', 'Instagram' ], dica: 'Eu posso tirar fotos e gravar vídeos.', urlDaImagem: '' },
     { enunciado: 'Qual a funcionalidade que quando ativada eu uso a internet móvel, no caso, a internet usando o chip?', resposta: 'Dados móveis', alternativas: [ 'Google Chrome', 'WiFi', 'Dados móveis' ], dica: 'Se ele estiver ativado eu gasto os meus créditos.', urlDaImagem: '' },
     { enunciado: 'Qual funcionalidade, que quando ativada permite o uso do mapa para saber onde eu estou em tempo real?', resposta: 'Localização', alternativas: [ 'WiFi', 'Lanterna', 'Localização' ], dica: 'Quando ela tá ativada as pessoas podem saber onde me encontro.', urlDaImagem: '' },
     { enunciado: 'Qual o número do SAMU?', resposta: '192', alternativas: [  '192', '190', '193' ], dica: 'Esse número é de um programa que presta o socorro à população em casos de emergência relacionadas à saúde.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/Samu.jpg?alt=media&token=9c82cb49-f576-45fa-88dd-1c771e927e50' },
     { enunciado: 'Qual o número da Polícia Militar?', resposta: '190', alternativas: [  '192', '190', '193' ], dica: 'Esse número é de uma corporação que garante a nossa segurança.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/policia.png?alt=media&token=b24f4395-495d-441b-a8da-a0e055f339e7' },
     { enunciado: 'Qual perfil de som que faz meu celular vibrar, sem toque?', resposta: 'Perfil de som - Vibrar', alternativas: [ 'Perfil de som - Com som', 'Perfil de som - Mudo', 'Perfil de som - Vibrar' ], dica: 'Se essa funcionalidade estiver ativada seu celular ao receber uma ligação ficará tremendo.', urlDaImagem: '' },
     { enunciado: 'Qual o número dos Bombeiros?', resposta: '193', alternativas: [  '192', '190', '193' ], dica: 'Esse número também serve para ligar quando há afogamento, acidente com animal peçonhento, choque elétrico.', urlDaImagem: 'https://firebasestorage.googleapis.com/v0/b/super-senior.appspot.com/o/bombeiros.png?alt=media&token=4a452df0-cd19-4cff-98c6-3700f90503bf' }



   ];

    perguntas.forEach(async pergunta => await this.bdService.insertInList<Pergunta>('/perguntas', pergunta));
}*/

  ngOnInit() {
    
    }
   


  abrirPagina(url:String){
    this.rota.navigate([url]);

  }

}
