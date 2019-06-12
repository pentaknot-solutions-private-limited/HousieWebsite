import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MatchlistComponent } from './components/matchlist/matchlist.component';
import { ClaimComponent } from './components/claim/claim.component';
import { ResultComponent } from './components/result/result.component';
import { AuthGuard } from './components/_guard/auth.guard';
import { YoutubeComponent } from './components/youtube/youtube.component';
import { MatchdetailsComponent } from './components/matchdetails/matchdetails.component';
import { PolicyComponent } from './components/policy/policy.component';
import { AboutComponent } from './components/about/about.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { AddressComponent } from './components/address/address.component';
import { ForgetComponent } from './components/forget/forget.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {path: 'login', component: LoginComponent },
  {path: 'home', component: HomeComponent,  canActivate: [AuthGuard]},
  {path: 'match-list', component: MatchlistComponent},
  {path: 'claim/:ID/:Token', component: ClaimComponent,  canActivate: [AuthGuard]},
  {path: 'address/:ID', component: AddressComponent,  canActivate: [AuthGuard]},
  {path: 'forget/:Token', component: ForgetComponent},
  {path: 'result', component: ResultComponent,  canActivate: [AuthGuard]},
  {path: 'youtube', component: YoutubeComponent},
  {path: 'match-details/:ID', component: MatchdetailsComponent,  canActivate: [AuthGuard]},
  {path: 'policy', component: PolicyComponent},
  {path: 'about', component: AboutComponent},
  {path: 'tutorial', component: TutorialComponent},
  {path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
