import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AboutService } from './Services/about.service';
import { Contact } from './Model/about.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastyConfig, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [AboutService, ToastyService, ToastyConfig]
})
export class AboutComponent implements OnInit {
  ID: any;
  key: any;
  loggedOut: boolean;
  Contact: Contact = new Contact();
  constructor(
    private route: Router,
    private _router: ActivatedRoute,
    private _aboutService: AboutService,
    private spinner: NgxSpinnerService,
    private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'top-center';
  }
  logout() {
    localStorage.removeItem('HousieGame');
    this.route.navigate(['login']);

  }

  Mail() {
    this.spinner.show();
    this._aboutService.MailContact(this.Contact).subscribe(
      data => {
        this.spinner.hide();
        this.toastyService.success('We will contact you within 48 Hours, Happy Gaming!');
      },
      err => {
      }
    );
  }
  ngOnInit() {
    this.ID = this._router.snapshot.params['ID'];
    this.key = JSON.parse(localStorage.getItem('HousieGame'));
    if (this.key === null) {
      this.loggedOut = true;
    }
  }

}
