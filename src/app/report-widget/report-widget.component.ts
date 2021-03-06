import {AfterViewInit, Component, OnInit} from '@angular/core';
import {WeighInService} from "../weigh-in.service";
import {WeighIn} from "../Objects/WeighIn";


declare var Plotly: any;




@Component({
  selector: 'app-report-widget',
  templateUrl: './report-widget.component.html',
  styleUrls: ['./report-widget.component.css', '../material-shared/shared-css.css']
})
export class ReportWidgetComponent implements OnInit, AfterViewInit {
  progressValue: number;
  weighins: WeighIn[] = [];
  currentWeighin: WeighIn;
  weightReady: boolean = false;
  expectedLoss: number;
goal:number;


  constructor(private weighinService: WeighInService) {
  }

  ngOnInit() {
    this.weighinService.getWeighin(localStorage.getItem('id_sub')).then((results) => {
      this.weighins = results;
      this.weighins.length > 0 ? this.weightReady = true : this.weightReady = false;
      this.currentWeighin = this.weighins[this.weighins.length - 1];
      this.setProgressValue();
    });


  }


  setProgressValue() {
    this.goal = 123;
    let start = this.weighins[0].weight;
    let desiredDifference = start - this.goal;
    this.progressValue = (this.currentWeighin.progress / desiredDifference) * 100;


  }

  createPlot() {
    if (this.weightReady) {
      let start = this.weighins[0].weight;
      let desiredDifference = this.goal - start;

      let dates: Date[] = [];
      let values: number[] = [];
      let valuesy: number[] = [];
      let valuesz: number[] = [];

      this.weighins.forEach((obj, ndx, arr) => {
        dates.push(obj.date);
        values.push(-1 * obj.progress);
        valuesy.push(desiredDifference);
        valuesz.push(this.expectedLoss * -1);
      });


      var Current = {
        x: dates,
        y: values,
        type: 'scatter',
        name: 'actual'
      };

      var Goal = {
        x: dates,
        y: valuesy,
        type: 'lines',
        name: 'goal'
      };
      var Progress = {
        x: dates,
        y: this.createTargetGraphSet(),
        type: 'lines',
        name: 'expected'
      };
      let layout = {
        title: 'Weight Progress',
        font: {
          family: 'Raleway, sans-serif'
        },
        showlegend: true,
        autosize: false,
        height: 290,
        width: window.innerWidth < 745 ? window.innerWidth : 745,
        yaxis: {
          title: 'kilos'
        }

      };

      var data = [Goal, Current, Progress];

      Plotly.newPlot('weightGraph', data, layout, {displayModeBar: false});
    }
  }


  createTargetGraphSet(): any {
    let end = new Date(new Date('2018-01-07').valueOf() + (12 * 7 * 24 * 60 * 60 * 1000));
    let start = this.weighins[0].weight;
    let desiredDifference = start - this.goal;
    let daysBetween = 12 * 7;
    let diffbyDay = desiredDifference / daysBetween;
    let d1 = new Date(this.currentWeighin.date).valueOf();
    let d2 = new Date('2018-01-07').valueOf();
    let dateDiff = d1 - d2;
    let dateRecentWeighin = dateDiff / (24 * 60 * 60 * 1000);
    let lossNeeded = diffbyDay * dateRecentWeighin;
    this.expectedLoss = lossNeeded;
    let graphSet: number[] = [];

    this.weighins.forEach(function (obj, ndx, arr) {
      let diff = new Date(obj.date).valueOf() - new Date('2018-01-07').valueOf();
      diff = diff / (24 * 60 * 60 * 1000);
      diff = -1 * diff * diffbyDay;
      graphSet.push(diff);
    });
    return graphSet;


  }


  ngAfterViewInit() {
    var timer = setInterval(() => {
      if (this.weightReady) {
        clearInterval(timer);
        this.createPlot();
      }
    }, 30)

  }


  getColor() {
    let end = new Date(new Date('2018-01-07').valueOf() + (12 * 7 * 24 * 60 * 60 * 1000));
    let start = this.weighins[0].weight;
    let desiredDifference = start - this.goal;
    let daysBetween = 12 * 7;
    let diffbyDay = desiredDifference / daysBetween;
    let d1 = new Date(this.currentWeighin.date).valueOf();
    let d2 = new Date('2018-01-07').valueOf();
    let dateDiff = d1 - d2;
    let dateRecentWeighin = dateDiff / (24 * 60 * 60 * 1000);
    let lossNeeded = diffbyDay * dateRecentWeighin;
    this.expectedLoss = lossNeeded;
    if (lossNeeded > this.currentWeighin.progress) {
      if (lossNeeded > this.currentWeighin.progress + (4 * diffbyDay)) {
        return 'red';
      }
      return 'orange'
    } else {
      return 'green';
    }


  }
}