import { Component, Input, OnInit } from '@angular/core';
import { giftService } from '../Services/gifts';
import { gift } from '../interfaces/Igifts';
import { people } from '../interfaces/Ipeople';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.css']
})
/** gifts component*/
export class GiftsComponent implements OnInit {
  /** gifts ctor */
  constructor(private gifts: giftService, private route: ActivatedRoute) { }

  giftList: gift[]
  item: gift
  id: number
  error: boolean
  currentSelectedUser: people

  newGiftItem: gift = {
    description: '',
    done: false,
    userid: null
  }

  ngOnInit(): void {
    //console.log(this.giftList);
    this.route.params.subscribe((params: { id: number }) => {
      this.id = params.id;
      //console.log('currentID = ' + this.id);
      if (this.id != 0) {
        this.gifts.getUserName(this.id).subscribe(
          (data: people) =>
            this.currentSelectedUser = data);
      }
      this.gifts.getGiftsFromUser(params.id).subscribe(
        (data: gift[]) =>
          this.giftList = data);
    });
    //console.log(this.giftList);
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
