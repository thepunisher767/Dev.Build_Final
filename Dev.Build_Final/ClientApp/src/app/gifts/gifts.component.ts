import { Component, Input, OnInit } from '@angular/core';
import { giftService } from '../Services/gifts';
import { gift } from '../interfaces/Igifts';
import { people } from '../interfaces/Ipeople';
import { ActivatedRoute } from '@angular/router';
import { userlogin } from '../interfaces/Iuserlogin';
import { CookieService } from 'ngx-cookie-service';
import { completeService } from '../Services/complete';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.scss']
})
/** gifts component*/
export class GiftsComponent implements OnInit {
  /** gifts ctor */
  constructor(private cookie: CookieService, private gifts: giftService, private route: ActivatedRoute, public complete: completeService) { }

  giftList: gift[]
  item: gift
  id: number = null // gift list userid
  error: boolean
  currentSelectedUser: people //to get gift list username
  currentID: number //logged in user id

  newGiftItem: gift = {
    description: '',
    done: false,
    userid: null,
    loginid: null
  }

  ngOnInit(): void {
    //console.log(this.giftList);
    this.route.params.subscribe((params: { id: number }) => {
      this.id = params.id;
      //console.log('id = ' +this.id);
      if (this.id != 0) {
        this.gifts.getUserName(this.id).subscribe(
          (data: people) =>
            this.currentSelectedUser = data);
      }
      this.gifts.getGifts().subscribe(
        (data: gift[]) =>
          this.giftList = data);
    });
    this.currentID = Number(this.cookie.get('id'));
    this.newGiftItem.loginid = this.currentID;
    setTimeout(() => { this.complete.giftComplete = this.calculateComplete() }, 100);
    //console.log(this.giftList);
  }

  calculateComplete(): number {
    let tempList: gift[] = [];
    let numberComplete: number = 0;
    for (let item of this.giftList) {
      if (item.loginid === this.currentID) {
        tempList.push(item);
        if (item.done === true) {
          numberComplete++;
        }
      }
    }
    this.complete.giftItems = tempList.length;
    this.complete.giftItemsComplete = numberComplete;
    var result = Number(((numberComplete / tempList.length) * 100).toFixed(2));
    if (result) {
      return result;
    }
    else {
      return 0;
    }
  }

  displayGift(item: gift): boolean {
    //console.log(item.loginid + ' = ' + this.currentID + ' || ' + item.userid + ' = ' + this.id);
    if (item.loginid == this.currentID && item.userid == this.id) {
      return true;
    }
    else {
      return false;
    }
  }

  checkbox(item: gift) {
    this.gifts.toggleDone(item);
    setTimeout(() => { this.ngOnInit() }, 100);
  }

  newItem() {
    if (/.*\S.*/.test(this.newGiftItem.description)) {
      this.newGiftItem.userid = +this.id;
      this.gifts.newGiftItem(this.newGiftItem);
      this.newGiftItem.description = '';
      this.newGiftItem.userid = null;
      this.error = false;
    }
    else {
      this.error = true;
    }
    setTimeout(() => { this.ngOnInit() }, 100);
  }

  removeGift(item: gift) {
    this.gifts.removeGiftItem(item);
    setTimeout(() => { this.ngOnInit() }, 100);
  }


}
