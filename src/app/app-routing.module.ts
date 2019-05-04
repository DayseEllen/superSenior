import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'cadastrar', loadChildren: './cadastrar/cadastrar.module#CadastrarPageModule' },
  { path: 'formulariocadastro', loadChildren: './formulariocadastro/formulariocadastro.module#FormulariocadastroPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'info', loadChildren: './info/info.module#InfoPageModule' },
  { path: 'meu-perfil', loadChildren: './meu-perfil/meu-perfil.module#MeuPerfilPageModule' },
  { path: 'meu-avanco', loadChildren: './meu-avanco/meu-avanco.module#MeuAvancoPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
