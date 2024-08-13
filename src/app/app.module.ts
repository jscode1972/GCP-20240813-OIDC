import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

//
import { RouterOutlet, Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule, OAuthService, UrlHelperService } from 'angular-oauth2-oidc';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,  // 应用的根组件
    // 在这里声明其他组件
  ],
  imports: [
    CommonModule,
    // etc.
    BrowserModule, // 浏览器支持模块
    HttpClientModule,
    OAuthModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  providers: [
    OAuthService, UrlHelperService, // 如果需要，可以在这里提供服务
    // 其他服务提供者
  ],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
