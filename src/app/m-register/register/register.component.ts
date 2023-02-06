import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialResponse } from 'google-one-tap';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  hide = true;
  constructor(private service: AuthService, private _ngZone: NgZone, private router: Router) { }

  ngOnInit(): void {
  }

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


  async handleCredentialResponse(credentialResponse: CredentialResponse) {
    // console.log(credentialResponse);
    await this.service.LoginWithGoogle(credentialResponse.credential).subscribe(
      (x: any) => {
        localStorage.setItem("token", x.token);
        this._ngZone.run(() => {
          this.router.navigate(['/']);
        })
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
