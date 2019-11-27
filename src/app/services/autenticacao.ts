import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { Usuario } from './../../models/usuario';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {auth} from 'firebase/app';

@Injectable()
export class Autenticacao {
     private usuario: Observable<firebase.User>;
     private userDetails: firebase.User;

    constructor(private angularFireAuth : AngularFireAuth, private router: Router, private angularFirestore: AngularFirestore){
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

 
    signInWithGoogle() {
      return this.angularFireAuth.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      ).then((res) => this.router.navigate(['/home']));
    }

  isLoggedIn() {
    if (this.userDetails == null ) {
        return false;
      } else {
        return true;
      }
    }
    
  logout() {
      this.angularFireAuth.auth.signOut()
      .then((res) => this.router.navigate(['/cadastrar']));
    }

    getDisplayName(){
      if(this.isLoggedIn()){
        return this.userDetails.displayName;
      }
      
    }
   getEmail(){
    if(this.isLoggedIn()){
      return this.userDetails.email;
    }
    }
    getUid(){
      if(this.isLoggedIn()){
        return this.userDetails.uid;
      }
    }
  }
