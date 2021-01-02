import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/services/shop.service';
import {InhabitantService} from "../../services/inhabitant.service";
import {Shop} from "../../models/shop.model";
import {NotificationPromotionComponent} from "../notification-promotion/notification-promotion.component";
import {MatDialog} from "@angular/material/dialog";
import {ThanksComponent} from "../thanks/thanks.component";
import {Inhabitant} from "../../models/inhabitant.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PopupVisitorInhabitantAutorisationComponent} from "../popup-visitor-inhabitant-autorisation/popup-visitor-inhabitant-autorisation.component";
import {DialogAlertShopComponent} from "../dialog-alert-shop/dialog-alert-shop.component";

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

  shop: Shop;
  inhabitantIsInsideShop: boolean;
  private name: any;

  constructor(private shopService: ShopService,
              private inhabitantService: InhabitantService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,) {
    this.setUpShop();
    this.initializeInhabitant();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
    });
  }

  UponClicking(){
    if (this.shop.purchasedItems != undefined && this.shop.purchasedItems.length != 0){
      this.router.navigate(['items'], { relativeTo: this.route });
    }
    else {
      const dialogRef = this.dialog.open(DialogAlertShopComponent, {
        width: '20%',
        height: '15%',
        role: "alertdialog",
      });
    }
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
