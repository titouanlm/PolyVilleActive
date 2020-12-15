import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogPromoInformationComponent} from "../dialog-promo-information/dialog-promo-information.component";
import {PopupVisitorInhabitantAuthenticationComponent} from "../popup-visitor-inhabitant-authentication/popup-visitor-inhabitant-authentication.component";
import {Shop} from "../../models/shop.model";
import {Promotion} from "../../models/event.model";
import {PromotionService} from "../../services/promotion.service";

export interface DialogData2 {
  number2: number;
}

@Component({
  selector: 'app-promotion-information',
  templateUrl: './promotion-information.component.html',
  styleUrls: ['./promotion-information.component.scss']
})
export class PromotionInformationComponent implements OnInit {

  error = '';

  number: number;

  constructor(public dialog: MatDialog,
              private promotionService: PromotionService) { }

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

}
