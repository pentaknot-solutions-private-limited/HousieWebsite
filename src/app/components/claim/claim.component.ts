import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchDetailsService } from '../matchdetails/service/matchdetails.service';
import { CheckPlayerMatch, MatchPlayerPointRel } from '../matchdetails/model/matchdetails.model';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css'],
  providers: [MatchDetailsService, ToastyService, ToastyConfig]
})
export class ClaimComponent implements OnInit {

  ID: string;
  Token: string;
  checkPlayerError: string;
  isError: boolean;
  isWon: boolean;
  loading: boolean;
  markedNumbers: Array<number> = new Array();
  CheckPlayerMatchModel: CheckPlayerMatch = new CheckPlayerMatch();
  MatchPlayerPointRelModel: MatchPlayerPointRel = new MatchPlayerPointRel();
  items = ['First', 'Middle', 'Bottom', 'Full'];
  key: any;
  constructor(private _router: ActivatedRoute,
    private _route: Router,
    private spinner: NgxSpinnerService,
    private _matchDetail: MatchDetailsService,
    public dialog: MatDialog,
    private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'top-center';
  }

  ngOnInit() {
    this.ID = this._router.snapshot.params['ID'];
    this.Token = this._router.snapshot.params['Token'];
    this.key = JSON.parse(localStorage.getItem('HousieGame'));
    this.checkPlayerMatch();
  }

  /* Dialog for delete  */

  // tslint:disable-next-line:member-ordering
  Yes: string;
  // tslint:disable-next-line:member-ordering
  No: string;
  // tslint:disable-next-line:member-ordering
  tempId: number;

  openDialog() {
    // console.log(Id);
    // tslint:disable-next-line:prefer-const
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '100vh',
      data: {
        MatchPlayerPointRel: this.Yes, No: this.No
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.No = result;
      if (result === 'Yes') {
        // console.log('Success');
      }
    });
  }

  addToast(msg: string, router: Router) {
    // Just add default Toast with title only
    // Or create the instance of ToastOptions
    // tslint:disable-next-line:prefer-const
    let toastOptions: ToastOptions = {
        title: 'Success',
        msg: msg,
        showClose: true,
        timeout: 2000,
        theme: 'default',
        onRemove: function(toast: ToastData) {
            router.navigate(['/match-list']);
        }
    };
    this.toastyService.success(toastOptions);
  }

  submitFirst() {
    this.spinner.show();
    this.MatchPlayerPointRelModel.playerId = this.key['PlayerId'];
    this.MatchPlayerPointRelModel.matchId = this.ID;
    this.MatchPlayerPointRelModel.firstLine = true;
    this.MatchPlayerPointRelModel.createdBy = this.key['PlayerId'];
    this.MatchPlayerPointRelModel.updatedBy = this.key['PlayerId'];
    this._matchDetail.MatchPlayerPointRel(this.MatchPlayerPointRelModel).subscribe(
      data => {
        this.spinner.hide();
        if (data.wrongClaim) {
          this.isError = true;
          if (data.wrongClaim) {
            this.checkPlayerError = 'Game Over !!';
            this.toastyService.error('Your Claim was incorrect, You Cannot Continue for this match. ');
          }
        } else if (data.lateClaim) {
          this.toastyService.warning('Sorry, you are late. Someone has already claimed for it');
        } else {
          // Dialog
          const dialogRef = this.dialog.open(DialogComponent, {
            width: '400px',
            data: {
              MatchPlayerPointRel: data.matchPlayerPointRelModel
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
            this.isError = true;
            this.checkPlayerError = 'You Won the First Line of this Match';
            this.addToast('Congratulation, Your Prize Claim was succesfull', this._route);
          });
          // End Dialog
          this.toastyService.success('Congratulation, Your Claim was succesfull');
        }
      }, err => {
        if (err) {
          this.toastyService.warning('An Error has occured please try again after some time !' + err);
        }
      }
    );
  }

  submitSecond() {
    this.spinner.show();
    this.MatchPlayerPointRelModel.playerId = this.key['PlayerId'];
    this.MatchPlayerPointRelModel.matchId = this.ID;
    this.MatchPlayerPointRelModel.secondLine = true;
    this._matchDetail.MatchPlayerPointRel(this.MatchPlayerPointRelModel).subscribe(
      data => {
        this.spinner.hide();
        if (data.wrongClaim) {
          this.isError = true;
          if (data.wrongClaim) {
            this.checkPlayerError = 'Game Over !!';
            this.toastyService.error('Your Claim was incorrect, You Cannot Continue for this match. ');
          }
        } else if (data.lateClaim) {
          this.toastyService.warning('Sorry, you are late. Someone has already claimed for it');
        } else {
          // Dialog
          const dialogRef = this.dialog.open(DialogComponent, {
            width: '400px',
            data: {
              MatchPlayerPointRel: data.matchPlayerPointRelModel
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
            this.isError = true;
            this.checkPlayerError = 'You Won the Second Line of this Match';
            this.addToast('Congratulation, Your Prize Claim was succesfull', this._route);
          });
          // End Dialog
          this.toastyService.success('Congratulation, Your Claim was succesfull');
        }
      }, err => {
        if (err) {
          this.toastyService.warning('An Error has occured please try again after some time !' + err);
        }
      }
    );
  }

  submitThird() {
    this.spinner.show();
    this.MatchPlayerPointRelModel.playerId = this.key['PlayerId'];
    this.MatchPlayerPointRelModel.matchId = this.ID;
    this.MatchPlayerPointRelModel.thirdLine = true;
    this._matchDetail.MatchPlayerPointRel(this.MatchPlayerPointRelModel).subscribe(
      data => {
        this.spinner.hide();
        if (data.wrongClaim) {
          this.isError = true;
          if (data.wrongClaim) {
            this.checkPlayerError = 'Game Over !!';
            this.toastyService.error('Your Claim was incorrect, You Cannot Continue for this match. ');
          }
        } else if (data.lateClaim) {
          this.toastyService.warning('Sorry, you are late. Someone has already claimed for it');
        } else {
          // Dialog
          const dialogRef = this.dialog.open(DialogComponent, {
            width: '400px',
            data: {
              MatchPlayerPointRel: data.matchPlayerPointRelModel
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
            this.isError = true;
            this.checkPlayerError = 'You Won the Third Line of this Match';
            this.addToast('Congratulation, Your Prize Claim was succesfull', this._route);
          });
          // End Dialog
          this.toastyService.success('Congratulation, Your Claim was succesfull');
        }
      }, err => {
        if (err) {
          this.toastyService.warning('An Error has occured please try again after some time !' + err);
        }
      }
    );
  }

  submitFull() {
    this.spinner.show();
    this.MatchPlayerPointRelModel.playerId = this.key['PlayerId'];
    this.MatchPlayerPointRelModel.matchId = this.ID;
    this.MatchPlayerPointRelModel.fullHousie = true;
    this._matchDetail.MatchPlayerPointRel(this.MatchPlayerPointRelModel).subscribe(
      data => {
        this.spinner.hide();
        if (data.wrongClaim) {
          this.isError = true;
          if (data.wrongClaim) {
            this.checkPlayerError = 'Game Over !!';
            this.toastyService.error('Your Claim was incorrect, You Cannot Continue for this match. ');
          }
        } else if (data.lateClaim) {
          this.toastyService.warning('Sorry, you are late. Someone has already claimed for it');
        } else {
          this.isError = true;
            this.checkPlayerError = 'You Won the Full Housie of this Match';
            this.addToast('Congratulation, Your Claim was succesfull', this._route);
        }
      }, err => {
        if (err) {
          this.toastyService.warning('An Error has occured please try again after some time !' + err);
        }
      }
    );
  }





  checkPlayerMatch() {
    this.spinner.show();
    this.loading = true;
    this._matchDetail.CheckPlayerMatch(this.key['PlayerId'], this.ID).subscribe(
      data => {
        this.spinner.hide();
        this.loading = false;
        if (data !== null) {
          this.isError = false;
          if (data.playerDeleted) {
            this.isError = true;
            this.checkPlayerError = 'Your Claim was incorrect, You Cannot Continue for this match. Game Over !!';
          }
          if (data.alreadyClaim) {
            this.isError = true;
            this.checkPlayerError = 'You Already Have a Successfull Claim on this match';
          }
          if (data.matchDeleted) {
            this.isError = true;
            this.checkPlayerError = 'Game Over!!';
          }
          if (data.count === 0) {
            this.isError = true;
            this.checkPlayerError = 'Match has not Started Yet, Try Again Later or Refresh Page';
          }
        } else {
          this.isError = true;
          this.checkPlayerError = 'You have not Registered for this Match';
        }
      }, err => {
        if (err) {
          this.toastyService.warning('An Error has occured please try again after some time !' + err);
        }
      }
    );
  }

}
