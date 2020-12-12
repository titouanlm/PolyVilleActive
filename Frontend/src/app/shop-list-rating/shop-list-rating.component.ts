import { Component, OnInit } from '@angular/core';
import {ShopService} from "../../services/shop.service";
import {Shop} from "../../models/shop.model";

@Component({
  selector: 'app-shop-rating',
  templateUrl: './shop-list-rating.component.html',
  styleUrls: ['./shop-list-rating.component.scss']
})
export class ShopListRatingComponent implements OnInit {

  public shopList: Shop[];

  constructor(public shopService: ShopService) {
    this.shopService.getShopsFromUrl();
    this.shopService.shops$.subscribe((shops) => this.shopList = shops);
  }

  ngOnInit(): void {
  }

  setShop(number){
    this.shopService.getShopFromUrl(this.shopList[number].id);
  }

}
