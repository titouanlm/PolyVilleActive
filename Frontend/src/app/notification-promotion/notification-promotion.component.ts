import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../visitor-inhabitant-display/visitor-inhabitant-display.component";
import {PromotionService} from "../../services/promotion.service";
import {Inhabitant} from "../../models/inhabitant.model";
import {ShopService} from "../../services/shop.service";
import {InhabitantService} from "../../services/inhabitant.service";
import {Promotion} from "../../models/event.model";

@Component({
  selector: 'app-notification-promotion',
  templateUrl: './notification-promotion.component.html',
  styleUrls: ['./notification-promotion.component.scss']
})
export class NotificationPromotionComponent implements OnInit {

  public idCurrentInhabitant;
  public answers : boolean[];

  constructor(public dialogRef: MatDialogRef<NotificationPromotionComponent>,
              public promotionService: PromotionService,
              public inhabitantService: InhabitantService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    if (this.inhabitantService.currentInhabitant != undefined){
      this.idCurrentInhabitant = this.inhabitantService.currentInhabitant.id;
    }
    let i=0;
    this.answers = [];
    if (this.data.promotions != undefined){
      this.data.promotions.forEach((promotion) => {
        if (promotion.customersNumberInterested != undefined && !promotion.notifiedCustomersNumber.includes(this.idCurrentInhabitant)){
          promotion.notifiedCustomersNumber.push(this.idCurrentInhabitant);
          this.promotionService.updatePromotion(promotion);
        }
        this.answers[i++] = false;
      });
    }
  }

  ngOnInit(): void {
  }

  /**
   * This method is used to push the information of whether or not a client is interested in this promotion
   *
   * @param promotion targeted promotion
   * @param i promotion index in an array
   */

  public interestedInPromotion(promotion : Promotion, i : number){
    if (!promotion.customersNumberInterested!= undefined && !promotion.customersNumberInterested.includes(this.idCurrentInhabitant)){
      promotion.customersNumberInterested.push(this.idCurrentInhabitant);
    }
    this.answers[i]=true;
    this.promotionService.updatePromotion(promotion);
  }

  continue() {
    this.dialogRef.close();
  }
}

