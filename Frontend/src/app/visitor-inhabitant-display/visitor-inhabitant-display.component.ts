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
  promotions: Promotion[];
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

  shopId: number;
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


  move() {

    this.shopService.verifyShopExist(this.shopName)
      .subscribe(
        shop => {
            this.error = '';
            this.inhabitantService.changeLocation(shop.longitude, shop.latitude);
            this.inhabitant.latitude = Number(shop.latitude);
            this.inhabitant.longitude = Number(shop.longitude);
            this.getAutorisation(shop)
          var autorisation=this.autorisationService.verifyAutorisationExist(shop.label, this.inhabitant.id)
          if(autorisation.length!=0)
          {this.getPromotionShop(shop);}

        },
        error => {
          this.error = 'Unknown shop.';
        });
  }

  logout() {
    this.inhabitantService.logout();
  }



  private getAutorisation(shop:Shop)
  {
    var autorisation=this.autorisationService.verifyAutorisationExist(shop.label, this.inhabitant.id)

    if (autorisation.length == 0)
    {
      this.openAuthorisationDialog(shop,this.inhabitant);
    }
  }

  openAuthorisationDialog(shop,inhabitant) {
    const dialogRef = this.dialog.open(PopupVisitorInhabitantAutorisationComponent, {
      width: '40%',
      height: '40%',
      data: {inhabitant: inhabitant, shop: shop}
    });

    dialogRef.afterClosed().subscribe(
      result=>{
        if(result=='true')
        {
          this.getPromotionShop(shop)
        }
      }
    )
  }

  private getPromotionShop(shop: Shop) {
    const promos = shop.promotions;

    if(promos.length > 0){
      this.openPromoDialog(promos , shop)
    }
  }


  openPromoDialog(promos, shop) {
    const dialogRef = this.dialog.open(NotificationPromotionComponent, {
      width: '40%',
      height: '40%',
      data: {promotions: promos, shop : shop}
    });
  }
}
