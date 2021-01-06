import { Component, OnInit } from '@angular/core';
import {nameAvailabilityType, Shop} from "../../models/shop.model";
import {ShopService} from "../../services/shop.service";

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent implements OnInit {

  public places : nameAvailabilityType[] = [];
  public shops : Shop[];
  constructor(public shopService : ShopService) {
    this.shopService.getShopsFromUrl();
    let test = true;
    this.shopService.shops$.subscribe((shops) =>{
      this.shops = shops;
      if(this.shops && test){
        this.shops.forEach((shop) =>{
          if(shop.parkingSpace){
            this.places = this.places.concat(shop.parkingSpace.places);
          }
        })
        test =false;
      }
    })

  }

  ngOnInit(): void {
  }

}
