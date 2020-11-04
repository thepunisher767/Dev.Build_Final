import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { party } from '../interfaces/Iparty';
import { gift } from '../interfaces/Igifts';
import { decoration } from '../interfaces/Idecoration';

@Injectable({
  providedIn: 'root'
})
export class completeService {

  constructor(private http: HttpClient) { }

  partyComplete: number
  giftComplete: number
  decorComplete: number

  partyItems: number
  partyItemsComplete: number
  giftItems: number
  giftItemsComplete: number
  decorItems: number
  decorItemsComplete: number

  getComplete(): number {
    let percent = Number(((this.partyItemsComplete + this.giftItemsComplete + this.decorItemsComplete) / (this.partyItems + this.giftItems + this.decorItems)).toFixed(2));
    if (percent) {
      return (percent * 100);
    }
    else {
      return 0;
    }
  }
}
