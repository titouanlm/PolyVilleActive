import {Component, Inject, OnInit} from '@angular/core';
import {ShopService} from "../../services/shop.service";
import {PromotionService} from "../../services/promotion.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DialogData2} from "../promotion-information/promotion-information.component";

@Component({
  selector: 'app-dialog-promo-information',
  templateUrl: './dialog-promo-information.component.html',
  styleUrls: ['./dialog-promo-information.component.scss']
})
export class DialogPromoInformationComponent implements OnInit {

  number: number;

  constructor(private promotionService: PromotionService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData2) {
    console.log(this.data.number2);
    this.promotionService.getPromotion(this.data.number2)
      .subscribe((promotion) =>{
        if (promotion.notifiedCustomersNumber != undefined && promotion.notifiedCustomersNumber.length!=0){
          this.number = promotion.customersNumberInterested.length/promotion.notifiedCustomersNumber.length;
          //console.log(this.number)
        }
      })
  }

  ngOnInit(): void {
  }

}
