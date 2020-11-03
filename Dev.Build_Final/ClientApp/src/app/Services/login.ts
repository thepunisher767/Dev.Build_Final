import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { userlogin } from "../interfaces/Iuserlogin";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class loginService {
  constructor(private http: HttpClient, private cookie: CookieService) { }

  usersUrl = '/api/user'
  loggedInUser: userlogin

  getUserList() {
    return this.http.get<userlogin[]>(`${this.usersUrl}`);
  }

  addUser(newUser: userlogin): Observable<userlogin> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(newUser);
    var newURL = this.usersUrl + '/add'
    console.log(body)
    return this.http.post<userlogin>(newURL, body, { 'headers': headers });
  }

  setLoggedInUser(): userlogin {
    let user: userlogin = { id: Number(this.cookie.get('id')), login: this.cookie.get('login') };
    return user;
  }

  clearCookies() {
    this.cookie.deleteAll();
    console.log('Cookies cleared');
  }
}
