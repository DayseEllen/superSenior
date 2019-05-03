
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MeuAvancoPage } from './meu-avanco.page';

const routes: Routes = [
  {
    path: '',
    component: MeuAvancoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  
  ],
  declarations: [MeuAvancoPage]
})
export class MeuAvancoPageModule {}
