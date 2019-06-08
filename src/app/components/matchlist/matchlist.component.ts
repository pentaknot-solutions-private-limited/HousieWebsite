import { Component, OnInit } from '@angular/core';
import { MatchList } from './model/matchlist.model';
import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchListService } from './service/matchlist.service';
import * as M from '../../../assets/materialize/js/materialize.js';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-matchlist',
  templateUrl: './matchlist.component.html',
  styleUrls: ['./matchlist.component.css'],
  providers: [MatchListService, ToastyService, ToastyService]
})
export class MatchlistComponent implements OnInit {
  ID: any;
  key: any;
  playerId: any;
  loggedOut: boolean;

  MatchList: MatchList = new MatchList();
  matchLists: Array<any>;
  public loading = false;
  Isdisabled: boolean;
  // matchList = ['1', '2', '3', '4'];
  constructor(
    private route: Router,
    private _router: ActivatedRoute,
    private _MatchListService: MatchListService,
    private spinner: NgxSpinnerService,
   private toastyService: ToastyService,
   private toastyConfig: ToastyConfig,
  //  private _router: ActivatedRoute
  ) {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'top-center';
  }

  GetAllMatchList() {
    this.spinner.show();
    this._MatchListService.GetUpcomingMatchDetails().subscribe(data => {
      this.spinner.hide();
      this.matchLists = data;
    }, err => {
      if (err) {
        this.toastyService.warning('An Error has occured please try again after some time !' + err);
      }
    });
  }
  logout() {
    localStorage.removeItem('HousieGame');
    this.route.navigate(['login']);

  }
  ngOnInit() {
    this.GetAllMatchList();
    this.ID = this._router.snapshot.params['ID'];
    this.key = JSON.parse(localStorage.getItem('HousieGame'));
    if (this.key === null) {
      this.loggedOut = true;
    }
  }

}
