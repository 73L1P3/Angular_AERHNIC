import { Component, OnInit } from '@angular/core';
//import { UsersService } from "../usuarios.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;

  //constructor(public userService: UsersService, public router: Router) {}
  constructor(public router: Router) {}

  ngOnInit(): void {
  }

  login() {
    console.log(this.email);
    console.log(this.password);

    alert('Has ingresado' + this.email)
  }

}
