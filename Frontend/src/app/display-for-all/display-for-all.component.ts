import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupVisitorInhabitantAuthenticationComponent } from '../popup-visitor-inhabitant-authentication/popup-visitor-inhabitant-authentication.component';
import { Router } from '@angular/router';
import {InhabitantService} from "../../services/inhabitant.service";
import {PopupSellerAuthenticationComponent} from "../popup-seller-authentication/popup-seller-authentication.component";
import {SellerService} from "../../services/seller.service";

export interface DialogData {
  number: number;
}

@Component({
  selector: 'app-display-for-all',
  templateUrl: './display-for-all.component.html',
  styleUrls: ['./display-for-all.component.scss']
})
export class DisplayForAllComponent implements OnInit {

  number: number;

  constructor(public dialog: MatDialog, private router: Router, public inhabitantService: InhabitantService,
              public sellerService: SellerService,) { }

  openInhabitantsDialog() {
    const dialogRef = this.dialog.open(PopupVisitorInhabitantAuthenticationComponent, {
      width: '18%',
      height: '26%',
    });
  }

  openSellersDialog() {
    const dialogRef = this.dialog.open(PopupSellerAuthenticationComponent, {
      width: '18%',
      height: '26%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.number = result;
      const seller = this.sellerService.getSeller(this.number);
      if (this.number != null /*&& Seller != null*/) {
        this.sellerService.sellerId = this.number;
        this.sellerService.currentSeller = seller;
        this.router.navigate(['seller']);
      }
    });
  }

  ngOnInit(): void {
  }

}
