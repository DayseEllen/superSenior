import { Resposta } from './resposta';
export class Usuario{
    nome: string = '';
    email: string='';
    senha: string='';
    telefone: string ='';
    genero: string='';
    perguntasRespondidas: Resposta[]; 
    constructor(nome:string, email:string, senha:string, telefone:string, genero: string){
        this.nome=nome;
        this.email=email;
        this.senha=senha;
        this.telefone=telefone;
        this.genero=genero;

    }

}