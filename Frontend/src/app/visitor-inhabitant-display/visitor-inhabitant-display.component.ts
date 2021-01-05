import { Component, OnInit } from '@angular/core';
import {InhabitantService} from '../../services/inhabitant.service';
import {Inhabitant} from "../../models/inhabitant.model";
import {ShopService} from "../../services/shop.service";
import {Shop} from "../../models/shop.model";
import {MatDialog} from "@angular/material/dialog";
import {NotificationPromotionComponent} from "../notification-promotion/notification-promotion.component";
import {Promotion} from "../../models/event.model";
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

  /**
   * This method is used to move an inhabitant to a shop
   */

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

  /**
   * This method verifies an inhabitant authorization and in the right case, opens a dialog
   *
   * @param shop current shop
   */

  private getAutorisation(shop:Shop) {
    var autorisation=this.autorisationService.verifyAutorisationExist(shop.label, this.inhabitant.id)

    if (autorisation.length == 0)
    {
      this.openAuthorisationDialog(shop,this.inhabitant);
    }
  }

  /**
   * This method is used to open the PopupVisitorInhabitantAutorisationComponent component in a dialog
   * @param shop current shop
   * @param inhabitant current inhabitant
   */

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

  /**
   * This method is used to fetch promotions from the server and to take them into account
   *
   * @param shop current shop
   */

  private getPromotionShop(shop: Shop) {
    const promos = shop.promotions;

    if(promos.length > 0){
      this.openPromoDialog(promos , shop)
    }
  }

  /**
   * This method open the NotificationPromotionComponent component in a dialog
   *
   * @param promos current promotions
   * @param shop current shop
   */

  openPromoDialog(promos, shop) {
    const dialogRef = this.dialog.open(NotificationPromotionComponent, {
      width: '40%',
      height: '40%',
      data: {promotions: promos, shop : shop}
    });
  }
}
