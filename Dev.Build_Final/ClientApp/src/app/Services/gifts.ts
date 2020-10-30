import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { gift } from "../interfaces/Igifts";

@Injectable({
  providedIn: 'root'
})
export class giftService {
  constructor(private http: HttpClient) { }

  //userID = 'The_User';


  giftUrl = '/api/gift';



  getGiftsFromUser(id: number) {
    return this.http.get(this.giftUrl + `/${id}`);
  }

  toggleDone(item: gift) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(item);
    var newURL = this.giftUrl + '/check'
    return this.http.post<gift>(newURL, body, { 'headers': headers }).subscribe((data) => console.log(data));

  }

  newGiftItem(newGift: gift) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(newGift);
    var newURL = this.giftUrl + '/add'
    console.log(body)
    return this.http.post<gift>(newURL, body, { 'headers': headers }).subscribe((data) => console.log(data));
  }

  removeGiftItem(removeGift: gift) {
    var newURL = this.giftUrl + `/remove/${removeGift.description}`
    return this.http.delete<gift>(newURL).subscribe((data) => console.log(data));;
  }

}
