import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Seller} from "../models/seller.model";

@Injectable({
  providedIn: 'root'
})

export class SellerService {

  public sellerUrl =  'http://localhost:9428/api/sellers/';

  public currentSeller: Seller;

  public sellerId: number;

  constructor(private http: HttpClient) { }

  getSeller(sellerId: number){
    this.http.get<Seller>(this.sellerUrl + sellerId).subscribe((object) => {
      this.currentSeller = object;
      return this.currentSeller;
    });
    return null;
  }

}
