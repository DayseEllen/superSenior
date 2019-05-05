import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TelaPerguntaPage } from './tela-pergunta.page';

const routes: Routes = [
  {
    path: '',
    component: TelaPerguntaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TelaPerguntaPage]
})
export class TelaPerguntaPageModule {}
