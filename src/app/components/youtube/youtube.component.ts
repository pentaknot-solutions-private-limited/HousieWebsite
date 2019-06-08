import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { YoutubeService } from './service/youtube.service';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {
  videos: any[];
  private unsubscribe$: Subject<any> = new Subject();
  ID: any;
  key: any;
  playerId: any;
  loggedOut: boolean;

  constructor(
    private spinner: NgxSpinnerService,
    private youTubeService: YoutubeService,
    private route: Router,
    private _router: ActivatedRoute) { }

  logout() {
    localStorage.removeItem('HousieGame');
    this.route.navigate(['login']);

  }
  // items = ['1', '2', '3'];
  ngOnInit() {
    this.ID = this._router.snapshot.params['ID'];
    this.key = JSON.parse(localStorage.getItem('HousieGame'));
    if (this.key === null) {
      this.loggedOut = true;
    }
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
    this.videos = [];
    this.youTubeService
      // .getVideosForChanel('UC22U6c6nhaz-hzOsX0ygrvQ', 15) amit
      // .getVideosForChanel('UCpGv-Kibvylx4hHGye8__nQ', 15) gaming birds
      // .getVideosForChanel('UC22U6c6nhaz-hzOsX0ygrvQ', 15) abhijyot
      .getVideosForChanel('UCpGv-Kibvylx4hHGye8__nQ', 15)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lista => {
        // tslint:disable-next-line:prefer-const
        for (let element of lista['items']) {
          this.videos.push(element);
        }

      });
  }
    }


