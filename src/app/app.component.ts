import { Component, OnInit } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './app.oidc';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';

@Component({
  selector: 'app-root',
  //standalone: true,
  //imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'GCP-20240813-OIDC';

  constructor(//private oidcService: OidcService,
    private router: Router,
    private oauthService: OAuthService
  ) {
    //this.authUrl = this.oauthService.getAuthUrl();
    //console.log("this.authUrl", this.authUrl);

    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();


    //this.oauthService.initCodeFlow();
    //https://idsvr4.azurewebsites.net/consent?returnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fresponse_type%3Dcode%26client_id%3Dspa%26state%3DTUFPUFNKY2J1U3RQbVpuTTFLWkJ1SC1ReTZwdnN4M2lZV2dsaWVQVEVFY3pN%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A4200%252Findex.html%26scope%3Dopenid%2520profile%2520email%2520offline_access%2520api%26code_challenge%3D0NnLUeIDC-MQNjsuyTIylbhK9WZGgJlsWIZIdkffPdI%26code_challenge_method%3DS256%26nonce%3DTUFPUFNKY2J1U3RQbVpuTTFLWkJ1SC1ReTZwdnN4M2lZV2dsaWVQVEVFY3pN

    //this.oauthService.initLoginFlow();
    //https://idsvr4.azurewebsites.net/consent?returnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fresponse_type%3Dcode%26client_id%3Dspa%26state%3Da3dZZ0VPc2hpV3dQSEQ2Q0ZsQjZKejRobkl3WlZVYkFvWFhaU2hqbjlnZ3Ey%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A4200%252Findex.html%26scope%3Dopenid%2520profile%2520email%2520offline_access%2520api%26code_challenge%3DsLb26qjs4hvRZJlOHLQYxijdOMyNrcAOqGf1IceY060%26code_challenge_method%3DS256%26nonce%3Da3dZZ0VPc2hpV3dQSEQ2Q0ZsQjZKejRobkl3WlZVYkFvWFhaU2hqbjlnZ3Ey

    //this.oauthService.setupAutomaticSilentRefresh();

    /*this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe((_) => {
        console.log('AppComponent-token_received');
        this.oauthService.loadUserProfile()
          .then(() => {
            //this.router.navigate(['/home']);
          });
      });*/
  }

  ngOnInit(): void {
    /*// 在進行身份驗證之前檢查是否已有有效的存取令牌
    if (!this.oauthService.hasValidAccessToken()) {
      console.log('hasValidAccessToken-false');
      //this.oauthService.initCodeFlow();
      this.oauthService.loadDiscoveryDocumentAndTryLogin();
    } else {
      console.log('hasValidAccessToken-true');
      this.oauthService.loadUserProfile();
    }*/
  }

  login() {
    console.log("login");
    //this.oidcService.login();
    this.oauthService.initCodeFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  userinfo() {
    this.oauthService.loadUserProfile();
  }

  get userName(): string|null {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
  }

  get idToken(): string {
    return this.oauthService.getIdToken();
  }

  get accessToken(): string {
    return this.oauthService.getAccessToken();
  }

  refresh() {
    this.oauthService.refreshToken();
  }
}
