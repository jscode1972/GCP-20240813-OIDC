import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
//
import { provideHttpClient } from '@angular/common/http';
import { provideOAuthClient } from 'angular-oauth2-oidc';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // 參考 oidc 官網
    provideHttpClient(),
    provideOAuthClient()
  ]
};
