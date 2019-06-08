import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AppConfig } from '../../_config/app.config';

@Injectable()
export class MatchListService {

  public apiUrl: string;

  constructor(private _http: Http, private _Route: Router) {
    this.apiUrl = new AppConfig().apiUrl;
  }


  GetMatchDetails() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.get(this.apiUrl + 'MatchDetails', options).
      map((response: Response) => {
        const webresponse = response.json() && response.json();
        return webresponse;
      }
      ).catch(response => {
        if (response.status === 401) {
          this._Route.navigate(['match-list']);
        }
        return response;
      });
  }
  GetUpcomingMatchDetails() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.get(this.apiUrl + 'MatchDetails/upcoming', options).
      map((response: Response) => {
        const webresponse = response.json() && response.json();
        return webresponse;
      }
      ).catch(response => {
        if (response.status === 401) {
          this._Route.navigate(['match-list']);
        }
        return response;
      });
  }

}

