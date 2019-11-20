import { Resposta } from './resposta';
export class Usuario{
    uid: string;
    nome: string;
    email: string;
    //genero: string;
   //dataNasc: Date;

   perguntasRespondidas: Resposta[]; 
    constructor(uid: string,nome:string, email:string){
        this.nome=nome;
        this.email=email;
       this.uid=uid;
    }

}