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

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.auth.changeLoginStatus(true);
    } else {
      this.auth.changeLoginStatus(false);
    }
    this.subscription = this.auth.isLoggedIn.subscribe(x => this.logged_in = x);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
