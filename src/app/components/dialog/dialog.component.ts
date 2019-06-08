import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatchPlayerPointRel } from '../matchdetails/model/matchdetails.model';
import { MatchDetailsService } from '../matchdetails/service/matchdetails.service';
import { AppConfig } from '../_config/app.config';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [MatchDetailsService]
})


/** dialog component*/
export class DialogComponent {
    /** dialog ctor */
    matchPriceDetails: Array<any>;
    public priceImageUrl = new AppConfig().priceImagesUrl;
    matchPlayerPointRel: MatchPlayerPointRel = new MatchPlayerPointRel();
  selectedIndex: any;
  imgZoom: any;
  caption: string;
    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        private spinner: NgxSpinnerService,
        private _matchDetailsService: MatchDetailsService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            dialogRef.disableClose = true;
            this.matchPlayerPointRel = data.MatchPlayerPointRel;
            // console.log(data.MatchPlayerPointRel);
            // console.log(this.matchPlayerPointRel);
            this.spinner.show();
            this._matchDetailsService.GetPriceDetailsbyMatchId(this.matchPlayerPointRel.matchId).subscribe(
              result => {
                this.spinner.hide();
                if (data.length !== 0) {
                  this.matchPriceDetails = result;
                  // this.imgZoom = result[0].fileName;
                  // this.caption = 'Full Housie';
                  // this.selectedIndex = 1;
                }
              }
            );
        }

        displayZoom(item) {
          if (item.isActive) {
          this.selectedIndex = item.displayPosition;
          this.imgZoom = item.fileName;
          this.matchPlayerPointRel.claimedPrize = item.displayPosition;
          } else {
            // console.log('Already Taken');
          }
        }

        Submit() {
          this.spinner.show();
          this._matchDetailsService.ClaimPrize(this.matchPlayerPointRel).subscribe(
            data => {
              this.spinner.hide();
              this.dialogRef.close();
            }
          );
        }
}
