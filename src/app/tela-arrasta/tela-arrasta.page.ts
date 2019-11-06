import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tela-arrasta',
  templateUrl: './tela-arrasta.page.html',
  styleUrls: ['./tela-arrasta.page.scss'],
})
export class TelaArrastaPage implements OnInit {

  constructor(private rota: Router, private toastController: ToastController, private dragulaService: DragulaService) {
    
  }

  
  ngOnInit() {
  }

  abrirPagina(url:String){
    this.rota.navigate([url]);

  }

}
