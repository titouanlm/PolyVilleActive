import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/services/shop.service';
import {InhabitantService} from "../../services/inhabitant.service";
import {Shop} from "../../models/shop.model";
import {NotificationPromotionComponent} from "../notification-promotion/notification-promotion.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-shop-rating',
  templateUrl: './shop-rating.component.html',
  styleUrls: ['./shop-rating.component.scss']
})
export class ShopRatingComponent implements OnInit {
  currentRate: number;
  alreadyVoted = false;
  votersNumber: number;
  idshop: string;

  shop: Shop;
  inhabitantIsInsideShop: boolean;

  constructor(private shopService: ShopService, private inhabitantService: InhabitantService, public dialog: MatDialog) {
    this.shopService.shopSelected$.subscribe((shop) =>{
      this.shop=shop;
      this.currentRate = shop.storeRating.averageRate;
      this.idshop = shop.id;
      this.testInsideShop();
    });

    if (this.currentRate == undefined) {
      this.currentRate = 0;
    }
  }

  ngOnInit(): void {
  }

  rateShop(){
    if (this.inhabitantService.getShopIfRatedByAnInhabitant(Number(this.shopService.shopSelected.id)) == undefined) {
      this.inhabitantService.currentInhabitant.shopRated.push(Number(this.shopService.shopSelected.id));
      this.setRateWait();
      if (this.inhabitantService.currentInhabitant.shopRated == undefined){
        const array = [];
        array.push(Number(this.shopService.shopSelected.id));
        this.inhabitantService.updateInhabitant(array);
      }
      else {
        const array = this.inhabitantService.currentInhabitant.shopRated;
        array.push(Number(this.shopService.shopSelected.id));
        this.inhabitantService.updateInhabitant(array);
      }
    }
  }

  setShop(){
    this.shopService.getShopFromUrl(this.idshop);
  }

  setRateWait(){
    setTimeout(
      () => this.setRate()
      , 10);
  }

  setRate() {
    if (!this.alreadyVoted) {
      this.votersNumber = this.shopService.shopSelected.storeRating.voterNumber;
      this.votersNumber++;
      this.alreadyVoted = true;

      this.shopService.shopSelected.storeRating.averageRate = (this.shopService.shopSelected.storeRating.averageRate *
        this.shopService.shopSelected.storeRating.voterNumber +
        this.currentRate)
        /
        (this.votersNumber);

      this.shopService.shopSelected.storeRating.voterNumber++;
      this.shopService.updateShop(this.shopService.shopSelected);
      // créer un tableau dans user pour savoir s'il a déjà voté pour un magasin
    }
  }

  private testInsideShop() {
    this.inhabitantIsInsideShop = this.shop.longitude === this.inhabitantService.currentInhabitant.longitude && this.shop.latitude === this.inhabitantService.currentInhabitant.latitude;
  }

  moveToTheShop() {
    this.inhabitantService.changeLocation(String(this.shop.longitude), String(this.shop.latitude));
    this.inhabitantIsInsideShop = true;
    this.getPromotionShop(this.shop);
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
