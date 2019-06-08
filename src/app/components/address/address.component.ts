import { Component, OnInit } from '@angular/core';
import { MatchDetailsService } from '../matchdetails/service/matchdetails.service';
import { Player } from '../login/Model/login.model';
import { ToastyConfig, ToastyService } from 'ng2-toasty';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers: [MatchDetailsService, ToastyService, ToastyConfig]
})
export class AddressComponent implements OnInit {
  key: any;
  ID: any;
  loading: boolean;
  isDisabled: boolean;
  linkExpired: boolean;
  Player: Player = new Player();
  constructor(private _matchDetails: MatchDetailsService,
    private route: Router,
    private toastyService: ToastyService,
    private spinner: NgxSpinnerService, private _routeParams: ActivatedRoute,
    private toastyConfig: ToastyConfig
    ) {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'top-center';
     }
  updateAddress() {
    this.spinner.show();
    this.Player.createdBy = this.key['PlayerId'];
    this.Player.updatedBy = this.key['PlayerId'];
    this._matchDetails.AddPlayer(this.Player).subscribe(
      data => {
        this.spinner.hide();
        this.toastyService.success('Address Updated');
      }
    );
  }
  logout() {
    localStorage.removeItem('HousieGame');
    this.route.navigate(['login']);
  }
  ngOnInit() {
    this.linkExpired = false;
    this.ID = this._routeParams.snapshot.params['ID'];
    this._matchDetails.GetMatchSummary(this.ID).subscribe(
      data => {
        data.forEach(element => {
          if (element.expired && element.id === this.key['PlayerId']) {
            this.linkExpired = true;
          }
        });
      }
    );
    this.loading = true;
    this.isDisabled = true;
    this.key = JSON.parse(localStorage.getItem('HousieGame'));
    // this.key['PlayerId'];
    this.ID = this._routeParams.snapshot.params['ID'];
    this._matchDetails.GetPlayerDetailsbyId(this.key['PlayerId']).subscribe(
      data => {
        this.loading = false;
        this.Player = data;
        if (data.address == null) {
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
        }
      }
    );
  }
}
