import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  ID: any;
  key: any;
  playerId: any;
  loggedOut: boolean;
  constructor(private route: Router,
    private _router: ActivatedRoute) { }

  logout() {
    localStorage.removeItem('HousieGame');
    this.route.navigate(['login']);

  }
  ngOnInit() {
    this.ID = this._router.snapshot.params['ID'];
    this.key = JSON.parse(localStorage.getItem('HousieGame'));
    if (this.key === null) {
      this.loggedOut = true;
    }
  }

}
