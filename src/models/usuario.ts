
export class Usuario {
    uid: string;
    nome: string;
    username: string;
    email: string;
    genero: string;
    idade: string;
    senha: string;
    nomeM: string;
    pontosPerguntas: number;
    pontosMemoria: number;
    pontosArrasta: number;
    qtPerguntas: number;
    qtMemoria: number;
    qtArrasta: number;
    constructor(uid: string, nome: string, username: string, email: string, genero: string, idade: string, senha: string,nomeM:string, pontosP: number, pontosM: number,
        pontosA: number, qtP: number, qtM: number, qtA: number) {
        this.uid = uid;
        this.nome = nome;
        this.genero = genero;
        this.idade = idade;
        this.username = username;
        this.email = email;
        this.senha = senha;
        this.pontosPerguntas = pontosP;
        this.pontosMemoria = pontosM;
        this.pontosArrasta = pontosA;
        this.qtPerguntas = qtP;
        this.qtMemoria = qtM;
        this.qtArrasta = qtA;
        this.nomeM=nomeM;
    }


}