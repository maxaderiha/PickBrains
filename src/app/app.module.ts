import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalHeaderModule } from './components/header/header.module';
import { VacanciesDetailModule } from './vacancy-detail/vacancy-detail.module';
import { AppComponent } from './app.component';
import { AccordionModule } from 'ngx-accordion';
import { PersonPageModule } from './main-page/person-list-component/person-list.module';
import { HttpModule } from '@angular/http';
import { TempModule } from './Temp/temp.module';
import { FilterPersonModule } from './components/filter-components/filter-person/filter-person.module';
import { VacancyListComponent } from './main-page/vacancy-list-component/vacancy-list-component';
import { VacancyPageModule } from './main-page/vacancy-list-component/vacancy-list-component.module';
import { HistoryModule } from './components/history/history.module';
import { HistoryPageModule } from './main-page/history-list-component/history-list-component.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    GlobalHeaderModule,
    PersonPageModule,
    AccordionModule,
    HttpModule,
    TempModule,
    FilterPersonModule,
    VacancyPageModule,
    HistoryPageModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
