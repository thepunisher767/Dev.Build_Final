import { Component } from '@angular/core';
import { loginService } from '../Services/login';
import { userlogin } from '../interfaces/Iuserlogin';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from "ngx-cookie-service"

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
/** login component*/
export class LoginComponent {
  /** login ctor */
  constructor(private users: loginService, private cookie: CookieService, private router: Router) { }

  user: userlogin
  userList: userlogin[]
  username: string
  usertype: string
  error: string
  success: boolean


  newUser: userlogin = {
    login: ''
  }

  ngOnInit(): void {
    this.success = false;
    this.users.getUserList().subscribe(
      (data: userlogin[]) =>
        this.userList = data);
  }

  setUser(type: string) {
    this.usertype = type;
    console.log('usertype set to: ' + this.usertype);
  }

  loginUser() {
    this.error = null;
    let userMatch: boolean;
    for (let user of this.userList) {
      if (user.login == this.username) {
        userMatch = true;
        this.error = null;
        this.cookie.set('id', `${user.id}`); //set cookie here
        this.cookie.set('login', `${this.username}`);
        console.log('successful login. User: ' + this.username);
        this.success = true;
        setTimeout(() => { location.reload(); }, 100);
        break;
      }
      else {
        userMatch = false;
      }
    }
    if (!userMatch) {
      this.error = 'notFound'
    }
    this.username = null;
  }

  addNewUser() {
    this.error = null;
    let userMatch: boolean;
    if (/^[A-z][\sA-z]*$/.test(this.username)) {
      for (let user of this.userList) {
        if (user.login == this.username) {
          userMatch = true;
          this.error = 'userTaken'
          break;
        }
        else {
          userMatch = false;
        }
      }
      if (userMatch) {
        this.error = 'userTaken'
      }
      else {
        this.error = null;
        this.success = true;
        console.log('user set to: ' + this.username);
        this.newUser.login = this.username;
        this.users.addUser(this.newUser).subscribe(
          (data: userlogin) => this.user = data);
        setTimeout(() => { this.cookie.set('id', `${this.user.id}`), this.cookie.set('login', `${this.user.login}`), location.reload(); }, 200);
        this.newUser.login = '';
      }
    }
    else {
      this.error = 'invalidFormat';
      console.log('invalid format catch')
      
    }
    this.username = null;
  }



}
