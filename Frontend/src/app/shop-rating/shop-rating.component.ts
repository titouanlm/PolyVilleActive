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
  votersNumber: number;
  idShop: string;
  public inhabitant: Inhabitant;
  objectName: string;

  shop: Shop;
  inhabitantIsInsideShop: boolean;

  constructor(private shopService: ShopService, private inhabitantService: InhabitantService, public dialog: MatDialog) {
    this.setUpShop();
    this.initializeInhabitant();
  }

  setUpShop(){
    this.shopService.shopSelected$.subscribe((shop) =>{
      this.shop=shop;
      this.currentRate = shop.storeRating.averageRate;
      this.controlShopRate();
      this.idShop = shop.id;
      this.testInsideShop();
    });
  }

  controlShopRate() {
    if (this.currentRate == undefined) {
      this.currentRate = 0;
    }
  }

  initializeInhabitant(){
    this.inhabitantService.inhabitant$.asObservable().subscribe(
      (inhabitant) => {
        this.inhabitant = inhabitant;
        this.inhabitant = this.inhabitantService.currentInhabitant;
      }
    );
  }

  openThanksDialog(){
    const dialogRef = this.dialog.open(ThanksComponent, {
      width: '25%',
      height: '10%',
    });
  }

  inhabitantControl(){
    if (this.shop.averagePresenceBeforePurchase == undefined) {
      this.shop.averagePresenceBeforePurchase = {numberOfPurchases: 0, numberOfPresence: 0};
    }
  }

  addInhabitantAttendanceToShop(){
    if (this.inhabitant.positions != undefined) {
      this.shop.averagePresenceBeforePurchase.numberOfPresence += this.inhabitant.positions
        .filter((position) =>
          position[0] == this.inhabitant.longitude && position[1] == this.inhabitant.latitude).length;
    }
    else {
      this.inhabitant.positions = [];
      this.shop.averagePresenceBeforePurchase.numberOfPresence ++;
    }

    this.shop.averagePresenceBeforePurchase.numberOfPurchases = this.shop.averagePresenceBeforePurchase.numberOfPurchases + 1;
  }

  purchase() {
    this.openThanksDialog();
    this.inhabitantControl();
    this.addInhabitantAttendanceToShop();
    this.addItemsToInhabitant();
    this.manageInhabitantAttendance();
    this.inhabitantService.updateInhabitant(this.inhabitant);
    this.shopService.updateShop(this.shop);
    this.inhabitantService.authenticateInhabitant(this.inhabitant.id).subscribe((inhabitant) => this.inhabitant = inhabitant);
    this.objectName = undefined;
  }

  addItemsToInhabitant(){
    if (this.inhabitant.objectPurchased == undefined){
      this.inhabitant.objectPurchased = [];
    }
    const array = [];array.push(this.objectName.toString());array.push(this.idShop.toString());
    this.inhabitant.objectPurchased.push(array);

  }

  manageInhabitantAttendance(){
    this.inhabitant.positions = this.inhabitant.positions
      .filter((position) =>
        position[0] != this.inhabitant.longitude || position[1] != this.inhabitant.latitude);
  }

  ngOnInit(): void {
  }

  rateShop(){
    setTimeout(
      () => {
        if (this.inhabitantService.getShopIfNotAlreadyRatedByAnInhabitant(Number(this.shopService.shopSelected.id)) == undefined) {
          this.inhabitantService.currentInhabitant.shopRated.push(Number(this.shopService.shopSelected.id));
          this.setRateWait();
          const array = this.inhabitantService.currentInhabitant.shopRated;
          array.push(Number(this.shopService.shopSelected.id));
          this.inhabitantService.updateShopRatedByInhabitant(array);
        }
      }
      , 500);
  }

  setShopRate() {
    this.votersNumber = this.shopService.shopSelected.storeRating.voterNumber;
    this.votersNumber++;

    this.shopService.shopSelected.storeRating.averageRate = (this.shopService.shopSelected.storeRating.averageRate *
      this.shopService.shopSelected.storeRating.voterNumber +
      this.currentRate)
      /
      (this.votersNumber);

    this.shopService.shopSelected.storeRating.voterNumber++;
    this.shopService.updateShop(this.shopService.shopSelected);
  }

  getShopFromUrl(){
    this.shopService.getShopFromUrl(this.idShop);
  }

  setRateWait(){
    setTimeout(
      () => this.setShopRate()
      , 20);
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
