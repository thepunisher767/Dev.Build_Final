import { Component } from '@angular/core';

@Component({
    selector: 'app-countdown',
    templateUrl: './countdown.component.html',
    styleUrls: ['./countdown.component.scss']
})
/** countdown component*/
export class CountdownComponent {
    /** countdown ctor */
  constructor() { }

  xmasDay = new Date("december 25, 2020 00:00:00").getTime();

  countDown: any;
  x = setInterval(() => {
    var now = new Date().getTime();
    var distance = this.xmasDay - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.countDown = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  })

}
