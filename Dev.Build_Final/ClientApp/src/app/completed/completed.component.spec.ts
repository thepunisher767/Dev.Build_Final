/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { CompletedComponent } from './completed.component';

let component: CompletedComponent;
let fixture: ComponentFixture<CompletedComponent>;

describe('completed component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CompletedComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(CompletedComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});