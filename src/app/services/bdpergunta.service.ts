

import { Injectable } from '@angular/core';

import{ AngularFireDatabase} from '@angular/fire/database';


import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BdperguntaService {
  
  constructor(private bd: AngularFireDatabase) { }

 listar<Type>(entity: any): Observable<Type[]> {
  return this.bd.list<Type>(`/${entity}`).valueChanges();
 }
}
