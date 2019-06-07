import { Resposta } from './resposta';
export class Usuario{
    nome: String = '';
    email: String='';
    senha: String='';
    telefone: String ='';
    genero: String='';
    perguntasRespondidas: Resposta[];  
}