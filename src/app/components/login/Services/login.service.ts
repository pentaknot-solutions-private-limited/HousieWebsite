import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AppConfig } from '../../_config/app.config';
import { Player } from '../Model/login.model';
@Injectable()
export class LoginService {

  public apiUrl: string;

  constructor(private _http: Http, private _Route: Router) {
    this.apiUrl = new AppConfig().apiUrl;
  }

  public AddPlayer(PlayerModel: Player) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post(this.apiUrl + 'Player', PlayerModel, options)
        .map((res: Response) => res.json())
        .catch(response => {
            if (response.status === 401) {
                this._Route.navigate(['Login']);
            }
            return response;
        });
}

public ChangePassword(Id: string, password: string) {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const options = new RequestOptions({ headers: headers });
  return this._http.get(this.apiUrl + 'ForgetPassword/' + Id + '/' + password, options)
      .map((res: Response) => res.json())
      .catch(response => {
          if (response.status === 401) {
              this._Route.navigate(['Login']);
          }
          return response;
      });
}

public CheckEmail(Mail: string) {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const options = new RequestOptions({ headers: headers });
  return this._http.get(this.apiUrl + 'Player/email/' + Mail, options)
      .map((res: Response) => res.json())
      .catch(response => {
          if (response.status === 401) {
              this._Route.navigate(['Login']);
          }
          return response;
      });
}
public CheckLink(Token: string) {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const options = new RequestOptions({ headers: headers });
  return this._http.get(this.apiUrl + 'ForgetPassword/' + Token, options)
      .map((res: Response) => res.json())
      .catch(response => {
          if (response.status === 401) {
              this._Route.navigate(['Login']);
          }
          return response;
      });
}



public SendForgetPaswordLink(PlayerModel: Player) {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const options = new RequestOptions({ headers: headers });
  return this._http.post(this.apiUrl + 'ForgetPassword', PlayerModel, options)
      .map((res: Response) => res.json())
      .catch(response => {
          if (response.status === 401) {
              this._Route.navigate(['Login']);
          }
          return response;
      });
}


  public ValidatePlayer(PlayerModel: Player) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this._http.post(this.apiUrl + 'Player/Login', PlayerModel, options)
      .map((res: Response) => {
        const webresponse = res.json() && res.json();
        if (webresponse !== null) {
          if (webresponse.playerId != null) {
            // tslint:disable-next-line:max-line-length
            localStorage.setItem('HousieGame', JSON.stringify({ PlayerId: webresponse.playerId, Name: webresponse.name, Email: webresponse.email, Mobile: webresponse.mobileNumber }));
          }
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

