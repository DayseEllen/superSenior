import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private rota: Router) { }

  ngOnInit() {
  }

  goInit(){
    this.rota.navigate(['cadastrar']);
 }
 goHome(){
  this.rota.navigate(['home']);
 }

}
