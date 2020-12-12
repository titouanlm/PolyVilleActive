import { Component, OnInit } from '@angular/core';
import {Shop} from "../../models/shop.model";
import {ShopService} from "../../services/shop.service";
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-shop-information',
  templateUrl: './shop-information.component.html',
  styleUrls: ['./shop-information.component.scss'],
  providers:[ShopService],

})
export class ShopInformationComponent implements OnInit {

  public shop : Shop;
  public nbPeopleClose: number;
  public shopRate: number;

  constructor(public shopService: ShopService) {
    this.shopService.shopSelected$.subscribe((shop) => {
      this.shop = shop;
      if ( this.shop != undefined
        && this.shop.storeRating != undefined
        && this.shop.storeRating.voterNumber !=0){
        this.shopRate = this.shop.storeRating.averageRate;
      }
      this.calculateNbPeopleClose();
    });
  }

  ngOnInit(): void {
    interval(30000)
      .pipe(takeWhile(() => true))
      .subscribe(() => {
        this.calculateNbPeopleClose();
      });
  }

  private calculateNbPeopleClose() {
    this.shopService.getNbPeopleClose()
      .subscribe(nb => this.nbPeopleClose = nb);
  }
}
