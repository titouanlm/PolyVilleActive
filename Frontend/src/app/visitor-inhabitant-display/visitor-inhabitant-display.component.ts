import { Component, OnInit } from '@angular/core';
import {InhabitantService} from '../../services/inhabitant.service';
import {Inhabitant} from "../../models/inhabitant.model";
import {ShopService} from "../../services/shop.service";
import {Shop} from "../../models/shop.model";
import {PopupSellerAuthenticationComponent} from "../popup-seller-authentication/popup-seller-authentication.component";
import {MatDialog} from "@angular/material/dialog";
import {NotificationPromotionComponent} from "../notification-promotion/notification-promotion.component";
import {Promotion} from "../../models/event.model";

export interface DialogData {
  shop: Shop;
  promotion: Promotion;
}


@Component({
  selector: 'app-basic-display',
  templateUrl: './visitor-inhabitant-display.component.html',
  styleUrls: ['./visitor-inhabitant-display.component.scss']
})
export class VisitorInhabitantDisplayComponent {

  public inhabitant: Inhabitant;
  shopName: string;
  error: string;

  constructor(public inhabitantService: InhabitantService, public shopService: ShopService, public dialog: MatDialog) {
    this.shopName ='';
    this.inhabitantService.inhabitant$.subscribe((inhabitant) => this.inhabitant = inhabitant);
  }


  move() {
    this.shopService.verifyShopExist(this.shopName)
      .subscribe(
        shop => {
            this.error = '';
            this.inhabitantService.changeLocation(shop.longitude, shop.latitude);
            this.getPromotionShop(shop);
        },
        error => {
          this.error = 'Unknown shop.';
        });
  }

  logout() {
    this.inhabitantService.logout();
  }


  private getPromotionShop(shop: Shop) {
    const lastPromo = shop.promotions.slice(-1)[0];
    if(lastPromo){
      this.openPromoDialog(lastPromo , shop)
    }
  }

  openPromoDialog(lastPromo, shop) {
    const dialogRef = this.dialog.open(NotificationPromotionComponent, {
      width: '40%',
      height: '40%',
      data: {promotion: lastPromo, shop : shop}
    });
  }
}
