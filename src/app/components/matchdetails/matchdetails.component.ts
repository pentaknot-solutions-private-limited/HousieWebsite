import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchDetailsService } from './service/matchdetails.service';
import { MatchDetail, MatchPlayerRel } from './model/matchdetails.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConfig } from '../_config/app.config';
import { ToastyConfig, ToastyService, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'app-matchdetails',
  templateUrl: './matchdetails.component.html',
  styleUrls: ['./matchdetails.component.css'],
  providers: [MatchDetailsService]
})
export class MatchdetailsComponent implements OnInit {
  ID: any;
  public loading = false;
  public priceImageUrl = new AppConfig().priceImagesUrl;
  MatchDetail: MatchDetail = new MatchDetail();
  matchPriceDetails: Array<any>;
  MatchPlayerRel: MatchPlayerRel = new MatchPlayerRel();
  Viewname: any;
  Isdisabled: boolean;
  key: string;
  playerId: any;
  imgZoom: any;
  caption: any;
  selectedIndex: any;
  constructor(
    private route: Router,
    private _router: ActivatedRoute,
    private _matchDetailsService: MatchDetailsService,
    private spinner: NgxSpinnerService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig

  ) {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'top-center';
  }


  GetMatchDetailsbyId(Id) {
    this._matchDetailsService.GetMatchDetailsbyId(Id).subscribe(
      data => {
        this.MatchDetail = data;
        // console.log(data);
      }, err => {
        if (err) {
          this.toastyService.warning('An Error has occured please try again after some time !' + err);
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('HousieGame');
    this.route.navigate(['login']);

  }

  displayZoom(item) {
    this.selectedIndex = item.displayPosition;
    this.imgZoom = item.fileName;
    switch (item.displayPosition) {
      case 1: this.caption = 'Top Line';
        break;
      case 2: this.caption = 'Middle Line';
        break;
      case 3: this.caption = 'Bottom Line';
        break;
      case 4: this.caption = 'Full Housie';
        break;
    }
  }

  addToast(msg: string, router: Router) {
    // Just add default Toast with title only
    // Or create the instance of ToastOptions
    // tslint:disable-next-line:prefer-const
    let toastOptions: ToastOptions = {
        title: 'Success',
        msg: msg,
        showClose: true,
        timeout: 3000,
        theme: 'default',
        onRemove: function(toast: ToastData) {
            router.navigate(['/match-list']);
            this.spinner.hide();
        }
    };
    this.toastyService.success(toastOptions);
  }

  matchPLayerRel(matchId) {
    this.spinner.show();
    // alert(matchId + '------' + this.playerId);
    this.MatchPlayerRel.matchId = matchId;
    this.MatchPlayerRel.playerId = this.playerId;
    this._matchDetailsService.MatchPlayerRel(this.MatchPlayerRel).subscribe(
      data => {
        if (data.message === 'enrolled') {
          // alert('Already Enrolled');
          this.toastyService.warning('You have already Enrolled for this Match');
          this.spinner.hide();
        } else {
          // alert('Successfully Enrolled');
          this.addToast('Successfully Enrolled for this Match', this.route);
        }
        // alert(data);
      }, err => {
        if (err) {
          this.toastyService.warning('An Error has occured please try again after some time !' + err);
        }
      }
    );
  }

  ngOnInit() {
    this.ID = this._router.snapshot.params['ID'];
    this.key = JSON.parse(localStorage.getItem('HousieGame'));
    this.playerId = this.key['PlayerId'];
    this.Viewname = this._router.snapshot.params['Viewname'];
    if (this.ID != null) {
      this._matchDetailsService.GetPriceDetailsbyMatchId(this.ID).subscribe(
        data => {
          if (data.length !== 0) {
            this.matchPriceDetails = data;
            this.imgZoom = data[3].fileName;
            this.caption = 'Full Housie';
            this.selectedIndex = 4;
          }
        }
      );
    }
    if (this.Viewname === 'view') {
      this.Isdisabled = true;
    }
    if (this.Viewname === 'edit') {
      this.Isdisabled = false;
    }
    this.GetMatchDetailsbyId(this.ID);
  }

}
