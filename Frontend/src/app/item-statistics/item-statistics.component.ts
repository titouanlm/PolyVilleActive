import { Component, OnInit } from '@angular/core';
import {ShopService} from "../../services/shop.service";
import {Inhabitant} from "../../models/inhabitant.model";
import {InhabitantService} from "../../services/inhabitant.service";

@Component({
  selector: 'app-item-statistics',
  templateUrl: './item-statistics.component.html',
  styleUrls: ['./item-statistics.component.scss'],
  providers:[ShopService],
})
export class ItemStatisticsComponent implements OnInit {

  items: string[][];
  inhabitantList: Inhabitant[];

  constructor(public shopService: ShopService, public inhabitantService: InhabitantService) {
    this.shopService.shopSelected$.subscribe((shop) => {
      this.items = shop.purchasedItems;
    });
  }

  resetItemsNumber(){
    for (let i=0; i<this.items.length;i++){
      this.items[i][1] = "0";
    }
  }

  incrementArray(array: string[][]){
    for (let p=0;p<array.length;p++){
      for (let c=0;c<this.items.length;c++){
        if (this.items[c][0] === array[p][0]){
            this.items[c][1] = (Number(this.items[c][1]) + 1).toString();
        }
      }
    }
  }

  getAll(){
    this.shopService.shopSelected$.subscribe((shop) => {
      this.items = shop.purchasedItems;
    });
  }

  getMale(){
    this.inhabitantService.getAllInhabitants().subscribe((inhabitants) =>{
      this.inhabitantList = inhabitants;
      this.resetItemsNumber();
      for (let i=0; i<this.inhabitantList.length;i++){
        if (this.inhabitantList[i].gender === "Male"
          && this.inhabitantList[i].objectPurchased != undefined
          && this.inhabitantList[i].objectPurchased.length != 0 ){
          this.incrementArray(this.inhabitantList[i].objectPurchased);
        }
      }
    });
  }

  getFemale(){
    this.inhabitantService.getAllInhabitants().subscribe((inhabitants) =>{
      this.inhabitantList = inhabitants;
      this.resetItemsNumber();
      for (let i=0; i<this.inhabitantList.length;i++){
        if (this.inhabitantList[i].gender === "Female"
          && this.inhabitantList[i].objectPurchased != undefined
          && this.inhabitantList[i].objectPurchased.length != 0 ){
          this.incrementArray(this.inhabitantList[i].objectPurchased);
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
