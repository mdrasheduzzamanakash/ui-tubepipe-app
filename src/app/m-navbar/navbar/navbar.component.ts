import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  logoutHandler() {
    localStorage.clear();
    this.auth.changeLoginStatus(false);
  }

  logged_in = false;
  subscription: Subscription = new Subscription();
  constructor(private auth: AuthService) { }
  profile_pic : string = "";

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.auth.changeLoginStatus(true);
      const profile_pic = localStorage.getItem('profile_pic');
      const name = localStorage.getItem('name');
      const email = localStorage.getItem('email');
      this.auth.changeUserLocalStorageInfo({profile_pic, name, email});
    } else {
      this.auth.changeLoginStatus(false);
    }
    this.subscription = this.auth.isLoggedIn.subscribe(x => this.logged_in = x);
    this.profile_pic = localStorage.getItem('profile_pic') || "";
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
