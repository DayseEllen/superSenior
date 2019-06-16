import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AngularFireAuth } from "angularfire2/auth";
import { Usuario } from './../../models/usuario';
import * as firebase from 'firebase/app';

@Injectable()
export class Autenticacao {
    usuario: Observable<firebase.User>;

    constructor(private angularFireAuth : AngularFireAuth){
         this.usuario = angularFireAuth.authState;
    }

    createUser(user: Usuario){
       return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.senha);
    }

    signIn(user: Usuario){
        return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.senha);
    }

    signOut(){
        return this.angularFireAuth.auth.signOut();
    }


}