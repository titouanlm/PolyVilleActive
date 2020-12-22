import { Component, OnInit } from '@angular/core';
import {CulturalActor} from "../../models/culturalActor.model";
import {CulturalActorService} from "../../services/culturalActor.service";

@Component({
  selector: 'app-cultural-actor-home',
  templateUrl: './cultural-actor-home.component.html',
  styleUrls: ['./cultural-actor-home.component.scss']
})
export class CulturalActorHomeComponent implements OnInit {

  public culturalActor: CulturalActor;

  constructor(public culturalActorService: CulturalActorService) {
    this.culturalActor = this.culturalActorService.cactor;
  }

  ngOnInit(): void {
  }

  logout() {
    this.culturalActorService.logout();
  }
}
