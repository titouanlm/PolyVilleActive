import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/services/shop.service';

@Component({
  selector: 'app-shop-rating',
  templateUrl: './shop-rating.component.html',
  styleUrls: ['./shop-rating.component.scss']
})
export class ShopRatingComponent implements OnInit {

  currentRate: number;
  alreadyVoted = false;
  votersNumber: number;

  constructor(private shopService: ShopService) {
    this.shopService.shopSelected$.subscribe((shop) => this.currentRate = shop.storeRating.averageRate);
    if (this.currentRate == undefined) {
      this.currentRate = 0;
    }
  }

  ngOnInit(): void {
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
