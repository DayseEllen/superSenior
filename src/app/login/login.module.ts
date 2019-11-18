import { Autenticacao } from './../services/autenticacao';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from 'angularfire2/auth';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AngularFireAuthModule
  ],
  declarations: [LoginPage],
  providers: [AngularFireAuth,
  Autenticacao]
})

export class LoginPageModule {}
