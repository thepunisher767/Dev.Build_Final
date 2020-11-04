import { Component, OnInit } from '@angular/core';
import { decorationService } from '../Services/decorations';
import { decoration } from '../interfaces/Idecoration';
import { userlogin } from '../interfaces/Iuserlogin';
import { CookieService } from 'ngx-cookie-service';
import { completeService } from '../Services/complete';


@Component({
    selector: 'app-decorations',
    templateUrl: './decorations.component.html',
    styleUrls: ['./decorations.component.scss']
})
/** decorations component*/
export class DecorationsComponent implements OnInit{
  /** decorations ctor */
  constructor(private cookie: CookieService, private decoration: decorationService, public complete: completeService) { }

  decorationList: decoration[]
  item: decoration
  error: boolean
  currentID: number

  newDecorationItem: decoration = {
    description: '',
    done: false,
    loginid: null
  }

  ngOnInit(): void {
    this.decoration.getDecorations().subscribe(
      (data: decoration[]) =>
        this.decorationList = data
    );
    this.currentID = Number(this.cookie.get('id'));
    this.newDecorationItem.loginid = this.currentID;
    setTimeout(() => { this.complete.decorComplete = this.calculateComplete() }, 100);
  }

  calculateComplete(): number {
    let tempList: decoration[] = [];
    let numberComplete: number = 0;
    for (let item of this.decorationList) {
      if (item.loginid === this.currentID) {
        tempList.push(item);
        if (item.done === true) {
          numberComplete++;
        }
      }
    }
    this.complete.decorItems = tempList.length;
    this.complete.decorItemsComplete = numberComplete;
    var result = Number(((numberComplete / tempList.length) * 100).toFixed(2));
    if (result) {
      return result;
    }
    else {
      return 0;
    }
  }

  checkbox(item: decoration) {
    this.decoration.toggleDone(item);
    setTimeout(() => { this.ngOnInit() }, 100);
  }

  newItem() {
    if (/.*\S.*/.test(this.newDecorationItem.description)) {
      this.decoration.newDecorationItem(this.newDecorationItem);
      this.newDecorationItem.description = '';
      //this.newDecorationItem.userid = null;
      this.error = false;
    }
    else {
      this.error = true;
    }
    setTimeout(() => { this.ngOnInit() }, 100);
  }

  removeDecoration(item: decoration) {
    this.decoration.removeDecorationItem(item);
    setTimeout(() => { this.ngOnInit() }, 100);
  }



}
