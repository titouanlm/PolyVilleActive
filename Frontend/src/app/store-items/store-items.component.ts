import {Component, OnInit} from '@angular/core';
import {ShopService} from "../../services/shop.service";
import {InhabitantService} from "../../services/inhabitant.service";
import {ThanksComponent} from "../thanks/thanks.component";
import {MatDialog} from "@angular/material/dialog";
import {Shop} from "../../models/shop.model";
import {Inhabitant} from "../../models/inhabitant.model";

@Component({
  selector: 'app-store-items',
  templateUrl: './store-items.component.html',
  styleUrls: ['./store-items.component.scss']
})
export class StoreItemsComponent implements OnInit {

  shop: Shop;
  inhabitant: Inhabitant;
  objectName;
  items;
  shops: Shop[];
  inhabitants: Inhabitant[];

  /**
   * The constructor initialize the page by fetching inhabitants data and shops data from the server
   *
   * @param shopService
   * @param inhabitantService
   * @param dialog the tool which is used to open dialog
   */

  constructor(private shopService: ShopService,
              private inhabitantService: InhabitantService,
              public dialog: MatDialog) {
    this.shop = shopService.shopSelected;
    this.inhabitant = inhabitantService.currentInhabitant;
    this.items = this.shop.purchasedItems;
    shopService.getShopsFromUrl();
    shopService.shops$.subscribe(shopList =>{
      this.shops=shopList;
    });
    inhabitantService.getInhabitantsFromUrl();
    inhabitantService.inhabitants$.subscribe(Ilist =>{
      this.inhabitants=Ilist;
    })
  }

  ngOnInit(): void {
  }

  /**
   * This method is used to open the ThanksComponent component in a dialog
   */

  openThanksDialog(){
    const dialogRef = this.dialog.open(ThanksComponent, {
      width: '25%',
      height: '10%',
    });
  }

  /**
   * This method is used to create an object in a inhabitant if not already done
   */

  inhabitantControl(){
    if (this.shop.averagePresenceBeforePurchase == undefined) {
      this.shop.averagePresenceBeforePurchase = {numberOfPurchases: 0, numberOfPresence: 0};
    }
  }

  /**
   * This method is used to add inhabitant attendance to the shop
   */

  addInhabitantAttendanceToShop(){
    if (this.inhabitant.positions != undefined) {
      let count = this.inhabitant.positions
        .filter((position) =>
          position[0] == this.shop.longitude && position[1] == this.shop.latitude).length;
      this.shop.averagePresenceBeforePurchase.numberOfPresence += (count >=1 ? count : 1);
      console.log(count);
    }
    else {
      this.inhabitant.positions = [];
      this.shop.averagePresenceBeforePurchase.numberOfPresence++;
    }
    this.shop.averagePresenceBeforePurchase.numberOfPurchases++;
  }

  /**
   * This method is used to push items in a inhabitant
   */

  addItemsToInhabitant(){
    if (this.inhabitant.objectPurchased == undefined){
      this.inhabitant.objectPurchased = [];
    }
    const array = [];
    array.push(this.objectName.toString());
    array.push(this.shop.id.toString());
    this.inhabitant.objectPurchased.push(array);

  }

  /**
   * This method is used to recalculate an inhabitant attendance after taking into account his positions
   */

  manageInhabitantAttendance(){
    this.inhabitant.positions = this.inhabitant.positions
      .filter((position) =>
        position[0] != this.shop.longitude || position[1] != this.shop.latitude);
  }

  addPurchaseToAShop(number: number){
    this.shopService.shopSelected.purchasedItems[number][1] = (Number(this.shopService.shopSelected.purchasedItems[number][1])+1).toString();
  }

  /**
   * Add an item to inhabitant, take into account consequences to a shop and push the whole into the server
   *
   * @param number number of an inhabitant
   */

  purchase(number: number) {
    if (this.shop.purchasedItems != undefined && this.shop.purchasedItems.length != 0){
      this.objectName = this.shop.purchasedItems[number][0];
      this.openThanksDialog();
      this.inhabitantControl();
      this.addInhabitantAttendanceToShop();
      this.addItemsToInhabitant();
      this.manageInhabitantAttendance();
      this.addPurchaseToAShop(number);
      this.updateNumberfSexfAge();
      this.manageParkingReservation();
      this.inhabitantService.updateInhabitant(this.inhabitant);
      this.shopService.updateShop(this.shop);
      this.inhabitantService.authenticateInhabitant(this.inhabitant.id).subscribe((inhabitant) => this.inhabitant = inhabitant);
      this.objectName = undefined;
    }
  }

  /**
   * This method is used to make free a reservation after a purchased item if an inhabitant has a reservation
   */

  manageParkingReservation(){
    if (this.inhabitant.currentReservation != undefined
      && this.inhabitant.currentReservation.price != undefined
      && this.inhabitant.currentReservation.shopId == Number(this.shop.id)){
      this.inhabitant.currentReservation.price = 0;
    }

  }

  /**
   * This method is used to take into account the item purchasing inhabitant age
   */

  updateNumberfSexfAge(){
    //0-14,15-29,30-44,45-59,60-74,75
    if (this.inhabitant.age<15 && this.inhabitant.age>-1)
      this.shop.numberOfPurchaseByAgeRang[0]+=1;

    if (this.inhabitant.age<30 && this.inhabitant.age>14)
      this.shop.numberOfPurchaseByAgeRang[1]+=1;

    if (this.inhabitant.age<45 && this.inhabitant.age>29)
      this.shop.numberOfPurchaseByAgeRang[2]+=1;

    if (this.inhabitant.age<60 && this.inhabitant.age>44)
      this.shop.numberOfPurchaseByAgeRang[3]+=1;

    if (this.inhabitant.age<75 && this.inhabitant.age>59)
      this.shop.numberOfPurchaseByAgeRang[4]+=1;

    if (this.inhabitant.age>74)
      this.shop.numberOfPurchaseByAgeRang[5]+=1;

    if (this.inhabitant.gender=="Male"){
      this.shop.numberOfPurchaseBySexRang[0]+=1;
    }
    else this.shop.numberOfPurchaseBySexRang[1]+=1;

      console.log(this.shop)
  }
}
