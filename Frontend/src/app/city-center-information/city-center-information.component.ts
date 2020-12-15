import { Component, OnInit } from '@angular/core';
import {PromotionService} from "../../services/promotion.service";
import {Promotion} from "../../models/event.model";

@Component({
  selector: 'app-city-center-information',
  templateUrl: './city-center-information.component.html',
  styleUrls: ['./city-center-information.component.scss']
})
export class CityCenterInformationComponent implements OnInit {

  public promotions: Promotion[];

  constructor(public promotionService: PromotionService) {
    this.promotionService.getPublicPromotions().subscribe((promotions) => this.promotions = promotions);
  }

  ngOnInit(): void {

  }

}
