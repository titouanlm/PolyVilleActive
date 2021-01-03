import { Component, OnInit } from '@angular/core';
import {CulturalEvent} from "../../models/event.model";
import {EventService} from "../../services/event.service";
import {CulturalActorService} from "../../services/culturalActor.service";
import {CulturalActor} from "../../models/culturalActor.model";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-cultural-actor-events',
  templateUrl: './cultural-actor-events.component.html',
  styleUrls: ['./cultural-actor-events.component.scss']
})
export class CulturalActorEventsComponent implements OnInit {
  public culturalActor:CulturalActor;
  public eventList: CulturalEvent[];
  private myDate = new Date();


  constructor(private datePipe: DatePipe,public eventService: EventService, public culturalActorService: CulturalActorService) {
    this.culturalActor = JSON.parse(localStorage.getItem('currentActor'));
    this.culturalActorService.getCulturalEvents(String(this.culturalActor.id));
    this.culturalActorService.cevents$.subscribe((events)=>this.eventList=events);
  }

  ngOnInit(): void {
  }

  status(date2,date3)
  {
    var date1 = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    var d1=new Date(date1);
    var d2=new Date(date2);
    var d3=new Date(date3);
    if (d1>=d2 && d1<=d3)
      return "Now";
    if(d1<d2)
      return "Comming";
    if(d1>d3)
      return "Done";
  }
}
