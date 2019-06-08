import { Component, OnInit } from '@angular/core';
// import { Login, Player } from './app.model';
// import { AppService } from './app.service';
import { Router, Route, RouterOutlet } from '@angular/router';
// import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [AppService]
})
export class AppComponent implements OnInit {
  users: Object;

  // Login: Login = new Login();
  // Player: Player = new Player();

  // userExist: boolean;
  // signUp: boolean;
  // constructor(private _appService: AppService, private _router: Router) {
  // constructor(private data: AppService) {
  constructor() {
  }

  ngOnInit() {
    // this.data.getUsers().subscribe(data => {
    //   this.users = data;
    //   console.log(this.users);
    // }
    // );
  }

}
// this.loadScript('assets/main.js.download');
      // this._appService.GetAllAdmin()
      // .subscribe(
      //   data => {
      //       this.Login.email = data[0].email,
      //       this.Login.passwordHash = data[0].passwordHash;
      //     }
      //   );
    // setSignUp() {
    //   this.signUp = true;
    // }

    // setLogin() {
    //   this.signUp = false;
    // }

    // registerPlayer(registrationForm) {
    //   this._appService.AddPlayer(this.Player)
    //   .subscribe( data =>  {
    //     registrationForm.reset();
    //     alert('Registered Succesfully!');
    //   });
    // }

    // onSubmit() {
    //   // alert(this.Login.email + '\n' + this.Login.passwordHash);
    //   this.Player.email = this.Login.email;
    //   this.Player.passwordHash = this.Login.passwordHash;

    //   this._appService.ValidatePlayer(this.Player)
    //   .subscribe(
    //     data => {
    //         if ( data != null) {
    //           // window.open('https://mydashboard-9c602.firebaseapp.com/home', '_self');
    //           alert('Loged IN');
    //         } else {
    //           alert('Wrong password');
    //         }
    //       }
    //     );
    // }

    // public loadScript(url: string) {
    //   const node = document.createElement('script');
    //   node.src = url;
    //   node.type = 'text/javascript';
    //   node.async = true;
    //   node.charset = 'utf-8';
    //   document.getElementsByTagName('head')[0].appendChild(node);
    // }
//   }
// }
