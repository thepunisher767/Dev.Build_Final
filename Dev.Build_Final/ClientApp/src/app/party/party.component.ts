import { Component, NgZone, OnInit } from '@angular/core';
import { partyService } from '../Services/party';
import { party } from '../interfaces/Iparty';



@Component({
    selector: 'app-party',
    templateUrl: './party.component.html',
    styleUrls: ['./party.component.css']
})
/** party component*/
export class PartyComponent implements OnInit{
    /** party ctor */
  constructor(private party: partyService) { }

  partyList: party[]
  item: party
  error: boolean

  newPartyItem: party = {
    description: '',
    done: false
  }

  ngOnInit(): void {
    this.party.getAllParty().subscribe(
      (data: party[]) =>
        this.partyList = data
    ); 
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
