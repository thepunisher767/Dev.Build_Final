import { Component } from '@angular/core';
import { userlogin } from '../interfaces/Iuserlogin';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-completed',
    templateUrl: './completed.component.html',
    styleUrls: ['./completed.component.css']
})
/** completed component*/
export class CompletedComponent {
    /** completed ctor */
  constructor(private cookie: CookieService) { }

  currentID: number

  ngOnInit(): void {
    this.currentID = Number(this.cookie.get('id'));
  }
}
