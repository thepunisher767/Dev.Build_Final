import { Component, OnInit } from '@angular/core';
import { decorationService } from '../Services/decorations';
import { decoration } from '../interfaces/Idecoration';


@Component({
    selector: 'app-decorations',
    templateUrl: './decorations.component.html',
    styleUrls: ['./decorations.component.css']
})
/** decorations component*/
export class DecorationsComponent implements OnInit{
  /** decorations ctor */
  constructor(private decoration: decorationService) { }

  decorationList: decoration
  item: decoration

  newDecorationItem: decoration = {
    description: '',
    done: false
  }

  ngOnInit(): void {
    this.decoration.getDecorations().subscribe(
      (data: decoration) =>
        this.decorationList = data
    );
  }

  checkbox(item: decoration) {
    this.decoration.toggleDone(item);
    this.ngOnInit();
  }

  newItem() {
    this.decoration.newDecorationItem(this.newDecorationItem);
    this.newDecorationItem.description = '';
  }

  removeDecoration(item: decoration) {
    this.decoration.removeDecorationItem(item);
  }



}
