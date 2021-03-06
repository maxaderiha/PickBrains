import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddTechFeedbackPage } from 'app/classes/add-tech-feedback-page';
import { UserService } from 'app/core-service/user.service';
import { HttpService } from 'app/http-service/http-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'add-feedback',
  templateUrl: 'add-feedback.component.html',
  styleUrls: [
    './add-feedback.component.scss',
    '../interview-list/interview-list.component.scss',
  ],
})

export class AddFeedbackComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  model: AddTechFeedbackPage;
  skillMap: Map<string, number>;
  interviewId: number;

  constructor(private userService: UserService,
              private httpService: HttpService,
              private router: Router,
              private currentActivatedRoute: ActivatedRoute) {
    this.subscription = currentActivatedRoute.params
      .subscribe(params => this.interviewId = params['id']);
    this.skillMap = new Map();
    this.model = new AddTechFeedbackPage([]);
  }

  ngOnInit() {
    this.httpService.getData('http://192.168.43.31:1337/api/meta-data/skills')
      .subscribe(
        (res) => {
          this.getSkillData(res.json());
          this.model = new AddTechFeedbackPage(Array.from(this.skillMap.keys()));
          this.model.setName(this.userService.realName);
        },
        (error) => {
          console.log(error);
        });
  }

  getSkillData(param) {
    param.forEach(item => this.skillMap.set(item.skillName, item.id));
  }

  addSecondarySkill() {
    this.model.addSkill();
  }

  removeOptions() {
    this.model.removeOptions();
  }

  submit() {
    this.httpService.postData({
      primarySkillId: this.skillMap.get(this.model.primarySkill.value),
      primarySkillLvl: this.model.primarySkill.level,
      interviewId: this.interviewId,
      secondarySkills: this.model.secondarySkills.map((item) => {
        return {
          skillLvl: item.level,
          skillId: this.skillMap.get(item.value),
        };
      }),
      other: this.model.comment.value,
    }, 'http://192.168.43.31:1337/api/candidate/ts-feedbacks/new').subscribe(
      (res) => {
        console.log(res.status);
        console.log(this.model);
        if (res.status === 201) {
          this.router
            .navigate(['/inerviews']);
        }
      },
      (error) => {
        console.log(error);
      },
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
