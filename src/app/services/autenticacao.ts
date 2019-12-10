import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { Usuario } from '../../models/usuario';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';
import { BDService } from './bd.service';


@Injectable()
export class Autenticacao {
  usuario: Observable<firebase.User>;
  private userDetails: firebase.User;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.usuario = angularFireAuth.authState;
    this.usuario.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        }
        else {
          this.userDetails = null;
        }
      }
    );
  }

  createUser(user: Usuario) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.senha);
  }

  signIn(email:string,senha:string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email,senha);
  }

  isLoggedIn() {
    if (this.userDetails===null) {
      return false;
    } else {
      return true;
    }
  }

  signOut() {
    return this.angularFireAuth.auth.signOut();
  }

  getEmail() {
    if(this.isLoggedIn()==true){
      return this.userDetails.email;
    }
    
  }
  getUser(){
    return this.userDetails;
  }

}
