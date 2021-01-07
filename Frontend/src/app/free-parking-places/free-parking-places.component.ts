import { Component, OnInit } from '@angular/core';
import {ShopService} from "../../services/shop.service";
import {interval} from "rxjs";
import {takeWhile} from "rxjs/operators";
import {Shop} from "../../models/shop.model";


@Component({
  selector: 'app-free-parking-places',
  templateUrl: './free-parking-places.component.html',
  styleUrls: ['./free-parking-places.component.scss'],
  providers: [ShopService],

})
export class FreeParkingPlacesComponent implements OnInit {
  public shop : Shop;

  public shopList:Shop[];

  constructor(public shopService: ShopService)
  {
    this.shopService.getShopsFromUrl();
    this.shopService.shops$.subscribe((shops) =>
    { this.shopList = shops;
      console.log("Haha");
      console.log(this.shopList);});
  }

  ngOnInit(): void {

  }

}
