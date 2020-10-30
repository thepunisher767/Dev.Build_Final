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

  newPartyItem: party = {
    description: '',
    done: false
  }

  ngOnInit(): void {
    this.refresh();
    
  }
  refresh() {
    this.party.getAllParty().subscribe(
      (data: party[]) =>
        this.partyList = data
    );
  }

  checkbox(item:party) {
    this.party.toggleDone(item);
    this.ngOnInit();
  }

  newItem() {
    this.party.newPartyItem(this.newPartyItem);
    this.newPartyItem.description=''
  }

  removeEvent(item:party) {
    this.party.removePartyItem(item);
  }

}
