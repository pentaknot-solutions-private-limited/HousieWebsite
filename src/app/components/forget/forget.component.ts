import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchDetailsService } from '../matchdetails/service/matchdetails.service';
import { CheckPlayerMatch, MatchPlayerPointRel } from '../matchdetails/model/matchdetails.model';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../login/Services/login.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css'],
  providers: [MatchDetailsService, ToastyService, ToastyConfig, LoginService]
})
export class ForgetComponent implements OnInit {
  Token: string;
  errMsg: string;
  isError: boolean;
  changed: boolean;
  password: string;
  constructor(private _router: ActivatedRoute,
    private _route: Router,
    private _loginService: LoginService,
    private spinner: NgxSpinnerService,
    private _matchDetail: MatchDetailsService,
    public dialog: MatDialog,
    private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'top-center';
    this.isError = false;
  }

  resetPassword() {
    this.spinner.show();
    this._loginService.ChangePassword(this.Token , this.password).subscribe(
      data => {
        this.spinner.hide();
        if (data) {
          this.changed = true;
          this.toastyService.success('Password Successfully Changed');
        } else {
          this.toastyService.error('Failed: Some Error Occurs');
        }
      }
    );
  }

  ngOnInit() {
    this.isError = true;
    this.Token = this._router.snapshot.params['Token'];
    this._loginService.CheckLink(encodeURIComponent(this.Token)).subscribe(
      data => {
        if (data === null) {
          this.isError = true;
          this.errMsg = 'Link is Invalid';
        } else {
          if (data.isDeleted) {
          this.isError = true;
          this.errMsg = 'Link is Expired';
          } else {
            this.changed = false;
          }
        }
      }
    );
  }

}
