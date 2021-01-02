import { Component, OnInit } from '@angular/core';
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

  constructor(private shopService: ShopService,
              private inhabitantService: InhabitantService,
              public dialog: MatDialog) {
    this.shop = shopService.shopSelected;
    this.inhabitant = inhabitantService.currentInhabitant;
    this.items = this.shop.availableItems;
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
        position[0] != this.inhabitant.longitude || position[1] != this.inhabitant.latitude);
  }

  purchase(number: number) {
    this.objectName = this.shop.availableItems[number];
    if (this.objectName != undefined){
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

  }

}
