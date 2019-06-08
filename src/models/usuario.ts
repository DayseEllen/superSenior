import { Resposta } from './resposta';
export class Usuario{
    nome: String = '';
    email: String='';
    senha: String='';
    telefone: String ='';
    genero: String='';
    perguntasRespondidas: Resposta[]; 
    constructor(nome:String, email:String, senha:String, telefone:String, genero: String){
        this.nome=nome;
        this.email=email;
        this.senha=senha;
        this.telefone=telefone;
        this.genero=genero;

    }

}