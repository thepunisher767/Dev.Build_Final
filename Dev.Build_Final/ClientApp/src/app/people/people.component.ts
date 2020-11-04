import { Component, Input, OnInit } from '@angular/core';
import { peopleService } from '../Services/people';
import { people } from '../interfaces/Ipeople';
import { ActivatedRoute, Router } from '@angular/router';
import { userlogin } from '../interfaces/Iuserlogin';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
/** people component*/
export class PeopleComponent implements OnInit {
  /** people ctor */
  constructor(private cookie: CookieService, private people: peopleService, private router: Router, private route: ActivatedRoute) { }

  @Input() userID: number

  peopleList: people
  //person: people
  peep: people
  currentID: number
  nowID: number
  previousID: number
  firstNameError: boolean
  lastNameError: boolean

  newPerson: people = {
    firstname: '',
    lastname: '',
    loginid: null
  }

  ngOnInit(): void {
    this.people.getPeopleList().subscribe(
      (data: people) =>
        this.peopleList = data);
    this.currentID = Number(this.cookie.get('id'));
    this.newPerson.loginid = this.currentID;
  }

  showList(id: number) {
    this.previousID = this.nowID;
    this.nowID = id;
    this.router.navigate(['/book', { outlets: { 'gifts': [this.nowID] } }]);
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
    console.log('REMOVE FUNCTION - this.id = ' + this.nowID);
    this.people.removePerson(person);
    console.log('Remove Peep component this.id(current list) = ' + this.nowID + ' removedID = ' + person.id);
    if (this.nowID == person.id) {
      console.log(this.previousID == person.id);
      setTimeout(() => { this.showList(0) }, 100);
      setTimeout(() => { this.ngOnInit() }, 100);
    }
    else {
      setTimeout(() => { this.ngOnInit() }, 100);
    }
  }
}
