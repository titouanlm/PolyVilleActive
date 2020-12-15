import { Component, OnInit } from '@angular/core';
import {InhabitantService} from '../../services/inhabitant.service';
import {Inhabitant} from "../../models/inhabitant.model";
import {ShopService} from "../../services/shop.service";
import {Shop} from "../../models/shop.model";
import {PopupSellerAuthenticationComponent} from "../popup-seller-authentication/popup-seller-authentication.component";
import {MatDialog} from "@angular/material/dialog";
import {NotificationPromotionComponent} from "../notification-promotion/notification-promotion.component";
import {Promotion} from "../../models/event.model";
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

  constructor(public inhabitantService: InhabitantService, public shopService: ShopService,public autorisationService:AutorisationService, public dialog: MatDialog) {
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
