import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css']
})
/** book component*/
export class BookComponent {
  /** book ctor */
  constructor(private router: Router, private route: ActivatedRoute) { }
}
