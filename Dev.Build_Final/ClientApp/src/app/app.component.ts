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
  logout: boolean

  ngOnInit(): void {
    this.logout = false;
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
    this.logout = true;
    this.login.clearCookies();
    this.router.navigate(['/']);
    setTimeout(() => { location.reload() }, 300);
  }

  sendInfo() {
    console.log('loggedinID: ' + this.loggedInUser.id + ' loggedinNAME: ' + this.loggedInUser.login);
    console.log(this.login.setLoggedInUser());
    console.log('END LOG')
  }
}
