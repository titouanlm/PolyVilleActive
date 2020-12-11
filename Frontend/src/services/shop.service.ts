import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Shop} from '../models/shop.model';
import  {Event} from "../models/event.model";
import {map} from "rxjs/operators";

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
  private shops: Shop[];

  /**
   * Observable which contains the list of shop.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public shops$: BehaviorSubject<Shop[]> ;

  public shopSelected$: Subject<Shop> = new Subject();
  //public eventSelected$: Subject<Event> = new Subject();

  private shopsUrl = serverUrl + '/shops';
  private eventsPath = 'events';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.shops$ = new BehaviorSubject(this.shops);
    this.getShopsFromUrl();
  }

  getShopsFromUrl() {
    this.http.get<Shop[]>(this.shopsUrl).subscribe((shopsList) => {
      this.shops = shopsList;
      this.shops$.next(this.shops);
    });
  }

  addShop(shop: Shop) {
    this.http.post<Shop>(this.shopsUrl, shop, this.httpOptions).subscribe(() => this.getShopsFromUrl());
  }

  deleteShop(shop: Shop) {
    const urlWithId = this.shopsUrl + '/' + shop.id;
    this.http.delete<Shop>(urlWithId, this.httpOptions).subscribe(() => this.getShopsFromUrl());
  }

  getShopFromUrl(shopId: string) {
    const urlWithId = this.shopsUrl + '/' + shopId;
    this.http.get<Shop>(urlWithId, this.httpOptions).subscribe((shop) => {
      this.shopSelected$.next(shop);
    });
  }

  addEvent(shop: Shop, event: Event) {
    const eventUrl = this.shopsUrl + '/' + shop.id + '/' + this.eventsPath;
    this.http.post<Event>(eventUrl, event, this.httpOptions).subscribe(() => this.getShopFromUrl(shop.id));
  }

  deleteEvent(shop: Shop, event: Event) {
    const eventUrl = this.shopsUrl + '/' + shop.id + '/' + this.eventsPath + '/' + event.id;
    this.http.delete<Event>(eventUrl, this.httpOptions).subscribe(() => this.getShopFromUrl(shop.id));
  }


  updateShop(shop: Shop) {
    const shopUrl = this.shopsUrl + '/' + shop.id ;
    this.http.put<Event>(shopUrl, shop, this.httpOptions).subscribe(() => this.getShopsFromUrl());
  }

  updateEvent(shop: Shop, event: Event) {
    const eventUrl = this.shopsUrl + '/' + shop.id + '/' + this.eventsPath + '/' + event.id;
    this.http.put<Event>(eventUrl, event, this.httpOptions).subscribe(() => this.getShopFromUrl(shop.id));
  }

  verifyShopExist(shopName: string) {
    return this.http.post<any>('http://localhost:9428/api/shops/verify', { "label": shopName })
      .pipe(map(shop => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return shop;
      }));
  }

}
