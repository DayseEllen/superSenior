import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Opções de jogo',
      url: '/home',
      icon: 'football'
    },
    {
      title: 'Meu perfil',
      icon: 'person',
      url: "/meu-perfil"
    },
    {
      title: 'Informações',
      icon: 'information-circle-outline',
      url: '/info'
    }     
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private rota: Router,
    private afAuth : AngularFireAuth
  ) {
    this.initializeApp();
    const authObserver = afAuth.authState.subscribe(usuario => {
      if(usuario){
        this.rota.navigate(['/home'])
        authObserver.unsubscribe();
      }else{
        this.rota.navigate(['cadastrar'])
        authObserver.unsubscribe();
      }
    })
  }

  

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
