import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private rota: Router, public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  abrirPagina(url:String){
    this.rota.navigate([url]);

  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  
  logout() {
    this.afAuth.auth.signOut();
  }

}
