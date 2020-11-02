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
  person: people
  firstNameError: boolean
  lastNameError: boolean

  newPerson: people = {
    firstname: '',
    lastname: ''
  }

  ngOnInit(): void {
    this.people.getPeopleList().subscribe(
      (data: people) =>
        this.peopleList = data
    );
  }

  showList(id) {
    this.router.navigate(['/book', { outlets: { 'gifts': [id] } }]);
  }

  addPerson() {
    if (!/^[A-z][\sA-z]*$/.test(this.newPerson.firstname) || !/^[A-z][\sA-z]*$/.test(this.newPerson.lastname)) {
      if (!/^[A-z][\sA-z]*$/.test(this.newPerson.firstname)) {
        console.log('If-firstname = ' + /^[A-z][\sA-z]*$/.test(this.newPerson.firstname));
        this.firstNameError = true;
      }
      else {
        console.log('Else-firstname = ' + /^[A-z][\sA-z]*$/.test(this.newPerson.firstname));
        this.firstNameError = false;
      }
      if (!/^[A-z][\sA-z]*$/.test(this.newPerson.lastname)) {
        console.log('If-lastname = ' + /^[A-z][\sA-z]*$/.test(this.newPerson.lastname));
        this.lastNameError = true;
      }
      else {
        console.log('Else-lastname = ' + /^[A-z][\sA-z]*$/.test(this.newPerson.lastname));
        this.lastNameError = false;
      }
      console.log('F-Error = ' + this.firstNameError + ' L-Error = ' + this.lastNameError)
    }
    else {
      this.people.AddPerson(this.newPerson);
      this.newPerson.firstname = '';
      this.newPerson.lastname = '';
      this.firstNameError = false;
      this.lastNameError = false;
    }
    setTimeout(() => { this.ngOnInit() }, 200);
  }

  removePerson(person: people) {
    this.people.removePerson(person);
    setTimeout(() => { this.ngOnInit() }, 100);
  }







}
