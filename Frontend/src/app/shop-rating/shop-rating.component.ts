import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/services/shop.service';
import {InhabitantService} from "../../services/inhabitant.service";
import {Shop} from "../../models/shop.model";
import {NotificationPromotionComponent} from "../notification-promotion/notification-promotion.component";
import {MatDialog} from "@angular/material/dialog";
import {Inhabitant} from "../../models/inhabitant.model";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogAlertShopComponent} from "../dialog-alert-shop/dialog-alert-shop.component";
import {PopupVisitorInhabitantAutorisationComponent} from "../popup-visitor-inhabitant-autorisation/popup-visitor-inhabitant-autorisation.component";
import {AutorisationService} from "../../services/autorisation.service";

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
  error: string;
  shop: Shop;
  shopName: string;
  inhabitantIsInsideShop: boolean;
  private name: any;

  constructor(private shopService: ShopService,
              private inhabitantService: InhabitantService,
              public autorisationService:AutorisationService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,) {
    this.setUpShop();
    this.shopName='';
    this.initializeInhabitant();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
    });
  }

  /**
   * This method either allow the seller to go further in the application or display a dialog depending on whether or not there is
   * at least an item in the shop
   *
   */

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

  /**
   * Initialize data to be displayed on the front page
   */

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

  /**
   * Fetch the current from the InhabitantService
   */

  initializeInhabitant(){
    this.inhabitantService.inhabitant$.asObservable().subscribe(
      (inhabitant) => {
        this.inhabitant = inhabitant;
        this.inhabitant = this.inhabitantService.currentInhabitant;
      }
    );
  }

  /**
   * This method is used to calculate the new rate of a shop, to mark an inhabitant has rated the shop and to send the new data to the server
   */

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

  /**
   * This method is used to calculate the rate of a shop
   */

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

  /**
   * This method is used to delay the new rate of a shop
   */

  setRateWait(){
    setTimeout(
      () => this.setShopRate()
      , 200);
  }

  private testInsideShop() {
    this.inhabitantIsInsideShop = this.shop.longitude === this.inhabitantService.currentInhabitant.longitude && this.shop.latitude === this.inhabitantService.currentInhabitant.latitude;
  }

  logout() {
    this.inhabitantService.logout();
  }

  /**
   * This method is use to verify if an inhabitant got an authorization
   *
   * @param shop shop selected
   */

  private getAutorisation(shop:Shop) {
    var autorisation=this.autorisationService.verifyAutorisationExist(shop.label, this.inhabitant.id);

    if (autorisation.length == 0) {
      this.openAuthorisationDialog(shop,this.inhabitant);
    }
  }

  /**
   * This method is used to open the PopupVisitorInhabitantAutorisationComponent component in a dialog
   *
   * @param shop the current shop to which one an inhabitant is looking for
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
   *
   * This method is used to display shop promotions in a dialog
   *
   * @param shop the shop selected
   */

  private getPromotionShop(shop: Shop) {
    const promos = shop.promotions;

    if(promos.length > 0){
      this.openPromoDialog(promos , shop)
    }
  }

  /**
   * This method is used to open the NotificationPromotionComponent component in a dialog
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

  /**
   * This method is used to move an inhabitant to a shop
   */

  moveToTheShop() {
    this.inhabitantService.changeLocation(String(this.shop.longitude), String(this.shop.latitude));
    this.inhabitantIsInsideShop = true;
    this.getAutorisation(this.shop)
          var autorisation=this.autorisationService.verifyAutorisationExist(this.shop.label, this.inhabitant.id)
          if(autorisation.length!=0)
          {this.getPromotionShop(this.shop);}

  }

}
