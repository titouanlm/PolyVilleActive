import { Component, OnInit } from '@angular/core';
import {InhabitantService} from "../../services/inhabitant.service";
import {Inhabitant} from "../../models/inhabitant.model";
import {ShopService} from "../../services/shop.service";

@Component({
  selector: 'app-inhabitant-for-seller',
  templateUrl: './inhabitant-for-seller.component.html',
  styleUrls: ['./inhabitant-for-seller.component.scss']
})
export class InhabitantForSellerComponent implements OnInit {

  inhabitant: Inhabitant;
  ObjectList2: string[][];
  ObjectList;
  shopId: number;

  constructor(public inhabitantService: InhabitantService,
              public shopService: ShopService) {
    this.shopId = Number(this.shopService.shopSelected.id);
    this.inhabitant = this.inhabitantService.currentInhabitant;
    if (this.inhabitant.objectPurchased != undefined && this.inhabitant.objectPurchased.length !=0){
      this.ObjectList2 = this.inhabitant.objectPurchased.filter(
        (array) => Number(array[1]) == Number(this.shopId));
      this.ObjectList = [];
      for (let i=0;i<this.ObjectList2.length;i++){
        this.ObjectList.push(this.ObjectList2[i][0]);
      }
    }

  }

  ngOnInit(): void {
  }

}
