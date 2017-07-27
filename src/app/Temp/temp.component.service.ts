import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class HttpService {

  constructor(private http: Http ,private route:ActivatedRoute) {
  }

  getData() {
    return this.http.get(`http://localhost:1337/api/vacancies/${this.route.snapshot.url[2].path}`).toPromise();
  }
}