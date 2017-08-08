import {AfterViewInit, Component, OnInit} from "@angular/core";
import {WorkoutsService} from "../workouts.service";
import {TargetWOService} from "../target-wo.service";
import {Workout} from "../Objects/Workout";
import {Target} from "../Objects/Target";


declare var Plotly: any;



@Component({
  selector: 'app-times-this-week',
  templateUrl: './times-this-week.component.html',
  styleUrls: ['./times-this-week.component.css', '../material-shared/shared-css.css']
})
export class TimesThisWeekComponent implements OnInit, AfterViewInit {

  wrkouts:Workout[];
  trgt:Target;
  cnt:number;
  dayData: any[];
  usrid:string;
  public progressValue:number;
  ready:boolean = false;
  public spincolor:string;


  constructor(private workoutService:WorkoutsService, private targetService:TargetWOService) { }

  ngOnInit() {
    this.usrid = localStorage.getItem('id_sub');
    Promise.all([
      this.targetService.getTarget(this.usrid),
      this.workoutService.workoutsThisWeek(this.usrid),
      ]).then((results) => {
      this.trgt = results[0];
      this.wrkouts = results[1];
      this.cnt = this.wrkouts.length;
      this.progressValue = Math.round((this.cnt/this.trgt.number) * 100);
      this.spincolor = this.progressValue > 99 ? "#0db721": "#5c8cac";
      this.ready = true;


    });


  }

  ngAfterViewInit() {

    this.workoutService.getDayGraphData(this.usrid).then((results) => {
      this.dayData = results;
      let data = [{
        x: [],
        y: [],
        type: 'bar'
      }];
      data[0].x = [];
      data[0].y = [];
      this.dayData.forEach((obj) => {
        console.log(obj);
        data[0].x.push(obj.date);
        data[0].y.push(obj.duration);
      });
      console.log(data[0]);
      Plotly.newPlot('dayGraph', data);
    });
  }


  getColor() {
    if (this.progressValue < 33) {
      return 'red';
    } else if (this.progressValue >= 33 && this.progressValue < 66) {
      return 'orange';
    } else if (this.progressValue >= 66 && this.progressValue < 90) {
      return 'rgb(230,250,52)';
    } else {
      return 'green';
    }


  }




}
