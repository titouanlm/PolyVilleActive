import { Component, OnInit } from '@angular/core';
import {nameAvailabilityType, Shop} from "../../models/shop.model";
import {ShopService} from "../../services/shop.service";

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent implements OnInit {
  public shops : Shop[];
  constructor(public shopService : ShopService) {
    this.shopService.getShopsFromUrl();
    this.shopService.shops$.subscribe((shops) =>{
      this.shops = shops;
    });
  }

  ngOnInit(): void {
  }

}
