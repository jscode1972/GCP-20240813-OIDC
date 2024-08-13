import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';

export const routes: Routes = [
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  //{ path: 'about', component: AboutComponent },
  //{ path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  // 404 Not Found 路由
  { path: '**', redirectTo: '/home' }
];
