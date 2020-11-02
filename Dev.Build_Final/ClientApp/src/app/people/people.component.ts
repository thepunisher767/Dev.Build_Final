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
    this.people.AddPerson(this.newPerson);
    this.newPerson.firstname = '';
    this.newPerson.lastname = '';
    setTimeout(() => { this.ngOnInit() }, 100);
  }

  removePerson(person: people) {
    this.people.removePerson(person);
    setTimeout(() => { this.ngOnInit() }, 100);
  }







}
