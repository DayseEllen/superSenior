import { Resposta } from './resposta';
export class Usuario{
    uid: string;
    nome: string;
    email: string;
    genero: string;
   idade: number;
   pontosPerguntas: number;
   pontosMemoria:number;
   pontosArrasta:number;
   perguntasRespondidas: Resposta[]; 
    constructor(uid: string,nome:string, email:string, genero:string, idade: number, pontosP:number,pontosM:number,pontosA:number, perguntasRespondidas:Resposta[]){
        this.nome=nome;
        this.email=email;
       this.uid=uid;
       this.genero=genero;
       this.idade=idade;
       this.pontosPerguntas=pontosP;
       this.pontosMemoria=pontosM;
       this.pontosArrasta=pontosA;
       this.perguntasRespondidas=perguntasRespondidas;
    }

}