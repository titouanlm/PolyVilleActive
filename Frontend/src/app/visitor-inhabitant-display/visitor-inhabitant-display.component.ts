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
import {PopupVisitorInhabitantAutorisationComponent} from "../popup-visitor-inhabitant-autorisation/popup-visitor-inhabitant-autorisation.component";
import {AutorisationService} from "../../services/autorisation.service";
import {Autorisation} from "../../models/autorisation.model";

export interface DialogData {
  shop: Shop;
  promotion: Promotion;
}


export interface DialogDataAutorisation {
  shop: Shop;
  inhabitant: Inhabitant;
}

@Component({
  selector: 'app-basic-display',
  templateUrl: './visitor-inhabitant-display.component.html',
  styleUrls: ['./visitor-inhabitant-display.component.scss']
})
export class VisitorInhabitantDisplayComponent {
  public autorisation=<Autorisation>{};
  public inhabitant: Inhabitant;
  public popup=PopupVisitorInhabitantAutorisationComponent;
  shopName: string;
  error: string;
  shop: Shop;


  constructor(public inhabitantService: InhabitantService, public shopService: ShopService,public autorisationService:AutorisationService, public dialog: MatDialog) {
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





  private getPromotionShop(shop: Shop) {
    const lastPromo = shop.promotions.slice(-1)[0];
    var autorisation=this.autorisationService.verifyAutorisationExist(shop.label, this.inhabitant.id)
    console.log("Hello");
    console.log(autorisation);
    if (autorisation.length == 0)
    {
      console.log(shop);
      console.log(this.inhabitant);
       this.openAuthorisationDialog(shop,this.inhabitant);

     // console.log("uhuhuh");
     // console.log(autorisation);
    }

    //window.location.reload();

    if (autorisation.length != 0){
      console.log("AJUJGUG");
    if(lastPromo){
      this.openPromoDialog(lastPromo , shop)
    }}
  }

  openAuthorisationDialog(shop,inhabitant) {
    console.log("I'm heeere")
    const dialogRef = this.dialog.open(PopupVisitorInhabitantAutorisationComponent, {
      width: '40%',
      height: '40%',
      data: {inhabitant: inhabitant, shop: shop}
    });
  }

  openPromoDialog(lastPromo, shop) {
    const dialogRef = this.dialog.open(NotificationPromotionComponent, {
      width: '40%',
      height: '40%',
      data: {promotion: lastPromo, shop : shop}
    });
  }
}
