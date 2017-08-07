import { Component, OnInit } from '@angular/core';
import { CardList } from '../../classes/card-list';
import { VacancyCardItem } from '../../interfaces/vacancy-card-item';
import { HttpService } from '../../http-service/http-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vacancy-list',
  templateUrl: 'vacancy-list-component.html',
  styleUrls: ['../person-list-component/person-list.component.scss'],
  providers: [HttpService],
})

export class VacancyListComponent implements OnInit {
  flagOfButtonShowMore: boolean = true;
  vacancies: VacancyCardItem [] = [];
  urlAdress: string;
  listItem: CardList;
  body: any;
  arrayOfCities: any[];
  arrayOfSkills: any[];
  countOfElements: number;


  constructor(private httpService: HttpService, private route: ActivatedRoute) {
    this.arrayOfSkills = [];
    this.arrayOfCities = [];
    this.countOfElements =  5;
}

  ngOnInit() {
    this.httpService.postData({skip: 0, capacity: this.countOfElements}, 'http://192.168.43.8:1488/api/vacancies')
      .subscribe((res) => {
      this.vacancies = res.json();
      this.listItem = new CardList(this.vacancies, 'vacancies');
      this.urlAdress = this.route.snapshot.url[0].path;
    });
  }

  send(event) {
    this.countOfElements = 0;
    this.checkGroupOfEvent(event);
    this.body = {
      skip: 0,
      city: this.arrayOfCities,
      primarySkill: this.arrayOfSkills,
      capacity: this.countOfElements + 6,
    };
    this.httpService.postData(this.body, 'http://192.168.43.8:1488/api/vacancies')
      .subscribe((res) => {
        // console.log(res.json());
        this.vacancies = res.json();
        if (this.isLastItem())
          this.vacancies.pop();
        this.listItem = new CardList(this.vacancies, 'vacancies');
        this.urlAdress = this.route.snapshot.url[0].path;
      });
  }

  isElemOfArray(array: any[], number: number): boolean {
    let temp = array.indexOf(number);
    if (temp > -1) {
      array.splice(temp, 1);
      return true;
    }
    else
      return false;
  }

  checkGroupOfEvent(event) {
    switch (event.group) {
      case 'city':
        if (!this.isElemOfArray(this.arrayOfCities, event.id)) {
          this.arrayOfCities.push(event.id);
        }
        break;
      case 'skill':
        if (!this.isElemOfArray(this.arrayOfSkills, event.id)) {
          this.arrayOfSkills.push(event.id);
        }
        break;
    }
  }

  onClick() {
    this.body = {
      skip: 0,
      city: this.arrayOfCities,
      primarySkill: this.arrayOfSkills,
      capacity: this.countOfElements + 6,
    };
    this.httpService.postData(this.body, 'http://192.168.43.8:1488/api/vacancies')
      .subscribe((res) => {
        this.vacancies = res.json();
        console.log(this.vacancies);
        if (this.isLastItem())
          this.vacancies.pop();
        this.listItem = new CardList(this.vacancies, 'vacancies');
        this.urlAdress = this.route.snapshot.url[0].path;
      });
  }

  isLastItem() {
    console.log(this.countOfElements);
    if (this.countOfElements + 5< this.vacancies.length) {
      this.flagOfButtonShowMore = true;
      this.countOfElements += 5;
      console.log('good', this.countOfElements);
      return true;
    }
    else
    {
      this.countOfElements -= 5;
      console.log('sosi',this.countOfElements);
      this.flagOfButtonShowMore = false;
      return false;
    }
  }
}
