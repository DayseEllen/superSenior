import { Resposta } from './resposta';
export class Usuario{
    uid: string;
    nome: string;
    email: string;
    genero: string;
   dataNasc: Date;

   perguntasRespondidas: Resposta[]; 
   /* constructor(nome:string, email:string, genero: string, dataNasc: Date){
        this.nome=nome;
        this.email=email;
        this.genero=genero;
        this.dataNasc=dataNasc;
    }*/

}