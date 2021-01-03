import { Component, OnInit } from '@angular/core';
import {ShopService} from "../../services/shop.service";
import {Shop} from "../../models/shop.model";
import {CulturalEvent, Event} from "../../models/event.model";
import {EventService} from "../../services/event.service";
import {InhabitantService} from "../../services/inhabitant.service";
import {CulturalActorService} from "../../services/culturalActor.service";
import {CulturalActor} from "../../models/culturalActor.model";

@Component({
  selector: 'app-event-rating',
  templateUrl: './event-list-rating.component.html',
  styleUrls: ['./event-list-rating.component.scss']
})
export class EventListRatingComponent implements OnInit {

  public eventList: CulturalEvent[];
  public culturalActors:CulturalActor[];

  constructor(public culturalActorService: CulturalActorService, public inhabitantService: InhabitantService) {
    this.culturalActorService.getCulturalActorsFromUrl();
    this.culturalActorService.cactors$.subscribe((cactors) => this.culturalActors = cactors);
    // this.culturalActors=[];
    /* this.culturalActorService.cevents$.subscribe((cevents)=>
       {this.culturalActors.forEach((actor)=>
       {
         this.culturalActorService.getCulturalEvents(String(actor.id));
         this.eventList=this.eventList.concat(cevents);
       })

     })*/
    console.log(this.culturalActors);
    for(let actor in this.culturalActors)
    {
      console.log(actor);
      this.culturalActorService.getCulturalEvents(String(actor));
      this.culturalActorService.cevents$.subscribe((cevents)=>this.eventList=this.eventList.concat(cevents));
    }


  }

  ngOnInit(): void {
  }



}
