import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { userlogin } from './interfaces/Iuserlogin';
import { loginService } from './Services/login';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  title = 'app';

  constructor(private cookie: CookieService, private login: loginService, private router: Router) { }

  loggedInUser: userlogin = {
    login: null,
    id: null
  }

  cookieSet: boolean

  ngOnInit(): void {
    let cookie = this.cookie.get('id');
    if (cookie) {
      this.cookieSet = true;
      this.loggedInUser = this.login.setLoggedInUser();
    }
    else {
      this.cookieSet = false;
    }
    console.log('app.component loading... cookieID - ' + cookie + ' cookieSet - ' + this.cookieSet);
  }

  clearCookie() {
    this.login.clearCookies();
    setTimeout(() => { location.reload() }, 300);
  }

  sendInfo() {
    console.log('loggedinID: ' + this.loggedInUser.id + ' loggedinNAME: ' + this.loggedInUser.login);
    console.log(this.login.setLoggedInUser());
    console.log('END LOG')
  }
}
