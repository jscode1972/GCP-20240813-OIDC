import { Component, OnInit } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
//import { authCodeFlowConfig } from './app.oidc';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
//import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { OidcService, CalendarService } from './core/services';
import { demoConfig, googleConfig } from './core/secret';
import { CalendarListEntry } from './core/models';

@Component({
  selector: 'app-root',
  //standalone: true,
  //imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'GCP-20240813-OIDC';

  calendars?: CalendarListEntry[];

  constructor(
    private router: Router,
    private oidcService: OidcService,
    private calendarService: CalendarService,
  ) {
    this.oidcService.loadDiscoveryDocument(googleConfig)
      .subscribe({
        next: (cmd) => {
          console.log('Discovery document loaded and login attempted');
          //this.oidcService.initCodeFlow();
        },
        error: (err) => {
          console.error('Error loading discovery document', err);
        }
      });
  }

  ngOnInit(): void {

  }

  login() {
    console.log("login");
    this.oidcService.initCodeFlow();
  }

  logout() {
   //this.oidcService.logOut();
  }

  userinfo() {
    //this.oidcService.loadUserProfile();
  }

  showCalendar() {
    this.calendarService.getList()
      .subscribe((resp) => {
        console.log(resp);
        this.calendars = resp.calendars.items;
      });
  }

  onIdClick(id: string) {
    this.calendarService.getCalendar(id)
      .subscribe((resp) => {
        console.log(resp);
      });
  }

  /*get userName(): string|null {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
  }*/

  get userName(): string|null {
    return this.oidcService.name;
  }

  get email(): string|null {
    return this.oidcService.email;
  }

  refresh() {
    //this.oauthService.refreshToken();
  }
}
