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
 
  constructor(private rota: Router, private bdService: BDService) {
    //this.inserirPerguntas();
   }

  /*private async inserirPerguntas() {
    const perguntas = 
   [
     { enunciado: 'Qual o nome do aplicativo da imagem acima?', resposta: 'WhatsApp', alternativas: [ 'Telefone', 'WhatsApp', 'Facebook' ], dica: 'Podemos mandar áudios e documentos. Ele é o mais usado atualmente.', urlDaImagem: '' },
     { enunciado: 'Qual o nome do aplicativo da imagem acima? ', resposta: 'Face/Facebook', alternativas: [ 'Face/Facebook', 'Instagram', 'WhatsApp' ], dica: 'Nele podemos “cutucar um amigo”.', urlDaImagem: '' },
     { enunciado: 'Qual o nome dessa funcionalidade?', resposta: 'Dados móveis', alternativas: [ 'Dados móveis', 'Google Chrome', 'WiFi' ], dica: 'Se ele estiver ativado eu gasto os meus créditos.', urlDaImagem: '' },
     { enunciado: 'Qual o nome do aplicativo da imagem acima?', resposta: 'Instagram', alternativas: [ 'Facebook', 'Relógio', 'Instagram' ], dica: 'Podemos seguir pessoas famosas e assistir lives.', urlDaImagem: '' },
     { enunciado: 'Qual o nome do aplicativo da imagem acima?', resposta: 'Messenger', alternativas: [ 'Messenger', 'Youtube', 'Twitter' ], dica: 'Também podemos usá-lo para fazer ligações para os amigos do Facebook.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da rede social que permite o compartilhamento de vídeos, de mensagens de texto, de fotos, a adição de amigos e bater papo com alguém?', resposta: 'Face/Facebook', alternativas: [ 'Instagram', 'Face/Facebook', 'WhatsApp' ], dica: 'Nela podemos “cutucar um amigo”.', urlDaImagem: '' },
     { enunciado: 'Qual o nome do aplicativo da imagem acima?', resposta: 'Youtube', alternativas: [ 'Messenger', 'Instagram', 'Youtube' ], dica: ' Podemos curtir ou descurtir vídeos.', urlDaImagem: '' },
     { enunciado: 'Qual o aplicativo do aplicativo da imagem acima?', resposta: 'PlayStore', alternativas: [ 'Twitter', 'Youtube', 'PlayStore' ], dica: 'Ele é da Google, e já vem em nosso celular Android.', urlDaImagem: '' },
     { enunciado: 'Qual o aplicativo que serve para mandarmos mensagens, compartilharmos fotos, vídeos e que podemos fazer chamada de voz (ligar) e criar grupos?', resposta: 'WhatsApp', alternativas: [ 'Instagram', 'Twitter', 'WhatsApp' ], dica: 'Podemos mandar áudios e documentos. Ele é o mais usado atualmente.', urlDaImagem: '' },
     { enunciado: 'Qual a rede social que tem como principal uso tirar fotos, aplicar efeitos nessas fotos e compartilhá-las com seus seguidores?', resposta: 'Instagram', alternativas: [ 'Relógio', 'Instagram', 'WhatsApp' ], dica: 'Podemos seguir pessoas famosas e assistir lives.', urlDaImagem: '' },
     { enunciado: 'Qual o nome do aplicativo da imagem acima?', resposta: ' PlayStore', alternativas: [ 'Twitter', 'Youtube', ' PlayStore' ], dica: 'Ele é da Google, e já vem em nosso celular Android.', urlDaImagem: '' },
     { enunciado: 'Qual o aplicativo que tem como função fazer downloads de outros aplicativos para Android?', resposta: 'PlayStore', alternativas: [ 'Twitter', 'Youtube', 'PlayStore' ], dica: 'Ele é da Google, e já vem em nosso celular Android.', urlDaImagem: '' },
     { enunciado: 'Qual o aplicativo que permite assistir vídeos e se inscrever em canais?', resposta: 'Youtube', alternativas: [ 'Youtube', 'Instagram', 'Facebook' ], dica: ' Podemos curtir ou descurtir vídeos.', urlDaImagem: '' },
     { enunciado: 'Qual navegador que está presente, por padrão, nos Androids?', resposta: 'Google Chrome', alternativas: [ 'Google Chrome', 'PlayStore', 'Lanterna' ], dica: 'Podemos usá-lo para fazer pesquisas na internet.', urlDaImagem: '' },
     { enunciado: 'O aplicativo que é vinculado ao Facebook e serve para mandar mensagens para seus amigos é: ', resposta: 'Messenger', alternativas: [ 'Youtube', 'Messenger', 'Twitter' ], dica: 'Também podemos usá-lo para fazer ligações para os amigos do Facebook.', urlDaImagem: '' },
     { enunciado: 'Qual o nome do perfil de som acima?', resposta: 'Perfil de som - Mudo', alternativas: [ 'Perfil de som - Com som', 'Perfil de som - Mudo', 'Perfil de som - Vibrar' ], dica: 'Se essa funcionalidade estiver ativada seu celular ao receber uma ligação não fará barulho algum.', urlDaImagem: '' },
     { enunciado: 'Qual é a funcionalidade, presente  nos celulares, que ajuda a iluminar locais?', resposta: 'Lanterna', alternativas: [ 'Lanterna', 'Dados móveis', 'Bluetooth' ], dica: 'Usamos quando a energia acaba e precisamos iluminar o local.', urlDaImagem: '' },
     { enunciado: 'Qual o nome do ícone da imagem acima?', resposta: 'WiFi', alternativas: [ 'Bluetooth', 'WiFi', 'Google' ], dica: 'Se ele ficar desativado e não possuímos créditos, a internet não funciona.', urlDaImagem: '' },
     { enunciado: 'Qual o nome do perfil de som acima?', resposta: 'Perfil de som - Com som', alternativas: [ 'Perfil de som - Com som', 'Perfil de som - Mudo', 'Perfil de som - Vibrar' ], dica: 'Se essa funcionalidade estiver ativada seu celular ao receber uma ligação começará a tocar.', urlDaImagem: '' },
     { enunciado: 'Qual o nome do ícone da imagem acima?', resposta: 'Google Chrome', alternativas: [ 'Google Chrome', 'PlayStore', 'Lanterna' ], dica: 'Podemos usá-lo para fazer pesquisas na internet.', urlDaImagem: '' },
     { enunciado: 'O que permite o compartilhamento de dados e arquivos de maneira rápida e segura através de aparelhos?', resposta: 'Bluetooth', alternativas: [ 'WiFi', 'Bluetooth', 'Youtube' ], dica: ' Compartilha dados sem precisar de conexão à internet.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da funcionalidade da imagem acima?', resposta: 'Modo Avião', alternativas: [ 'WiFi', 'Lanterna', 'Modo Avião' ], dica: 'Quando ele está ativado eu paro de receber mensagens e ligações.', urlDaImagem: '' },
     { enunciado: 'O que tem nos celulares e serve para nos conectar à internet, sem o uso dos créditos?', resposta: 'WiFi', alternativas: [ 'Bluetooth', 'Google', 'WiFi' ], dica: 'Se ele ficar desativado e não possuímos créditos, a internet não funciona.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da funcionalidade da imagem acima?', resposta: 'Rotação de tela', alternativas: [ 'Lanterna', 'Som', 'Rotação de tela' ], dica: 'Eu uso quando quero assistir um vídeo e tenho que rodar a tela para ficar “maior”.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da funcionalidade que me permite ver os meus contatos?', resposta: 'Contatos/Agenda de contatos', alternativas: [ 'Som', 'Lanterna', 'Agenda de Contatos/Contatos' ], dica: 'Existe uma lista com os nomes de todos os números salvos.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da funcionalidade acima?', resposta: 'Localização', alternativas: [ 'Localização', 'Lanterna', 'WiFI' ], dica: 'Quando ela tá ativada as pessoas podem saber onde me encontro.', urlDaImagem: '' },
     { enunciado: 'Qual o nome funcionalidade acima?', resposta: 'Lanterna', alternativas: [ 'WiFi', 'Lanterna', 'Dados móveis' ], dica: 'Usamos quando a energia acaba e precisamos iluminar o local.', urlDaImagem: '' },
     { enunciado: 'Para qual número ligamos quando estamos em situações de risco, somos vítimas das ações de infratores, há perturbação da Ordem, etc?', resposta: 'Policia Militar - 190', alternativas: [  'Samu - 192', 'Policia Militar - 190', 'Bombeiros - 193' ], dica: 'Esse número é de uma corporação que garante a nossa segurança.', urlDaImagem: '' },
     { enunciado: 'Qual o nome funcionalidade acima?', resposta: 'Bluetooth', alternativas: [ 'Bluetooth', 'YouTube', 'WiFi' ], dica: ' Compartilha dados sem precisar de conexão à internet.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da funcionalidade da imagem acima?', resposta: 'Alarme/Relógio', alternativas: [ 'Agenda de Contatos', 'Perfil de som - Vibrar', 'Alarme' ], dica: 'Eu uso ele quando tenho um dia certo para tomar remédios.', urlDaImagem: '' },
     { enunciado: 'Qual funcionalidade do celular que desabilita conexões para manter a segurança durante uma viagem de avião?', resposta: 'Modo Avião', alternativas: [ 'Modo Avião', 'WiFi', 'Lanterna' ], dica: 'Quando ele está ativado eu paro de receber mensagens e ligações.', urlDaImagem: '' },
     { enunciado: 'Qual funcionalidade habilita ou desabilita a tela ‘virada’ ou ‘em pé’ do celular?', resposta: 'Rotação de tela', alternativas: [ 'Som', 'Rotação de tela', 'Lanterna' ], dica: 'Eu uso quando quero assistir um vídeo e tenho que rodar a tela para ficar “maior”.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da funcionalidade que me ajuda a marcar o horário para atividades que faço na minha rotina?', resposta: 'Alarme/Relógio', alternativas: [ 'Agenda de Contatos', 'Perfil de som - Vibrar', 'Alarme' ], dica: 'Eu uso ele quando tenho um dia certo para tomar remédios.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da funcionalidade da imagem acima?', resposta: 'Contatos/Agenda de contatos', alternativas: [ 'Som', 'Lanterna', 'Agenda de Contatos/Contatos' ], dica: 'Existe uma lista com os nomes de todos os números salvos.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da funcionalidade do meu celular que uso quando vou fazer ligações para alguém?', resposta: 'Telefone', alternativas: [ 'Telefone', 'Contatos', 'Alarme' ], dica: 'Quando vou usá-lo aparece um teclado com números.', urlDaImagem: '' },
     { enunciado: 'Para qual número ligamos quando precisamos resgatar um animal ou uma pessoa, ou quando há um incêndio ou um acidente doméstico?', resposta: 'Bombeiros - 193', alternativas: [  'Samu - 192', 'Policia Militar - 190', 'Bombeiros - 193' ], dica: 'Esse número também serve para ligar quando há afogamento, acidente com animal peçonhento, choque elétrico.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da funcionalidade acima?', resposta: 'Câmera', alternativas: [ 'Câmera', 'Alarme', 'Instagram' ], dica: 'Eu posso tirar fotos e gravar vídeos.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da funcionalidade da imagem acima?', resposta: 'Galeria', alternativas: [ 'Câmera', 'WhatsApp', 'Galeria' ], dica: 'Existem pastas com minhas fotos e meu vídeos.', urlDaImagem: '' },
     { enunciado: 'Qual perfil de som que ativa o som do meu celular?', resposta: 'Perfil de som - Com som', alternativas: [ 'Perfil de som - Com som', 'Perfil de som - Mudo', 'Perfil de som - Vibrar' ], dica: 'Se essa funcionalidade estiver ativada seu celular ao receber uma ligação começará a tocar.', urlDaImagem: '' },
     { enunciado: 'Para qual número ligamos quando sofremos um acidente ou estamos passando mal?', resposta: 'Samu - 192', alternativas: [ 'Samu - 192', 'Policia Militar - 190', 'Bombeiros - 193' ], dica: 'Esse número é de um programa que presta o socorro à população em casos de emergência relacionadas à saúde.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da funcionalidade que me permite visualizar todas a fotos e vídeos que existe no meu celular?', resposta: 'Galeria', alternativas: ['Câmera', 'WhatsApp', 'Galeria'], dica: 'Existem pastas com minhas fotos e meu vídeos.', urlDaImagem: '' },
     { enunciado: 'Qual perfil de som que desativa o som do meu celular?', resposta: 'Perfil de som - Mudo', alternativas: [ 'Perfil de som - Com som', 'Perfil de som - Mudo', 'Perfil de som - Vibrar' ], dica: 'Se essa funcionalidade estiver ativada seu celular ao receber uma ligação não fará barulho algum.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da funcionalidade da imagem acima?', resposta: 'Telefone', alternativas: [ 'Telefone', 'Contatos', 'Alarme' ], dica: 'Quando vou usá-lo aparece um teclado com números.', urlDaImagem: '' },
     { enunciado: 'Qual o nome do perfil de som acima?', resposta: 'Perfil de som - Vibrar', alternativas: [ 'Perfil de som - Com som', 'Perfil de som - Mudo', 'Perfil de som - Vibrar' ], dica: 'Se essa funcionalidade estiver ativada seu celular ao receber uma ligação ficará tremendo.', urlDaImagem: '' },
     { enunciado: 'Qual o nome da funcionalidade que me permite registrar momentos especiais que aconteceram na minha vida?', resposta: 'Câmera', alternativas: [ 'Câmera', 'Alarme', 'Instagram' ], dica: 'Eu posso tirar fotos e gravar vídeos.', urlDaImagem: '' },
     { enunciado: 'Qual a funcionalidade que quando ativada eu uso a internet móvel, no caso, a internet usando o chip?', resposta: 'Dados móveis', alternativas: [ 'Google Chrome', 'WiFi', 'Dados móveis' ], dica: 'Se ele estiver ativado eu gasto os meus créditos.', urlDaImagem: '' },
     { enunciado: 'Qual funcionalidade, que quando ativada permite o uso do mapa para saber onde eu estou em tempo real?', resposta: 'Localização', alternativas: [ 'WiFi', 'Lanterna', 'Localização' ], dica: 'Quando ela tá ativada as pessoas podem saber onde me encontro.', urlDaImagem: '' },
     { enunciado: 'Qual o número do SAMU?', resposta: '192', alternativas: [  '192', '190', '193' ], dica: 'Esse número é de um programa que presta o socorro à população em casos de emergência relacionadas à saúde.', urlDaImagem: '' },
     { enunciado: 'Qual o número da Polícia Militar?', resposta: '190', alternativas: [  '192', '190', '193' ], dica: 'Esse número é de uma corporação que garante a nossa segurança.', urlDaImagem: '' },
     { enunciado: 'Qual perfil de som que faz meu celular vibrar, sem toque?', resposta: 'Perfil de som - Vibrar', alternativas: [ 'Perfil de som - Com som', 'Perfil de som - Mudo', 'Perfil de som - Vibrar' ], dica: 'Se essa funcionalidade estiver ativada seu celular ao receber uma ligação ficará tremendo.', urlDaImagem: '' },
     { enunciado: 'Qual o número dos Bombeiros?', resposta: '193', alternativas: [  '192', '190', '193' ], dica: 'Esse número também serve para ligar quando há afogamento, acidente com animal peçonhento, choque elétrico.', urlDaImagem: '' }



   ];

    perguntas.forEach(async pergunta => await this.bdService.insertInList<Pergunta>('/perguntas', pergunta));
}*/

  ngOnInit() {
    
    }
   


  abrirPagina(url:String){
    this.rota.navigate([url]);

  }

}
