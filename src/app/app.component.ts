import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
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
    },
    {
      title: 'Meu avanço',
      icon:'fitness',
      url: "/meu-avanco"
    },
    {
      title: 'Sair',
      url: '/cadastrar',
      icon: 'log-out'
    }      
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
