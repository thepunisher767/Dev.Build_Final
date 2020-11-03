import { Component, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { userlogin } from '../interfaces/Iuserlogin';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(private cookie: CookieService) { }

  

  ngOnInit(): void {

  }
}
