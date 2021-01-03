import { Component, OnInit } from '@angular/core';
import {ShopService} from "../../services/shop.service";

@Component({
  selector: 'app-item-statistics',
  templateUrl: './item-statistics.component.html',
  styleUrls: ['./item-statistics.component.scss']
})
export class ItemStatisticsComponent implements OnInit {

  items: string[][];

  constructor(public shopService: ShopService) {
    this.items = shopService.shopSelected.purchasedItems;
  }

  ngOnInit(): void {
  }

}
