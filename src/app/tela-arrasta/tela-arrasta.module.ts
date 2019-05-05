import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TelaArrastaPage } from './tela-arrasta.page';

const routes: Routes = [
  {
    path: '',
    component: TelaArrastaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TelaArrastaPage]
})
export class TelaArrastaPageModule {}
