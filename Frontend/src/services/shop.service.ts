import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Shop} from '../models/shop.model';
import  {Event} from "../models/event.model";
import {map} from "rxjs/operators";
import {SellerService} from "./seller.service";
import {InhabitantService} from "./inhabitant.service";

@Injectable({
  providedIn: `root`
})

export class ShopService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of shop.
   */

  public shops: Shop[];
  public shopSelected: Shop;
  /**
   * Observable which contains the list of shop.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public shops$: BehaviorSubject<Shop[]>;

  public shopSelected$: Subject<Shop> = new Subject();
  //public eventSelected$: Subject<Event> = new Subject();

  private shopsUrl = serverUrl + '/shops';
  private eventsPath = 'events';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient, private sellerService : SellerService, private inhabitantService: InhabitantService) {
    this.shops$ = new BehaviorSubject(this.shops);
    this.getShopsFromUrl();
    if(this.sellerService.currentSellerValue != null){
      this.getShopFromUrl(String(this.sellerService.currentSellerValue.shopId));
    }
  }

  getShopsFromUrl() {
    this.http.get<any>('http://localhost:9428/api/shops').subscribe(shopsList => {
      this.shops = shopsList;
      this.shops$.next(this.shops);
    });
  }

  verifyShopPosition(longitude: number, latitude: number){
    return this.http.get<Shop[]>('http://localhost:9428/api/shops').pipe(map((shopsList) => {
      return shopsList.filter( (shop) => Number(shop.longitude) == longitude && Number(shop.latitude == latitude));
    }));

  }

  addShop(shop: Shop) {
    this.http.post<Shop>(this.shopsUrl, shop, this.httpOptions).subscribe();
  }

  deleteShop(shop: Shop) {
    const urlWithId = this.shopsUrl + '/' + shop.id;
    this.http.delete<Shop>(urlWithId, this.httpOptions).subscribe();
  }

  getShopFromUrl(shopId: string) {
    const urlWithId = this.shopsUrl + '/' + shopId;
    this.http.get<Shop>(urlWithId, this.httpOptions).subscribe((shop) => {
      this.shopSelected = shop;
      this.shopSelected$.next(shop);
    });
  }

  getShop(shopId: string){
    const urlWithId = this.shopsUrl + '/' + shopId;
    return this.http.get<Shop>(urlWithId, this.httpOptions).pipe(map((shop) => {
      this.shopSelected = shop;
      this.shopSelected$.next(shop);
      return shop;
    }));
  }

  addEvent(shop: Shop, event: Event) {
    const eventUrl = this.shopsUrl + '/' + shop.id + '/' + this.eventsPath;
    this.http.post<Event>(eventUrl, event, this.httpOptions).subscribe();
  }

  deleteEvent(shop: Shop, event: Event) {
    const eventUrl = this.shopsUrl + '/' + shop.id + '/' + this.eventsPath + '/' + event.id;
    this.http.delete<Event>(eventUrl, this.httpOptions).subscribe();
  }


  updateShop(shop: Shop) {
    this.http.put<Shop>('http://localhost:9428/api/shops/' + shop.id, shop).subscribe(() => this.getShopsFromUrl());
  }

  updateEvent(shop: Shop, event: Event) {
    const eventUrl = this.shopsUrl + '/' + shop.id + '/' + this.eventsPath + '/' + event.id;
    this.http.put<Event>(eventUrl, event, this.httpOptions).subscribe();
  }

  verifyShopExist(shopName: string) {
    return this.http.post<any>('http://localhost:9428/api/shops/verify', { "label": shopName })
      .pipe(map(shop => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return shop;
      }));
  }

  getNbPeopleClose() {
    return this.inhabitantService.getInhabitantsCloseTo(this.shopSelected)
      .pipe(map(
        inhabitantsClose => {
          return inhabitantsClose.length;
        }));
  }
}
