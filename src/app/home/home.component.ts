import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private oauthService: OAuthService) {

  }

  ngOnInit(): void {
  }
}
