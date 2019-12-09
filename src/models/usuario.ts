
export class Usuario {
    nome: string;
    username:string;
    email:string;
    genero: string;
    idade: number;
    senha: string;
    pontosPerguntas: number;
    pontosMemoria: number;
    pontosArrasta: number;
    qtPerguntas:number;
    qtMemoria:number;
    qtArrasta:number;
    constructor(nome: string, username:string, email:string, genero: string, idade: number,senha:string) {
        this.nome = nome;
        this.genero = genero;
        this.idade = idade;
        this.username=username;
        this.email=email;
        this.senha=senha;
    }

}