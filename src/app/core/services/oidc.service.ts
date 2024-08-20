import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, from, of, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthConfig } from '../secret';

@Injectable({
  providedIn: 'root'
})
export class OidcService {

  private authConfig!: AuthConfig;
  private discoveryDocument: any;
  //private codeVerifier: string = '';
  private userInfo?: any;

  constructor(private http: HttpClient, private router: Router) {}

  public loadDiscoveryDocument(config: AuthConfig): Observable<any> {
    this.authConfig = config;
    const discoveryUrl = `${this.authConfig.issuer}/.well-known/openid-configuration`;
    return this.http.get(discoveryUrl).pipe(
      /*switchMap((document: any) => {
        this.discoveryDocument = document;
        return this.tryLogin();
      })*/
      tap((document: any) => {
        console.log(document);
        this.discoveryDocument = document;
      }),
      switchMap(() => this.tryLogin())
    );
  }

  private tryLogin(): Observable<any> {
    const code = this.getCodeFromUrl();
    if (code) {
      return this.exchangeCodeForTokens2(code);
    } else {
      // No code found, redirect to authorization endpoint
      return of(null).pipe(
        tap(() => {
          this.initCodeFlow();
        })
      );
    }
  }

  private getCodeFromUrl(): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
  }

  private generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const codeVerifierBuffer = encoder.encode(codeVerifier);

    return crypto.subtle.digest('SHA-256', codeVerifierBuffer).then((hash: ArrayBuffer) => {
      return this.base64UrlEncode(new Uint8Array(hash));
    });
  }

  private generateCodeVerifier(): string {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return this.base64UrlEncode(array);
  }

  private base64UrlEncode(array: Uint8Array): string {
    const binaryString = Array.from(array).map(byte => String.fromCharCode(byte)).join('');
    return btoa(binaryString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  private exchangeCodeForTokens1(code: string): Observable<any> {
    const tokenEndpoint = this.discoveryDocument.token_endpoint;
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: this.authConfig.redirectUri,
      client_id: this.authConfig.clientId,
      //client_secret: 'secret' //  'secret'
      ...(this.authConfig.dummyClientSecret && { client_secret: this.authConfig.dummyClientSecret })
    });

    return this.http.post(tokenEndpoint, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).pipe(
      switchMap((tokens: any) => {
        console.log('Tokens received', tokens);
        this.router.navigate(['/home']);
        //return from([]);
        return of(null);
      })
    );
  }

  private exchangeCodeForTokens2(code: string): Observable<any> {
    const storedCodeVerifier = sessionStorage.getItem('codeVerifier');
    sessionStorage.removeItem('codeVerifier');
    // 发送授权码到后端
    const backendExchangeUrl = 'http://localhost:9000/oidc/exchange'; // 后端处理授权码交换的 API 端点
    return this.http.post(backendExchangeUrl, { code: code, code_verifier : storedCodeVerifier }).pipe(
      switchMap((resp: any) => {
        // 在这里处理 tokens，例如保存到本地存储
        console.log('Tokens received', resp);
        this.router.navigate(['/home']);
        return of(resp);
        /*const headers = new HttpHeaders().set('Authorization', `Bearer ${resp.access_token}`);
        // Fetch user info from the OIDC provider's UserInfo endpoint
        return this.http.get(this.discoveryDocument.userinfo_endpoint, { headers }).pipe(
          switchMap((userInfo: any) => {
            // Handle the user info here
            console.log('User info received', userInfo);
            this.userInfo = userInfo;
            this.router.navigate(['/home']);
            return of(userInfo);
          })
        );*/
        // Oauth 同意畫面 => 要手動加入 API
        // 加入測試人員 wphuang@gmail.com
        // 另外 access_token 要怎麼儲存
        // sessionStorage.setItem('access_token', accessToken);
        //return this.http.get("https://www.googleapis.com/calendar/v3/users/me/calendarList", { headers }).pipe(
      })
    );
  }

  public initCodeFlow(): void {
    // Generate code verifier and challenge
    var codeVerifier = this.generateCodeVerifier();
    sessionStorage.setItem('codeVerifier', codeVerifier);
    //
    this.generateCodeChallenge(codeVerifier).then(codeChallenge => {
      const authorizationEndpoint = this.discoveryDocument.authorization_endpoint;
      const params = new URLSearchParams({
        response_type: this.authConfig.responseType,
        client_id: this.authConfig.clientId,
        redirect_uri: this.authConfig.redirectUri,
        scope: this.authConfig.scope,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256'
      });

      window.location.href = `${authorizationEndpoint}?${params.toString()}`;
    });
  }

  public get email(): string|null {
    return this.userInfo?.email;
  }

  public get name(): string|null {
    return this.userInfo?.name;
  }
}

/*this.oauthService.initCodeFlow();
this.oauthService.configure(authCodeFlowConfig);
this.oauthService.loadDiscoveryDocumentAndTryLogin();
this.oauthService.hasValidAccessToken()
this.oauthService.getIdToken();
this.oauthService.getAccessToken();
this.oauthService.refreshToken();
const claims = this.oauthService.getIdentityClaims();

this.oauthService.events
.pipe(filter((e) => e.type === 'token_received'))
.subscribe((_) => {
  console.log('CallbackComponent-token_received');
  this.oauthService.loadUserProfile()
    .then(() => {
      this.router.navigate(['/home']);
    });*/

