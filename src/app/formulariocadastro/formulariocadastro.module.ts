import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FormulariocadastroPage } from './formulariocadastro.page';

const routes: Routes = [
  {
    path: '',
    component: FormulariocadastroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormulariocadastroPage]
})
export class FormulariocadastroPageModule {}
