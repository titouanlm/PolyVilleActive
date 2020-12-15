import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../visitor-inhabitant-display/visitor-inhabitant-display.component";
import {PromotionService} from "../../services/promotion.service";
import {Inhabitant} from "../../models/inhabitant.model";
import {ShopService} from "../../services/shop.service";
import {InhabitantService} from "../../services/inhabitant.service";

@Component({
  selector: 'app-notification-promotion',
  templateUrl: './notification-promotion.component.html',
  styleUrls: ['./notification-promotion.component.scss']
})
export class NotificationPromotionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NotificationPromotionComponent>,
              public promotionService: PromotionService,
              public inhabitantService: InhabitantService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  public interestedInPromotion(interested: boolean){
    if (interested && this.data.promotion.customersNumberInterested == undefined){
      const array = [];
      array.push(this.inhabitantService.currentInhabitant.id);
      this.data.promotion.customersNumberInterested = array;
    }
    else if (interested) {
      if (this.data.promotion.customersNumberInterested.indexOf(this.inhabitantService.currentInhabitant.id) == -1)
      this.data.promotion.customersNumberInterested.push(this.inhabitantService.currentInhabitant.id);
    }
    if (this.data.promotion.notifiedCustomersNumber == undefined){
      const array = [];
      array.push(this.inhabitantService.currentInhabitant.id);
      this.data.promotion.notifiedCustomersNumber = array;
    }
    else {
      if (this.data.promotion.notifiedCustomersNumber.indexOf(this.inhabitantService.currentInhabitant.id) == -1)
      this.data.promotion.notifiedCustomersNumber.push(this.inhabitantService.currentInhabitant.id);
    }
    this.promotionService.updatePromotion(this.data.promotion);
    this.dialogRef.close();
  }



}

