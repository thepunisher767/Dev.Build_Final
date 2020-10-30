/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { CountdownComponent } from './countdown.component';

let component: CountdownComponent;
let fixture: ComponentFixture<CountdownComponent>;

describe('countdown component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CountdownComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(CountdownComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});