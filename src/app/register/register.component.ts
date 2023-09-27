// import { Component, OnInit } from '@angular/core';
// //import { UsersService } from "../usuarios.service";

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {

//   email: string;
//   password: string;
//   password: string;
//   passwordError: boolean;

//   constructor(public userService: UsersService) {}

//   ngOnInit(): void {
//     throw new Error('Method not implemented.');
//   }

//   register() {
//     const user = { email: this.email, password: this.password };
//     this.userService.register(user).subscribe(data => {
//       this.userService.setToken(data.token);
//     });
//   }
// }