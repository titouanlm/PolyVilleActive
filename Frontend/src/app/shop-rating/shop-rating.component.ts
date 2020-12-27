import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/services/shop.service';
import {InhabitantService} from "../../services/inhabitant.service";
import {Shop} from "../../models/shop.model";
import {NotificationPromotionComponent} from "../notification-promotion/notification-promotion.component";
import {MatDialog} from "@angular/material/dialog";
import {ThanksComponent} from "../thanks/thanks.component";
import {Inhabitant} from "../../models/inhabitant.model";

@Component({
  selector: 'app-shop-rating',
  templateUrl: './shop-rating.component.html',
  styleUrls: ['./shop-rating.component.scss']
})
export class ShopRatingComponent implements OnInit {

  currentRate: number;
  alreadyVoted = false;
  votersNumber: number;
  idShop: string;
  public inhabitant: Inhabitant;
  objectName: string;

  shop: Shop;
  inhabitantIsInsideShop: boolean;

  constructor(private shopService: ShopService, private inhabitantService: InhabitantService, public dialog: MatDialog) {
    console.log(this.inhabitantService.currentInhabitant)
    this.shopService.shopSelected$.subscribe((shop) =>{
      this.shop=shop;
      this.currentRate = shop.storeRating.averageRate;
      this.idShop = shop.id;
      this.testInsideShop();
    });
    this.inhabitantService.inhabitant$.asObservable().subscribe(
      (inhabitant) => {
        this.inhabitant = inhabitant;
        this.inhabitant = this.inhabitantService.currentInhabitant;
      }

    );
    if (this.currentRate == undefined) {
      this.currentRate = 0;
    }
  }

  achat() {
    const dialogRef = this.dialog.open(ThanksComponent, {
      width: '25%',
      height: '10%',
    });
    if (this.shop.averagePresenceBeforePurchase == undefined) {
      this.shop.averagePresenceBeforePurchase = {numberOfPurchases: 0, numberOfPresence: 0};
    }
    this.shop.averagePresenceBeforePurchase.numberOfPurchases = this.shop.averagePresenceBeforePurchase.numberOfPurchases + 1;
    if (this.inhabitant.positions != undefined) {
      this.shop.averagePresenceBeforePurchase.numberOfPresence += this.inhabitant.positions
        .filter((position) =>
          position[0] == this.inhabitant.longitude && position[1] == this.inhabitant.latitude).length;
    }
    else {
      this.inhabitant.positions = [];
      this.shop.averagePresenceBeforePurchase.numberOfPresence ++;
    }

    this.addItemsToInhabitantAndManagePositions();

    this.shopService.updateShop(this.shop);
    this.inhabitantService.authenticateInhabitant(this.inhabitant.id).subscribe((inhabitant) => this.inhabitant = inhabitant);
  }

  addItemsToInhabitantAndManagePositions(){
    if (this.inhabitant.objectPurchased == undefined){
      this.inhabitant.objectPurchased = [];
    }
    const array = [];
    array.push(this.objectName.toString());
    array.push(this.idShop.toString());
    this.inhabitant.objectPurchased.push(array);
    this.inhabitantService.updateInhabitant(this.inhabitant);
    this.objectName = undefined;
    const array2  = this.inhabitant.positions
      .filter((position) =>
        position[0] != this.inhabitant.longitude || position[1] != this.inhabitant.latitude);
    this.inhabitantService.updateInhabitantPositions(array2);
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
        this.inhabitantService.updateShopRatedByInhabitant(array);
      }
      else {
        const array = this.inhabitantService.currentInhabitant.shopRated;
        array.push(Number(this.shopService.shopSelected.id));
        this.inhabitantService.updateShopRatedByInhabitant(array);
      }
    }
  }

  setShop(){
    this.shopService.getShopFromUrl(this.idShop);
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
