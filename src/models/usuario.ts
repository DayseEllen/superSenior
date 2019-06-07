import { Resposta } from './resposta';
export class Usuario{
    nome: String = '';
    email: String='';
    senha: String='';
    telefone: String ='';
    genero: String='';
<<<<<<< HEAD
    perguntasRespondidas: Resposta[]; 
    constructor(nome:String, email:String, senha:String, telefone:String, genero: String){
        this.nome=nome;
        this.email=email;
        this.senha=senha;
        this.telefone=telefone;
        this.genero=genero;

    }
=======
    perguntasRespondidas: Resposta[];  
>>>>>>> 1db456f9ded7d628bec8aa665af1b5b65623a072
}