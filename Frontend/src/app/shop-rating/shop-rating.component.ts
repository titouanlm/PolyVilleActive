import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/services/shop.service';
import {InhabitantService} from "../../services/inhabitant.service";

@Component({
  selector: 'app-shop-rating',
  templateUrl: './shop-rating.component.html',
  styleUrls: ['./shop-rating.component.scss']
})
export class ShopRatingComponent implements OnInit {

  currentRate: number;
  alreadyVoted = false;
  votersNumber: number;

  constructor(private shopService: ShopService, private inhabitantService: InhabitantService) {
    this.shopService.shopSelected$.subscribe((shop) => this.currentRate = shop.storeRating.averageRate);
    if (this.currentRate == undefined) {
      this.currentRate = 0;
    }
  }

  ngOnInit(): void {
  }

  rateShop(){
    if (this.inhabitantService.getShopIfRatedByAnInhabitant(Number(this.shopService.shopSelected.id)) == undefined) {
      this.inhabitantService.currentInhabitant.shopRated.push(Number(this.shopService.shopSelected.id));
      this.setRateWait();
      const array = [];
      array.push(this.shopService.shopSelected.id);
      this.inhabitantService.updateInhabitant(array);
    }
  }

  setRateWait(){
    setTimeout(
      () => this.setRate()
      , 10);
  }

  setRate() {
    if (!this.alreadyVoted) {
      this.votersNumber = this.shopService.shopSelected.storeRating.voterNumber;
      this.votersNumber++;
      this.alreadyVoted = true;

      this.shopService.shopSelected.storeRating.averageRate = (this.shopService.shopSelected.storeRating.averageRate *
        this.shopService.shopSelected.storeRating.voterNumber +
        this.currentRate)
        /
        (this.votersNumber);

      this.shopService.shopSelected.storeRating.voterNumber++;
      this.shopService.updateShop(this.shopService.shopSelected);
      // créer un tableau dans user pour savoir s'il a déjà voté pour un magasin
    }
  }
}
