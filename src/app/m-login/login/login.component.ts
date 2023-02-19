import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialResponse } from 'google-one-tap';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  clientId: string = environment.googleClientID;
  showGoogleSingRegister() {
    //@ts-ignore
    google.accounts.id.initialize({
      client_id: this.clientId,
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true
    });
    //@ts-ignore
    google.accounts.id.renderButton(
      //@ts-ignore
      document.getElementById('buttonDiv'), {
      theme: 'outline',
      size: 'large',
      text: 'continue_with',
      type: 'standard',
      width: 300,
      height: 50
    }
    );
    //@ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => { });
  }

  hide = true;
  constructor(private service: AuthService, private router: Router, private _ngZone: NgZone) { }

  ngOnInit(): void {
  }


  async handleCredentialResponse(credentialResponse: CredentialResponse) {
    // console.log(credentialResponse);
    await this.service.LoginWithGoogle(credentialResponse.credential).subscribe(
      (x: any) => {
        console.log(x);
        localStorage.setItem('email', x.email);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('name', x.name);
        localStorage.setItem('email_verified', x.email_verified);
        localStorage.setItem('profile_pic', x.picture);
        this.service.changeLoginStatus(true);
        this._ngZone.run(() => {
          this.router.navigate(['/']);
        })
      },
      (error: any) => {
        console.log(error);
        this._ngZone.run(() => {
          this.router.navigate(['/']);
        })
      }
    );
  }

}
