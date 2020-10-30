import { Component, Input, OnInit } from '@angular/core';
import { giftService } from '../Services/gifts';
import { gift } from '../interfaces/Igifts';
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

  giftList: gift
  item: gift

  newGiftItem: gift = {
    description: '',
    done: false,
    userid: null
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.gifts.getGiftsFromUser(id).subscribe(
      (data: gift) =>
        this.giftList = data
    );
  }

  checkbox(item: gift) {
    this.gifts.toggleDone(item);
    this.ngOnInit();
  }

  newItem() {
    this.gifts.newGiftItem(this.newGiftItem);
    this.newGiftItem.description = '';
  }

  removeGift(item: gift) {
    this.gifts.removeGiftItem(item);
  }


}
