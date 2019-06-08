import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
// import { AppService } from './Services/login.service';
import { LoginModel, Player } from './Model/login.model';
import { LoginService } from './Services/login.service';
import {MatDialog} from '@angular/material';

import {
  ToastyService,
  ToastyConfig,
  ToastOptions,
  ToastData
} from 'ng2-toasty';
import { PolicyComponent } from '../policy/policy.component';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, ToastyService, ToastyConfig]
})
export class LoginComponent implements OnInit {

  LoginModel: LoginModel = new LoginModel();
  Player: Player = new Player();
  webresponse: any;
  signUp: boolean;
  policyChecked = false;
  public loading = false;
  public Isdisabled = false;
  returnUrl: any;
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService,
    public dialog: MatDialog,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'top-center';
  }

  setSignUp() {
    this.signUp = true;
  }

  setLogin() {
    this.signUp = false;
  }

  clicked() {
    if (!this.policyChecked)  {
      this.toastyService.error('Registration Failed');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PolicyComponent, {
      width: '95vw',
      maxHeight: '80vw',
      data: 'someee'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  registerPlayer(registrationForm) {
    this._loginService.AddPlayer(this.Player).subscribe(
      data => {
        this.webresponse = data.data;
        if (this.webresponse == null) {
          this.toastyService.error('Registration Failed');
          this.loading = false;
          this.Isdisabled = false;
      } else {
          this.toastyService.success('Registered Successfully');
          this.setLogin();
          this.loading = false;
          this.Player.email = '';
      }
      },
      err => {
        if (err) {
            this.Isdisabled = false;
            this.toastyService.error('An Error has occured please try again after some time !' + err);
        }
      }
    );
  }

  onLoginSubmit() {
    this.loading = true;
    this.Isdisabled = true;
    this._loginService.ValidatePlayer(this.Player).subscribe(
      data => {
        this.webresponse = data;
        if (this.webresponse == null) {
          // alert("Invalid Username and Password");
          this.toastyService.error('Invalid Username or Password');
          this.loading = false;
          this.Isdisabled = false;
      } else {
          // alert("Logged in Successfully");
          this.toastyService.success('Logged in Successfully');
          this.loading = false;
          this._router.navigateByUrl(this.returnUrl);
      }
      },
      err => {
        if (err) {
            this.Isdisabled = false;
            this.toastyService.error('An Error has occured please try again after some time !' + err);
        }
    });
  }

  // onLoginSubmit() {
  //   this.loading = true;
  //   this.Isdisabled = true;
  //   this._AppService.ValidatePlayer(this.Player).subscribe(
  //     data => {
  //       this.webresponse = data;
  //       // console.log(this.webresponse);
  //       if (this.webresponse == null) {
  //         // alert("Invalid Username and Password");
  //         this.toastyService.error('Invalid Username or Password');
  //         this.loading = false;
  //         this.Isdisabled = false;
  //         this._router.navigate(['Login']);
  //       } else {
  //         // alert("Logged in Successfully");
  //         this.toastyService.success('Logged in Successfully');
  //         this.loading = false;
  //         this._router.navigate(['/']);
  //       }
  //     },
  //     err => {
  //       if (err) {
  //         this.Isdisabled = false;
  //         this.toastyService.error(
  //           'An Error has occured please try again after some time !' + err
  //         );
  //       }
  //     }
  //   );
  //   // localStorage.setItem('SIAdminKey', 'TODO:test')
  //   // this._router.navigateByUrl('/home');
  // }
  ngOnInit(): void {
    if (localStorage.getItem('HousieGame')) {
      this._router.navigate(['/match-list']);
    }
    this.signUp = false;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/match-list';
   }

}

