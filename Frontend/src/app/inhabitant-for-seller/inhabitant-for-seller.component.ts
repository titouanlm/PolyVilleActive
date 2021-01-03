import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {InhabitantService} from "../../services/inhabitant.service";
import {Inhabitant} from "../../models/inhabitant.model";
import {ShopService} from "../../services/shop.service";
import {NavigationEnd, Router} from "@angular/router";
import {interval} from "rxjs";
import {takeWhile} from "rxjs/operators";

@Component({
  selector: 'app-inhabitant-for-seller',
  templateUrl: './inhabitant-for-seller.component.html',
  styleUrls: ['./inhabitant-for-seller.component.scss'],
  providers:[ShopService],
})
export class InhabitantForSellerComponent implements OnInit, OnDestroy, OnChanges{

  inhabitant: Inhabitant;
  ObjectList2: string[][];
  ObjectList;
  shopId: number;

  constructor(public inhabitantService: InhabitantService,
              public shopService: ShopService) {
    this.shopService.shopSelected$.subscribe((shop) => {
      this.shopId = Number(shop.id);
      this.inhabitantService.inhabitant$.asObservable().subscribe((inhabitant) =>{
        this.inhabitant = inhabitant;
        if (this.inhabitant.objectPurchased != undefined && this.inhabitant.objectPurchased.length !=0){
          this.ObjectList2 = this.inhabitant.objectPurchased.filter(
            (array) => Number(array[1]) == Number(this.shopId));
          this.ObjectList = [];
          for (let i=0;i<this.ObjectList2.length;i++){
            this.ObjectList.push(this.ObjectList2[i][0]);
          }
        }
      });
    });


  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
