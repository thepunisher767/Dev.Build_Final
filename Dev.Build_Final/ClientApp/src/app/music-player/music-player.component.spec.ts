/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { MusicPlayerComponent } from './music-player.component';

let component: MusicPlayerComponent;
let fixture: ComponentFixture<MusicPlayerComponent>;

describe('musicPlayer component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ MusicPlayerComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(MusicPlayerComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});