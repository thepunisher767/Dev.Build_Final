import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css']
})
/** book component*/
export class BookComponent {
  /** book ctor */
  constructor(private route: Router) {

    }
}
