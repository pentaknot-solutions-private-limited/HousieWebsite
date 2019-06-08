import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AppConfig } from '../../_config/app.config';
import { Contact } from '../Model/about.model';
@Injectable()
export class AboutService {

  public apiUrl: string;

  constructor(private _http: Http, private _Route: Router) {
    this.apiUrl = new AppConfig().apiUrl;
  }

  public MailContact(ContactModel: Contact) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this._http.post(this.apiUrl + 'Contact', ContactModel, options)
      .map((res: Response) => {
        const webresponse = res.json() && res.json();
        if (webresponse !== null) {
          return webresponse;
        } else {
          return null;
        }
      })
      .catch(response => {
        if (response.status === 401) {
          this._Route.navigate(['Login']);
        }
        return response;
      });
  }

}

