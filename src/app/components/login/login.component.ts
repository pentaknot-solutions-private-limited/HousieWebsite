import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
// import { AppService } from './Services/login.service';
import { LoginModel, Player } from './Model/login.model';
import { LoginService } from './Services/login.service';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgModel, NgForm } from '@angular/forms';

import {
  ToastyService,
  ToastyConfig,
  ToastOptions,
  ToastData
} from 'ng2-toasty';
import { PolicyComponent } from '../policy/policy.component';
import { debounceTime } from 'rxjs/operators';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, ToastyService, ToastyConfig]
})
export class LoginComponent implements OnInit {
  @ViewChild('registerEmail') registerEmailId: NgModel;
  @ViewChild('registrationForm') registrationForm: NgForm;
  LoginModel: LoginModel = new LoginModel();
  Player: Player = new Player();
  webresponse: any;
  policyChecked = false;
  public loading = false;
  public Isdisabled = false;
  isReset = false;
  isLogin = true;
  isSignUp = false;
  returnUrl: any;
  emailExists: boolean;
  formChangesSubscription: any;
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private spinner: NgxSpinnerService,
    private _loginService: LoginService,
    public dialog: MatDialog,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'top-center';
  }

  checkTOS() {
    // console.log(this.policyChecked);
  }

  checkEmail() {
    if (this.registerEmailId.valid) {
      this.spinner.show();
      this._loginService.CheckEmail(this.Player.email).subscribe(
        data => {
          if (data) {
            this.emailExists = true;
          } else {
            this.emailExists = false;
          }
          this.spinner.hide();
        }
      );
    }
  }

  resetForm() {
    this.Player.name = undefined;
    this.Player.email = undefined;
    this.Player.passwordHash = undefined;
    this.Player.mobileNumber = undefined;
    this.policyChecked = undefined;
  }

  setSignUp() {
    this.isLogin = false;
    this.isSignUp = true;
    this.isReset = false;
  }

  setReset() {
    this.isLogin = false;
    this.isReset = true;
    this.isSignUp = false;
  }

  setLogin() {
    this.isSignUp = false;
    this.isLogin = true;
    this.isReset = false;
  }

  clicked() {
    if (!this.policyChecked) {
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
    this.emailExists = false;
    this.spinner.show();
    this._loginService.AddPlayer(this.Player).subscribe(
      data => {
        this.webresponse = data.data;
        if (this.webresponse == null) {
          this.toastyService.error('Registration Failed');
          this.spinner.hide();
          this.Isdisabled = false;
        } else {
          this.toastyService.success('Registered Successfully');
          this.setLogin();
          this.spinner.hide();
          this.Player.email = '';
        }
        this.resetForm();
      },
      err => {
        if (err) {
          this.Isdisabled = false;
          this.toastyService.error('An Error has occured please try again after some time !' + err);
        }
      }
    );
  }

  onResetSubmit() {
    this.spinner.show();
    this.Isdisabled = true;
    this._loginService.SendForgetPaswordLink(this.Player).subscribe(
      data => {
        this.spinner.hide();
        if (data.message === 'no-player') {
          this.toastyService.error('Email Address Not Found');
        } else {
          this.toastyService.success('Reset Password link has sent to your Email');
        }
      }
    );
  }

  onLoginSubmit() {
    this.spinner.show();
    this.Isdisabled = true;
    this._loginService.ValidatePlayer(this.Player).subscribe(
      data => {
        this.webresponse = data;
        if (this.webresponse == null) {
          // alert("Invalid Username and Password");
          this.toastyService.error('Invalid Username or Password');
          this.spinner.hide();
          this.Isdisabled = false;
        } else {
          // alert("Logged in Successfully");
          this.toastyService.success('Logged in Successfully');
          this.spinner.hide();
          this._router.navigateByUrl(this.returnUrl);
        }
        this.resetForm();
      },
      err => {
        if (err) {
          this.Isdisabled = false;
          this.toastyService.error('An Error has occured please try again after some time !' + err);
        }
      });
  }

  // onLoginSubmit() {
  //   this.spinner.show();
  //   this.Isdisabled = true;
  //   this._AppService.ValidatePlayer(this.Player).subscribe(
  //     data => {
  //       this.webresponse = data;
  //       // console.log(this.webresponse);
  //       if (this.webresponse == null) {
  //         // alert("Invalid Username and Password");
  //         this.toastyService.error('Invalid Username or Password');
  //         this.spinner.hide();
  //         this.Isdisabled = false;
  //         this._router.navigate(['Login']);
  //       } else {
  //         // alert("Logged in Successfully");
  //         this.toastyService.success('Logged in Successfully');
  //         this.spinner.hide();
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
    this.emailExists = false;
    if (localStorage.getItem('HousieGame')) {
      this._router.navigate(['/match-list']);
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/match-list';
  }

}

