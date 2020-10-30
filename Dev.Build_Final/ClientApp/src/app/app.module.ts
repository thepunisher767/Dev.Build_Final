import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list'


import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { PartyComponent } from './party/party.component';
import { GiftsComponent } from './gifts/gifts.component';
import { PeopleComponent } from './people/people.component';
import { DecorationsComponent } from './decorations/decorations.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookComponent } from './book/book.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    PartyComponent,
    GiftsComponent,
    PeopleComponent,
    DecorationsComponent,
    BookComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'book', component: BookComponent, children: [
        { path: ':id', component: GiftsComponent, outlet: 'gifts' },
        { path: 'people', component: PeopleComponent, outlet: 'people' }
      ] },
      { path: 'decorations', component: DecorationsComponent },
      { path: 'party', component: PartyComponent }
    ]),
    BrowserAnimationsModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
