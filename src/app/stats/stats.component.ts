import {Component, OnInit, AfterViewInit} from "@angular/core";
import {ActivitiesService} from "../activities.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css', '../material-shared/shared-css.css']
})
export class StatsComponent implements OnInit, AfterViewInit {

  constructor(private activityService: ActivitiesService) {
  }

ngAfterViewInit() {
    window.scroll(0, 0);

  }


  weightStats: any;
  activitylist: any[];
  selectedActivity: string;
  tableStructure: any[];
  realTableStructure: any[];

  ngOnInit() {
    this.activitylist = [];
    this.activityService.getStats(localStorage.getItem('id_sub')).then((weightStats) => {

      this.weightStats = weightStats[0];
      for (let i = 0; i < this.weightStats.activityNames.length; i++) {
        this.activitylist.push(this.weightStats.activityNames[i]._id.name);
      }
    });

  }


  populateTable() {
    let compFunction = function (a, b) {
      if (a._id.weight > b._id.weight) {
        return 1;
      } else if (a._id.weight < b._id.weight) {
        return -1;
      }
      return 0;
    };

    this.tableStructure = [[], []];
    let filteredPBArray = this.weightStats.personalBests.filter(function (act) {
      return act._id.name == this.selectedActivity;
    }, this);
    let filteredRecentArray = this.weightStats.mostRecent.filter(function (act) {
      return act._id.name == this.selectedActivity;
    }, this);

    filteredPBArray.sort(compFunction);
    filteredRecentArray.sort(compFunction);
    let value = 0;
    for (let weight of filteredPBArray) {
      this.tableStructure[value][0] = weight._id.weight + 'kg';
      this.tableStructure[value][1] = weight.PbReps;
      value++;
    }
    value = 0;
    for (let weight of filteredRecentArray) {
      this.tableStructure[value][2] = weight.reps + '<br>' + new Date(weight.mostRecent).toDateString();
      value++;
    }
    this.realTableStructure = [[], []];
    this.realTableStructure = this.tableStructure;
    console.log(this.realTableStructure);
  }





















  }


