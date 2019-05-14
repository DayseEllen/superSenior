

import { Injectable } from '@angular/core';

import{ AngularFireDatabase} from '@angular/fire/database';

import {Observable} from 'rxjs';
import { PerguntaI } from 'src/models/pergunta.interface';

@Injectable({
  providedIn: 'root'
})
export class BdperguntaService {
  private pergunta: Observable<PerguntaI[]>;

  constructor(private bd: AngularFireDatabase) { }

  getPerguntas(){
   
  }
}
