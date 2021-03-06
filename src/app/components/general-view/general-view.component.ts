import { Component, OnInit } from '@angular/core';
import { CandidateGeneralPage } from 'app/classes/candidate-general-page';
import { VacancyGeneralPage } from 'app/classes/vacancy-general-page';
import { MenuService } from '../menu/menu.service';
import { ComponentsData } from 'app/interfaces/components-data';
import { HttpService } from '../../http-service/http-service';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';

@Component({
  selector: 'general',
  templateUrl: 'general-view.component.html',
  styleUrls: ['general-view.component.scss'],
})
export class GeneralViewComponent implements OnInit {
  initialized: boolean = false;
  parentData: ComponentsData;
  model: any;

  temp: string;
  arrayOfCities: any[];
  sendArrayOfCities: string[];
  arrayOfStatuses: any[];
  sendArrayOfStatuses: string[];
  arrayOfSkills: any[];
  sendArrayOfSkills: string[];
  arrayOfLanguages: any[];
  sendArrayOfLanguages: string[];
  arrayOfOtherSkills: any[];
  sendArrayOfOtherSkills: string[];
  arrayOfCandidates: any[];
  sendArrayOfCandidates: string[];
  closeFlag: boolean = false;
  startCloseFlag: boolean = false;
  flagOfButtonShowMore: boolean = false;
  body: any;
  editCandidateObject: PostCandidateInfo;
  editVacancyObject: PostVacancyInfo;
  worker: number;

  constructor(private menuService: MenuService,
              private httpService: HttpService) {
    this.arrayOfCities = [];
    this.sendArrayOfCities = [];
    this.temp = '';
    this.arrayOfStatuses = [];
    this.sendArrayOfStatuses = [];
    this.arrayOfSkills = [];
    this.sendArrayOfSkills = [];
    this.arrayOfLanguages = [];
    this.sendArrayOfLanguages = [];
    this.arrayOfOtherSkills = [];
    this.sendArrayOfOtherSkills = [];
    this.arrayOfCandidates = [];
    this.sendArrayOfCandidates = [];
  }

  ngOnInit() {
    this.parentData = this.menuService.getData();
    this.identifyRequestType(this.parentData.type);
    if (this.model)
      this.initialized = true;
    this.editCandidateObject = new PostCandidateInfo();
    this.editVacancyObject = new PostVacancyInfo();
  }

  private identifyRequestType(item) {
    switch (item) {
      case 'candidate':
        this.model = new CandidateGeneralPage('', [], [], [], [], [], '');
        this.getCandidateRequests();
        this.getCandidateData();
        break;
      case 'vacancy':
        this.model = new VacancyGeneralPage('', [], [], [], [], [], '');
        this.getVacancyRequests();
        this.getVacancyData();
        break;
      default:
        break;
    }
  }

  getCandidateRequests() {
    const id = this.parentData.id;
    return Observable.forkJoin(
      this.httpService.getData('http://192.168.43.31:1337/api/meta-data/candidate-statuses')
        .map((res: Response) => res.json()),
      this.httpService.getData('http://192.168.43.31:1337/api/meta-data/skills')
        .map((res: Response) => res.json()),
      this.httpService.getData('http://192.168.43.31:1337/api/meta-data/english-levels')
        .map((res: Response) => res.json()),
      this.httpService.getData('http://192.168.43.31:1337/api/meta-data/locations')
        .map((res: Response) => res.json()),
      this.httpService.getData('http://192.168.43.31:1337/api/meta-data/other-skills')
        .map((res: Response) => res.json()),
      this.httpService.getData(`http://192.168.43.31:1337/api/candidates?id=${this.parentData.id}`)
        .map((res: Response) => res.json()),
    );
  }

  getVacancyRequests() {
    const id = this.parentData.id;
    return Observable.forkJoin(
      this.httpService.getData('http://192.168.43.31:1337/api/meta-data/vacancy-statuses')
        .map((res: Response) => res.json()),
      this.httpService.getData('http://192.168.43.31:1337/api/meta-data/skills')
        .map((res: Response) => res.json()),
      this.httpService.getData('http://192.168.43.31:1337/api/meta-data/english-levels')
        .map((res: Response) => res.json()),
      this.httpService.getData('http://192.168.43.31:1337/api/meta-data/locations')
        .map((res: Response) => res.json()),
      this.httpService.getData('http://192.168.43.31:1337/api/meta-data/other-skills')
        .map((res: Response) => res.json()),
      this.httpService.getData(`http://192.168.43.31:1337/api/vacancies/${this.parentData.id}/hiring`)
        .map((res: Response) => res.json()),
      this.httpService.getData(`http://192.168.43.31:1337/api/vacancies/${this.parentData.id}`)
        .map((res: Response) => res.json()),
    );
  }

  getCandidateData() {
    this.getCandidateRequests().subscribe((data) => {

      this.arrayOfStatuses = data[0];
      let index = 0;
      for (let i of this.arrayOfStatuses) {
        this.sendArrayOfStatuses[index] = i.status;
        index += 1;
      }

      this.arrayOfSkills = data[1];
      index = 0;
      for (let i of this.arrayOfSkills) {
        this.sendArrayOfSkills[index] = i.skillName;
        index += 1;
      }

      this.arrayOfLanguages = data[2];
      index = 0;
      for (let i of this.arrayOfLanguages) {
        this.sendArrayOfLanguages[index] = i.lvl;
        index += 1;
      }

      this.arrayOfCities = data[3];
      index = 0;
      for (let i of this.arrayOfCities) {
        this.sendArrayOfCities[index] = i.city;
        index += 1;
      }

      this.arrayOfOtherSkills = data[4];
      index = 0;
      for (let i of this.arrayOfOtherSkills) {
        this.sendArrayOfOtherSkills[index] = i.skill;
        index += 1;
      }

      this.temp = data[5];
      this.model = new CandidateGeneralPage(this.temp, this.sendArrayOfCities, this.sendArrayOfStatuses, this.sendArrayOfSkills, this.sendArrayOfLanguages, this.sendArrayOfOtherSkills, 'candidate');

    });
  }

  getVacancyData() {
    this.getVacancyRequests().subscribe((data) => {

      this.arrayOfStatuses = data[0];
      let index = 0;
      for (let i of this.arrayOfStatuses) {
        this.sendArrayOfStatuses[index] = i.status;
        index += 1;
      }

      this.arrayOfSkills = data[1];
      index = 0;
      for (let i of this.arrayOfSkills) {
        this.sendArrayOfSkills[index] = i.skillName;
        index += 1;
      }

      this.arrayOfLanguages = data[2];
      index = 0;
      for (let i of this.arrayOfLanguages) {
        this.sendArrayOfLanguages[index] = i.lvl;
        index += 1;
      }

      this.arrayOfCities = data[3];
      index = 0;
      for (let i of this.arrayOfCities) {
        this.sendArrayOfCities[index] = i.city;
        index += 1;
      }

      this.arrayOfOtherSkills = data[4];
      index = 0;
      for (let i of this.arrayOfOtherSkills) {
        this.sendArrayOfOtherSkills[index] = i.skill;
        index += 1;
      }

      this.arrayOfCandidates = data[5];
      index = 0;
      for (let i of this.arrayOfCandidates) {
        this.sendArrayOfCandidates[index] = i.name;
        index += 1;
      }

      this.temp = data[6];
      this.model = new VacancyGeneralPage(this.temp, this.sendArrayOfCities, this.sendArrayOfStatuses, this.sendArrayOfSkills, this.sendArrayOfLanguages, this.sendArrayOfOtherSkills, 'vacancy', this.sendArrayOfCandidates);
      if (this.model.status.value === 'Closed')
        this.startCloseFlag = true;
    });
  }

  isCandidate(): boolean {
    return this.initialized && this.model.type === 'candidate';
  }

  isVacancy(): boolean {
    return this.initialized && this.model.type === 'vacancy';
  }

  onModelChange(event) {
    this.flagOfButtonShowMore = true;
    this.makeBody(event, this.model.type);
  }

  onClickCandidate() {
    this.httpService.patchData(this.editCandidateObject, `http://192.168.43.31:1337/api/candidates/edit?id=${this.model.id}`)
      .subscribe(() => {
      });
  }

  onClickVacancy() {
    if (!this.closeFlag) {
      this.httpService.patchData(this.editVacancyObject, `http://192.168.43.31:1337/api/vacancies/${this.model.id}/update`)
        .subscribe(() => {
        });
    }
    else {
      this.httpService.patchData({
        vacancyId: this.model.id,
        candidateId: this.worker
      }, `http://192.168.43.31:1337/api/vacancies/close`)
        .subscribe(() => {
        });
    }

  }

  makeBody(event, type) {
    if (type === 'candidate') {
      switch (event.field) {
        case 'firstName' : {
          this.editCandidateObject.engFirstName = event.value;
          break;
        }
        case 'secondName' : {
          this.editCandidateObject.engSecondName = event.value;
          break;
        }
        case 'city' : {
          this.editCandidateObject.city = this.searchOfCountArray(this.arrayOfCities, event.value);
          break;
        }
        case 'status': {
          this.editCandidateObject.status = this.searchOfCountArray(this.arrayOfStatuses, event.value);
          break;
        }
        case 'skillName': {
          this.editCandidateObject.primarySkill = this.searchOfCountArray(this.arrayOfSkills, event.value);
          this.editCandidateObject.primarySkillLvl = event.level;
          break;
        }
        case 'expYear': {
          this.editCandidateObject.expYear = event.value;
          break;
        }
        case 'secSkills': {
          var counter = 0;
          for (var item of this.model.secondarySkills) {
            this.editCandidateObject.secSkills[counter] = new SkillsFields(
              this.searchOfCountArray(this.model.secondarySkills[counter].options, this.model.secondarySkills[counter].value),
              this.model.secondarySkills[counter].level
            );
            counter++;
          }
          break;
        }
        case 'otherSkills': {
          var count = 0;
          for (var item of this.model.otherSkills) {
            this.editCandidateObject.otherSkills[count] = this.searchOfCountArray(this.arrayOfOtherSkills, this.model.otherSkills[count].value);
            count++;
          }
          break;
        }
        case 'emails': {
          var count = 0;
          for (var item of this.model.otherSkills) {
            this.editCandidateObject.emails[count] = this.model.emailAdresses[count].value;
            count++;
          }
          break;
        }
        case 'lvl': {
          this.editCandidateObject.englishLvl = this.searchOfCountArray(this.arrayOfLanguages, event.value);
          break;
        }
        case 'phone': {
          this.editCandidateObject.phone = event.value;
          break;
        }
        case 'linkedin': {
          this.editCandidateObject.linkedin = event.value;
          break;
        }
        case 'skype': {
          this.editCandidateObject.skype = event.value;
          break;
        }
      }
    }
    if (type === 'vacancy') {
      switch (event.field) {
        case 'projectName' : {
          this.editVacancyObject.name = event.value;
          break;
        }
        case 'city' : {
          this.editVacancyObject.city = this.searchOfCountArray(this.arrayOfCities, event.value);
          break;
        }
        case 'status': {
          this.editVacancyObject.status = this.searchOfCountArray(this.arrayOfStatuses, event.value);
          break;
        }
        case 'skillName': {
          this.editVacancyObject.primarySkill = this.searchOfCountArray(this.arrayOfSkills, event.value);
          this.editVacancyObject.primarySkillLvl = event.level;
          break;
        }
        case 'projectStartDate': {
          this.editVacancyObject.startDate = event.value;
          break;
        }
        case 'workExperience': {
          this.editVacancyObject.expYear = event.value;
          break;
        }
        case 'secSkills': {
          var counter = 0;
          this.editVacancyObject.secondarySkills = [];
          for (var item of this.model.secondarySkills) {
            this.editVacancyObject.secondarySkills[counter] = new SkillsFieldsVacancy(
              this.searchOfCountArray(this.model.secondarySkills[counter].options, this.model.secondarySkills[counter].value),
              this.model.secondarySkills[counter].level
            );
            counter++;
          }
          break;
        }
        case 'otherSkills': {
          var count = 0;
          this.editVacancyObject.otherSkills = [];
          for (var item of this.model.otherSkills) {
            this.editVacancyObject.otherSkills[count] = this.searchOfCountArray(this.arrayOfOtherSkills, this.model.otherSkills[count].value);
            count++;
          }
          break;
        }
        case 'lvl': {
          this.editVacancyObject.englishLvl = this.searchOfCountArray(this.arrayOfLanguages, event.value);
          break;
        }
        case 'salaryWish': {
          this.editVacancyObject.salaryWish = event.value;
          break;
        }
        case 'linkedin': {
          this.editVacancyObject.linkedin = event.value;
          break;
        }
        case 'description': {
          this.editVacancyObject.description = event.value;
          break;
        }
        case 'worker': {
          this.worker = this.searchOfCountArray(this.arrayOfCandidates, event.value);
          break;
        }
      }
    }
    return this.body
  }

  searchOfCountArray(array: any[], searchWord: string) {
    let index = 0;
    for (let i of array) {
      if (JSON.stringify(i).indexOf(searchWord) > -1)
        return index + 1;
      else
        index += 1;
    }
  }

  isClose() {
    if (this.model.status.value === 'Closed' && !this.startCloseFlag) {
      this.closeFlag = true;
      return true;
    }
  }

}

export class SkillsFields {
  skillName: number;
  lvl: number;

  constructor(name: number, level: number) {
    this.skillName = name;
    this.lvl = level;
  }
}

export class PostCandidateInfo {
  city: number;
  expYear: string; //Date;
  emails: string[];
  engFirstName: string;
  engSecondName: string;
  linkedin: string;
  englishLvl: number;
  otherSkills: any[] = [];
  phone: string;
  primarySkillLvl: number;
  secSkills: SkillsFields[] = [];
  primarySkill: number;
  skype: string;
  status: number;

  constructor() {
  }
}

export class PostVacancyInfo {
  name: string;
  primarySkill: number;
  primarySkillLvl: number;
  city: number;
  status: number;
  secondarySkills: SkillsFieldsVacancy[];
  otherSkills: any[];
  englishLvl: number;
  linkedin: string;
  salaryWish: number;
  expYear: string; //Date;
  startDate: string; //Date;
  description: string;

  constructor() {
  }
}

export class SkillsFieldsVacancy {
  id: number;
  lvl: number;

  constructor(name: number, level: number) {
    this.id = name;
    this.lvl = level;
  }
}



