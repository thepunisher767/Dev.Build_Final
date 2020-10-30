/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { DecorationsComponent } from './decorations.component';

let component: DecorationsComponent;
let fixture: ComponentFixture<DecorationsComponent>;

describe('decorations component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DecorationsComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(DecorationsComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});