import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit {

  constructor(private router: Router,
    private oauthService: OAuthService) {
    // Automatically load user profile
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe((_) => {
        console.log('CallbackComponent-token_received');
        this.oauthService.loadUserProfile()
          .then(() => {
            this.router.navigate(['/home']);
          });
      });
  }

  ngOnInit(): void {

  }

  jump() {
    //this.router.navigate(['/home']);
  }
}
