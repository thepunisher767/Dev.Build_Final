import { Component, NgZone, OnInit } from '@angular/core';
import { partyService } from '../Services/party';
import { party } from '../interfaces/Iparty';
import { CookieService } from 'ngx-cookie-service';
import { completeService } from '../Services/complete';



@Component({
    selector: 'app-party',
    templateUrl: './party.component.html',
    styleUrls: ['./party.component.scss']
})
/** party component*/
export class PartyComponent implements OnInit{
  /** party ctor */
  constructor(private cookie: CookieService, private party: partyService, public complete: completeService) { }

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
    setTimeout(() => { this.complete.partyComplete = this.calculateComplete() }, 100);
  }

  calculateComplete(): number {
    let tempList: party[] = [];
    let numberComplete: number = 0;
    for (let item of this.partyList) {
      if (item.loginid === this.currentID) {
        tempList.push(item);
        if (item.done === true) {
          numberComplete++;
        }
      }
    }
    this.complete.partyItems = tempList.length;
    this.complete.partyItemsComplete = numberComplete;
    var result = Number(((numberComplete / tempList.length) * 100).toFixed(2));
    if (result) {
      return result;
    }
    else {
      return 0;
    }
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
