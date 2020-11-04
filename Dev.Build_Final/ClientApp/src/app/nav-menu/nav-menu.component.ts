import { Component } from '@angular/core';
import { userlogin } from '../interfaces/Iuserlogin';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isExpanded = false;

  currentID: number

  constructor(private cookie: CookieService) { }

  ngOnInit(): void {
    this.currentID = Number(this.cookie.get('id'));
  }

  xmasDay = new Date("december 25, 2020 00:00:00").getTime();

  countDown: any;
  x = setInterval(() => {
    var now = new Date().getTime();
    var distance = this.xmasDay - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.countDown = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  })

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
