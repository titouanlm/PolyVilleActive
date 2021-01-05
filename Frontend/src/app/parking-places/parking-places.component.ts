import { Component, OnInit } from '@angular/core';
import {ShopService} from "../../services/shop.service";
import {interval} from "rxjs";
import {takeWhile} from "rxjs/operators";
import {Shop} from "../../models/shop.model";


@Component({
  selector: 'app-parking-places',
  templateUrl: './parking-places.component.html',
  styleUrls: ['./parking-places.component.scss'],
  providers: [ShopService],

})
export class ParkingPlacesComponent implements OnInit {
  public shop : Shop;
  public placesR;
  public placesNR;//pour les places non reservables
  public places:number[]=[];

  constructor(public shopService: ShopService)
  {

    this.shopService.shopSelected$.subscribe((shop) => {
     this.shop = shop;
      this.placesR=this.shop.parkingSpace.places;
      this.placesNR=this.shop.parkingSpace.placesUnassignable;
      console.log("Helloo");
      console.log(this.placesR);
      console.log(this.placesNR)
  });
  }

  ngOnInit(): void {

  }

  unassignable(i)
  {
    this.shop.parkingSpace.nbrPlaceFree=this.shop.parkingSpace.nbrPlaceFree-1;
    this.shop.parkingSpace.nbrPlaceUnassignable=this.shop.parkingSpace.nbrPlaceUnassignable+1;
    this.shop.parkingSpace.nbrPlaceUnassignableFree=this.shop.parkingSpace.nbrPlaceUnassignableFree+1;
    var unassignedPlace=this.shop.parkingSpace.places[i];
    console.log(unassignedPlace);
    this.shop.parkingSpace.placesUnassignable.push(unassignedPlace);
    console.log(this.shop.parkingSpace.places[i]);
    this.shop.parkingSpace.places.splice(i,1);
    console.log(this.shop.parkingSpace.places);
    this.shopService.updateShop(this.shop);
  }

  assignable(i)
  {
    this.shop.parkingSpace.nbrPlaceFree=this.shop.parkingSpace.nbrPlaceFree+1;
    this.shop.parkingSpace.nbrPlaceUnassignable=this.shop.parkingSpace.nbrPlaceUnassignable-1;
    this.shop.parkingSpace.nbrPlaceUnassignableFree=this.shop.parkingSpace.nbrPlaceUnassignableFree-1;
    var unassignedPlace=this.shop.parkingSpace.placesUnassignable[i];
    console.log(unassignedPlace);
    this.shop.parkingSpace.places.push(unassignedPlace);
    console.log(this.shop.parkingSpace.placesUnassignable[i]);
    this.shop.parkingSpace.placesUnassignable.splice(i,1);
    console.log(this.shop.parkingSpace.places);
    this.shopService.updateShop(this.shop);
  }


}
