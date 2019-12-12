import { BDService } from './../services/bd.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecuperarsenhaPage } from './recuperarsenha.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarsenhaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecuperarsenhaPage],
  providers:[
    BDService
  ]
})
export class RecuperarsenhaPageModule {}
