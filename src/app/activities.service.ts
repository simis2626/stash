///<reference path="../../node_modules/rxjs/add/operator/map.d.ts"/>
import {Injectable} from "@angular/core";
import {Activity} from "./Objects/Activity";
import {Headers, Http, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class ActivitiesService {

  private activities:Activity[];


  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.activities = [];
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions({headers: this.headers});

  }

  private extractData(res) {
    let body = res.json();
    return body || {};
  }

  getActivityList():Promise<Activity[]>{
    return new Promise((resolve,reject) => {

      this.http.get('/api/activity', this.options).map(this.extractData).subscribe((results) => {
        console.log(results);
        resolve(results);
      });

    });
  }











}
