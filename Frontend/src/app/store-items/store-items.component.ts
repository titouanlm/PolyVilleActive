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

  addItemsToInhabitant(){
    if (this.inhabitant.objectPurchased == undefined){
      this.inhabitant.objectPurchased = [];
    }
    const array = [];
    array.push(this.objectName.toString());
    array.push(this.shop.id.toString());
    this.inhabitant.objectPurchased.push(array);

  }

  manageInhabitantAttendance(){
    this.inhabitant.positions = this.inhabitant.positions
      .filter((position) =>
        position[0] != this.shop.longitude || position[1] != this.shop.latitude);
  }

  addPurchaseToAShop(number: number){
    this.shopService.shopSelected.purchasedItems[number][1] = (Number(this.shopService.shopSelected.purchasedItems[number][1])+1).toString();
  }

  purchase(number: number) {
    if (this.shop.purchasedItems != undefined && this.shop.purchasedItems.length != 0){
      this.objectName = this.shop.purchasedItems[number][0];
      this.openThanksDialog();
      this.inhabitantControl();
      this.addInhabitantAttendanceToShop();
      this.addItemsToInhabitant();
      this.manageInhabitantAttendance();
      this.addPurchaseToAShop(number);
      this.updateNumberfSexfAge()
      this.inhabitantService.updateInhabitant(this.inhabitant);
      this.shopService.updateShop(this.shop);
      this.inhabitantService.authenticateInhabitant(this.inhabitant.id).subscribe((inhabitant) => this.inhabitant = inhabitant);
      this.objectName = undefined;
    }
  }

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

    if (this.inhabitant.sex=="M"){
      this.shop.numberOfPurchaseBySexRang[0]+=1;
    }
    else this.shop.numberOfPurchaseBySexRang[1]+=1;

      console.log(this.shop)

  }
}
