import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userlogin } from '../interfaces/Iuserlogin';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})
/** book component*/
export class BookComponent {
  /** book ctor */
  constructor(private router: Router, private route: ActivatedRoute) { }
}
