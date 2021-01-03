import { Component, OnInit } from '@angular/core';
import {CulturalEvent} from "../../models/event.model";
import {EventService} from "../../services/event.service";
import {CulturalActorService} from "../../services/culturalActor.service";
import {CulturalActor} from "../../models/culturalActor.model";


@Component({
  selector: 'app-cultural-actor-events',
  templateUrl: './cultural-actor-events.component.html',
  styleUrls: ['./cultural-actor-events.component.scss']
})
export class CulturalActorEventsComponent implements OnInit {
  public culturalActor:CulturalActor;
  public eventList: CulturalEvent[];

  constructor(public eventService: EventService, public culturalActorService: CulturalActorService) {
    this.culturalActor = JSON.parse(localStorage.getItem('currentActor'));
    this.culturalActorService.getCulturalEvents(String(this.culturalActor.id));
    this.culturalActorService.cevents$.subscribe((events)=>this.eventList=events);
  }

  ngOnInit(): void {
  }
/*
  setShop(number){
    this.shopService.getShopFromUrl(this.shopList[number].id);
  }
*/
}
