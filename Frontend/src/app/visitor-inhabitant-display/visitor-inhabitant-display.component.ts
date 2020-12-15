import { Component, OnInit } from '@angular/core';
import {InhabitantService} from '../../services/inhabitant.service';
import {Inhabitant} from "../../models/inhabitant.model";
import {ShopService} from "../../services/shop.service";
import {Shop} from "../../models/shop.model";
import {PopupSellerAuthenticationComponent} from "../popup-seller-authentication/popup-seller-authentication.component";
import {MatDialog} from "@angular/material/dialog";
import {NotificationPromotionComponent} from "../notification-promotion/notification-promotion.component";
import {Promotion} from "../../models/event.model";
import {ThanksComponent} from "../thanks/thanks.component";

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
  shop: Shop;

  constructor(public inhabitantService: InhabitantService,
    public shopService: ShopService, public dialog: MatDialog) {
    this.shopName ='';
    this.inhabitant = this.inhabitantService.currentInhabitant;
  }

  achat(){
    const dialogRef = this.dialog.open(ThanksComponent, {
      width: '25%',
      height: '10%',
    });
    this.shopService.verifyShopPosition(this.inhabitant.longitude, this.inhabitant.latitude).subscribe(
      (shop) => {
        this.shop = shop[0];
        if(this.shop != undefined){
          if (this.shop.averagePresenceBeforePurchase == undefined){
            this.shop.averagePresenceBeforePurchase = { numberOfPurchases: 0, numberOfPresence: 0};
          }
          this.shop.averagePresenceBeforePurchase.numberOfPurchases++;
          this.shop.averagePresenceBeforePurchase.numberOfPresence = this.inhabitant.positions
            .filter((position) =>
              position[0] == this.inhabitant.longitude && position[1] == this.inhabitant.latitude).length;
          this.inhabitantService.updateInhabitantPositions(
            this.inhabitant.positions
              .filter((position) =>
                position[0] != this.inhabitant.longitude || position[1] != this.inhabitant.latitude)
          );
          this.shopService.updateShop(this.shop);
          this.inhabitantService.authenticateInhabitant(this.inhabitant.id).subscribe((inhabitant) => this.inhabitant = inhabitant);
          this.shop = undefined;
        }
      }
    );
  }


  move() {
    this.shopService.verifyShopExist(this.shopName)
      .subscribe(
        shop => {
            this.error = '';
            this.inhabitantService.changeLocation(shop.longitude, shop.latitude);
            this.inhabitant.latitude = Number(shop.latitude);
            this.inhabitant.longitude = Number(shop.longitude);
            this.getPromotionShop(shop);
        },
        error => {
          this.error = 'Unknown shop.';
        });
  }

  logout() {
    this.inhabitantService.logout();
  }


  public getPromotionShop(shop: Shop) {
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
