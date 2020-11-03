import { Component, Input, OnInit } from '@angular/core';
import { peopleService } from '../Services/people';
import { people } from '../interfaces/Ipeople';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
/** people component*/
export class PeopleComponent implements OnInit {
  /** people ctor */
  constructor(private people: peopleService, private router: Router, private route: ActivatedRoute) { }

  @Input() userID: number

  peopleList: people
  //person: people
  peep: people
  currentID: number
  previousID: number
  firstNameError: boolean
  lastNameError: boolean

  newPerson: people = {
    firstname: '',
    lastname: ''
  }

  ngOnInit(): void {
    this.people.getPeopleList().subscribe(
      (data: people) =>
        this.peopleList = data);
  }

  showList(id: number) {
    console.log('In showList, before reset this.id = ' + this.currentID)
    this.previousID = this.currentID;
    this.currentID = id;
    console.log('In showList, after reset this.id = ' + this.currentID)
    this.router.navigate(['/book', { outlets: { 'gifts': [this.currentID] } }]);
  }

  showList2(id: number) {
    console.log('CHANGING LIST AFTER REMOVE TO = ' + this.previousID)
    this.router.navigate(['/book', { outlets: { 'gifts': [this.previousID] } }]);
  }

  addPerson() {
    if (!/^[A-z][\sA-z]*$/.test(this.newPerson.firstname) || !/^[A-z][\sA-z]*$/.test(this.newPerson.lastname)) {
      if (!/^[A-z][\sA-z]*$/.test(this.newPerson.firstname)) {
        //console.log('If-firstname = ' + /^[A-z][\sA-z]*$/.test(this.newPerson.firstname));
        this.firstNameError = true;
      }
      else {
        //console.log('Else-firstname = ' + /^[A-z][\sA-z]*$/.test(this.newPerson.firstname));
        this.firstNameError = false;
      }
      if (!/^[A-z][\sA-z]*$/.test(this.newPerson.lastname)) {
        //console.log('If-lastname = ' + /^[A-z][\sA-z]*$/.test(this.newPerson.lastname));
        this.lastNameError = true;
      }
      else {
        //console.log('Else-lastname = ' + /^[A-z][\sA-z]*$/.test(this.newPerson.lastname));
        this.lastNameError = false;
      }
      //console.log('F-Error = ' + this.firstNameError + ' L-Error = ' + this.lastNameError)
    }
    else {
      this.people.AddPerson(this.newPerson).subscribe(
        (item: people) =>
          this.peep = item);
      this.newPerson.firstname = '';
      this.newPerson.lastname = '';
      this.firstNameError = false;
      this.lastNameError = false;
      setTimeout(() => { this.showList(this.peep.id), this.ngOnInit() }, 100);
    }

  }

  removePerson(person: people) {
    console.log('REMOVE FUNCTION - this.id = ' + this.currentID);
    this.people.removePerson(person);
    console.log('Remove Peep component this.id(current list) = ' + this.currentID + ' removedID = ' + person.id);
    if (this.previousID == person.id) {
      console.log(this.previousID == person.id);
      setTimeout(() => { this.showList(0) }, 100);
      setTimeout(() => { this.ngOnInit() }, 100);
    }
    else {
      setTimeout(() => { this.showList2(this.previousID) }, 200);
      setTimeout(() => { this.ngOnInit() }, 100);
    }
  }







}
