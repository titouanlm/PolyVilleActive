import { Component, OnInit } from '@angular/core';
import {ShopService} from "../../services/shop.service";
import {Shop} from "../../models/shop.model";

@Component({
  selector: 'app-shop-rating',
  templateUrl: './shop-rating.component.html',
  styleUrls: ['./shop-rating.component.scss']
})
export class ShopRatingComponent implements OnInit {

  public shopList: Shop[];

  constructor(public shopService: ShopService) {
    this.shopService.getShopsFromUrl();
    this.shopService.shops$.subscribe((shops) => this.shopList = shops);
  }

  ngOnInit(): void {
  }

}
