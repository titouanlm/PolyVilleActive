import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogPromoInformationComponent} from "../dialog-promo-information/dialog-promo-information.component";
import {PopupVisitorInhabitantAuthenticationComponent} from "../popup-visitor-inhabitant-authentication/popup-visitor-inhabitant-authentication.component";
import {Shop} from "../../models/shop.model";
import {Promotion} from "../../models/event.model";
import {PromotionService} from "../../services/promotion.service";
import {InhabitantService} from "../../services/inhabitant.service";
import {Inhabitant} from "../../models/inhabitant.model";
import {InhabitantForSellerComponent} from "../inhabitant-for-seller/inhabitant-for-seller.component";
import {ShopService} from "../../services/shop.service";

export interface DialogData2 {
  number2: number;
}

@Component({
  selector: 'app-promotion-information',
  templateUrl: './others-information.component.html',
  styleUrls: ['./others-information.component.scss']
})
export class OthersInformationComponent implements OnInit {

  error2 = '';
  error = '';
  inhabitantId: number;
  number: number;
  inhabitant: Inhabitant;

  constructor(public dialog: MatDialog,
              private promotionService: PromotionService,
              private inhabitantService: InhabitantService,
              private shopService: ShopService) { }

  ngOnInit(): void {
  }

  displayPromotion(){
    this.promotionService.getPromotion(this.number).subscribe(next => {
        const dialogRef = this.dialog.open(DialogPromoInformationComponent, {
          width: '40%',
          height: '30%',
          data: {number2: this.number},
        });
      },
      error1 => {
          this.error = 'unknown promotion'
      });
  }

  displayInhabitant(){
    this.shopService.getShopFromUrl(this.shopService.shopSelected.id);
    this.inhabitantService.authenticateInhabitant(Number(this.inhabitantId))
      .subscribe(
        next => {
          const dialogRef = this.dialog.open(InhabitantForSellerComponent, {
              width: '40%',
              height: '30%'
          });
      },
      error1 => {
        this.error2 = 'unknown inhabitant'
      });
  }



}
