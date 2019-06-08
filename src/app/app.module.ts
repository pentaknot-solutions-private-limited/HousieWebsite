import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OwlModule } from 'ngx-owl-carousel';
import { AppRoutingModule } from './app-routing.module';
import { ToastyModule } from 'ng2-toasty';
import { PopoverModule } from 'ngx-popover';

import {
  MatButtonModule, MatToolbarModule, MatIconModule, MatChipsModule, MatTooltipModule,
  MatCardModule, MatCheckboxModule, MatRadioModule, MatAutocompleteModule,
  MatInputModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule, MatSelectModule, MatDialogModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MatchlistComponent } from './components/matchlist/matchlist.component';
import { ClaimComponent } from './components/claim/claim.component';
import { ResultComponent } from './components/result/result.component';
import { AuthGuard } from './components/_guard/auth.guard';
import { YoutubeComponent } from './components/youtube/youtube.component';
import { MatchdetailsComponent } from './components/matchdetails/matchdetails.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { PolicyComponent } from './components/policy/policy.component';
import { AboutComponent } from './components/about/about.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { AddressComponent } from './components/address/address.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DialogComponent,
    MatchlistComponent,
    ClaimComponent,
    ResultComponent,
    YoutubeComponent,
    MatchdetailsComponent,
    PolicyComponent,
    AboutComponent,
    TutorialComponent,
    AddressComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    NoopAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    HttpModule,
    NgxSpinnerModule,
    OwlModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatSelectModule,
    MatDialogModule,
    ToastyModule,
    PopoverModule,
  ],
  providers: [AuthGuard],
  entryComponents: [DialogComponent, PolicyComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
