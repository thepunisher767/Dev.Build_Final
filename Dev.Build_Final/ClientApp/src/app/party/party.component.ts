import { Component, NgZone, OnInit } from '@angular/core';
import { partyService } from '../Services/party';
import { party } from '../interfaces/Iparty';
import { userlogin } from '../interfaces/Iuserlogin';
import { CookieService } from 'ngx-cookie-service';



@Component({
    selector: 'app-party',
    templateUrl: './party.component.html',
    styleUrls: ['./party.component.css']
})
/** party component*/
export class PartyComponent implements OnInit{
    /** party ctor */
  constructor(private cookie: CookieService, private party: partyService) { }

  partyList: party[]
  item: party
  error: boolean
  currentID: number

  newPartyItem: party = {
    description: '',
    done: false,
    loginid: null
  }

  ngOnInit(): void {
    this.party.getAllParty().subscribe(
      (data: party[]) =>
        this.partyList = data
    );
    this.currentID = Number(this.cookie.get('id'));
    this.newPartyItem.loginid = this.currentID;
  }

  checkbox(item:party) {
    this.party.toggleDone(item);
    setTimeout(() => { this.ngOnInit() }, 100);
  }

  newItem() {
    if (/.*\S.*/.test(this.newPartyItem.description)) {
      this.party.newPartyItem(this.newPartyItem);
      this.newPartyItem.description = '';
      //this.newDecorationItem.userid = null;
      this.error = false;
    }
    else {
      this.error = true;
    }
    setTimeout(() => { this.ngOnInit() }, 100);
  }


  removeEvent(item:party) {
    this.party.removePartyItem(item);
    setTimeout(() => { this.ngOnInit() }, 100);
  }

}
