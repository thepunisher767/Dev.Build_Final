/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { GiftsComponent } from './gifts.component';

let component: GiftsComponent;
let fixture: ComponentFixture<GiftsComponent>;

describe('gifts component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ GiftsComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(GiftsComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});