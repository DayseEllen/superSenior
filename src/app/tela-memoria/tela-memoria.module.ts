import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TelaMemoriaPage } from './tela-memoria.page';

const routes: Routes = [
  {
    path: '',
    component: TelaMemoriaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TelaMemoriaPage]
})
export class TelaMemoriaPageModule {}
