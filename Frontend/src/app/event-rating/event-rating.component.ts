import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/services/shop.service';
import {InhabitantService} from "../../services/inhabitant.service";
import {Shop} from "../../models/shop.model";
import {NotificationPromotionComponent} from "../notification-promotion/notification-promotion.component";
import {MatDialog} from "@angular/material/dialog";
import {Inhabitant} from "../../models/inhabitant.model";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogAlertShopComponent} from "../dialog-alert-shop/dialog-alert-shop.component";
import {CulturalActor} from "../../models/culturalActor.model";
import {CulturalActorService} from "../../services/culturalActor.service";

@Component({
  selector: 'app-event-rating',
  templateUrl: './event-rating.component.html',
  styleUrls: ['./event-rating.component.scss']
})
export class EventRatingComponent implements OnInit {

  currentRate: number;
  votersNumber: number;
  idActor: string;
  idEvent: string;
  public inhabitant: Inhabitant;

  event: Event;
  inhabitantIsInsideShop: boolean;
  private name: any;

  constructor(private culturalActorService: CulturalActorService,
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
        if (!this.inhabitantService.isShopAlreadyRatedByInhabitantNumber(Number(this.shopService.shopSelected.id))) {
          this.inhabitantService.currentInhabitant.shopRated.push(Number(this.shopService.shopSelected.id));
          this.setRateWait();
          const array = this.inhabitantService.currentInhabitant.shopRated;
          array.push(Number(this.shopService.shopSelected.id));
          this.inhabitantService.updateInhabitantRating(array);
        }
      }
      , 500);
  }

  setShopRate() {
    this.votersNumber = this.shopService.shopSelected.storeRating.voterNumber +1;

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
      , 200);
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
      height: '50%',
      data: {promotions: promos, shop : shop}
    });
  }
}
