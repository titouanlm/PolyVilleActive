import { Component, OnInit } from '@angular/core';
import {SellerService} from '../../services/seller.service';
import {Seller} from "../../models/seller.model";
import {ShopService} from "../../services/shop.service";
import {Shop} from "../../models/shop.model";

@Component({
  selector: 'app-seller-display',
  templateUrl: './seller-display.component.html',
  styleUrls: ['./seller-display.component.scss']
})
export class SellerDisplayComponent implements OnInit {

  public seller: Seller;

  constructor(public sellerService: SellerService) {
    this.seller=sellerService.currentSellerValue;
  }

  ngOnInit(): void {
  }

  logout() {
    this.sellerService.logout();
  }
}
