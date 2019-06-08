import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AppConfig } from '../../_config/app.config';
import { MatchPlayerRel, CheckPlayerMatch, MatchPlayerPointRel } from '../model/matchdetails.model';
import { Player } from '../../login/Model/login.model';

@Injectable()
export class MatchDetailsService {

  public apiUrl: string;

  constructor(private _http: Http, private _Route: Router) {
    this.apiUrl = new AppConfig().apiUrl;
  }

  public MatchPlayerRel(matchPlayerModel: MatchPlayerRel) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this._http.post(this.apiUrl + 'MatchPlayerRel', matchPlayerModel, options)
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

  public MatchPlayerPointRel(matchPlayerPointRelModel: MatchPlayerPointRel) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this._http.post(this.apiUrl + 'MatchPlayerPointRel', matchPlayerPointRelModel, options)
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

  GetPlayerDetailsbyId(id: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.get(this.apiUrl + 'Player' + '/' + id, options).
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
public GetMatchSummary(MatchId: string) {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const options = new RequestOptions({ headers: headers });
  return this._http.get(this.apiUrl + 'CheckUpatedAddress/' + MatchId, options)
      .map((response: Response) => <any>response.json())
      .catch(response => {
          if (response.status === 401) {
              this._Route.navigate(['Login']);
          }
          return response;
      });
}

  public ClaimPrize(matchPlayerPointRelModel: MatchPlayerPointRel) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this._http.post(this.apiUrl + 'ClaimPrize', matchPlayerPointRelModel, options)
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


  GetMatchDetailsbyId(id: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.get(this.apiUrl + 'MatchDetails' + '/' + id, options).
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
  GetPriceDetailsbyMatchId(id: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.get(this.apiUrl + 'MatchPriceRel' + '/' + id, options).
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

  GetPlayerTokenNumbers(playerId: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.get(this.apiUrl + 'MatchPlayerRel' + '/' + playerId, options).
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

  public GetMatchDetailsRelByMatchId(MatchId: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.get(this.apiUrl + 'MatchDetailsRel/List/' + MatchId, options)
        .map((response: Response) => <any>response.json())
        .catch(response => {
            if (response.status === 401) {
                this._Route.navigate(['Login']);
            }
            return response;
        });
}

  public CheckPlayerMatch(playerId: string, matchId: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this._http.get(this.apiUrl + 'CheckPlayerMatch/' + playerId + '/' + matchId, options)
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

