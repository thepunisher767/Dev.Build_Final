import { Component } from '@angular/core';
import { userlogin } from '../interfaces/Iuserlogin';
import { CookieService } from 'ngx-cookie-service';
import { completeService } from '../Services/complete';
import { party } from '../interfaces/Iparty';
import { gift } from '../interfaces/Igifts';
import { decoration } from '../interfaces/Idecoration';

@Component({
    selector: 'app-completed',
    templateUrl: './completed.component.html',
    styleUrls: ['./completed.component.scss']
})
/** completed component*/
export class CompletedComponent {
  /** completed ctor */
  constructor(private cookie: CookieService, public complete: completeService) { }

  currentID: number
  partyPercent: number = this.complete.partyComplete
  giftPercent: number = this.complete.giftComplete
  decorPercent: number = this.complete.decorComplete

  ngOnInit(): void {
    this.currentID = Number(this.cookie.get('id'));
  }

  getComplete(): number {
    return this.complete.getComplete();
  }

  log() {
    console.log('Party items total: ' + this.complete.partyItems + ' || Party items COMPLETE: ' + this.complete.partyItemsComplete);
    console.log('Gift items total: ' + this.complete.giftItems + ' || Gift items COMPLETE: ' + this.complete.giftItemsComplete);
    console.log('Decor items total: ' + this.complete.decorItems + ' || Decor items COMPLETE: ' + this.complete.decorItemsComplete);
  }
}
