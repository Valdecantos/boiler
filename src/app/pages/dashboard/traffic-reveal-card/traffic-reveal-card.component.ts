import { Component, OnDestroy } from '@angular/core';
import { TrafficList, TrafficListService } from '../../../@core/data/traffic-list.service';
import { ScheduleItem, ScheduleService } from '../../../@core/data/schedule.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-traffic-reveal-card',
  styleUrls: ['./traffic-reveal-card.component.scss'],
  templateUrl: './traffic-reveal-card.component.html',
})
export class TrafficRevealCardComponent implements OnDestroy {

  private alive = true;

  trafficListData: TrafficList;
  scheduleData: Array<ScheduleItem> = [];
  revealed = false;
  period: string = 'week';

  constructor(private trafficListService: TrafficListService, private scheduleService: ScheduleService) {

    this.scheduleService.getData()
      .subscribe(
        data => {
          if (data.length){
            data.forEach(element => {
              this.scheduleData.push(element);
            });
          } else {
            this.scheduleData = [];
          }
        },
        error => {
          console.log("La hemos cagado", error);
        });

  }

  toggleView() {
    this.revealed = !this.revealed;
  }

  setPeriod(value: string): void {
    this.getTrafficFrontCardData(value);
  }

  getTrafficFrontCardData(period: string) {
    this.trafficListService.getTrafficListData(period)
      .pipe(takeWhile(() => this.alive ))
      .subscribe(trafficListData => {
        this.trafficListData = trafficListData;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
