import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import  {Promotion} from "../models/event.model";

@Injectable({
  providedIn: `root`
})
export class PromotionService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list .
   */
  private promotions: Promotion[];

  /**
   * Observables.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public promotions$: BehaviorSubject<Promotion[]> = new BehaviorSubject(this.promotions);

  public promotion$: Subject<Promotion> = new Subject();

  private Url = serverUrl + '/promotions';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.getPromotions()
  }


  //............................................... Promotions ..............................................


  getPromotions() {
    this.http.get<Promotion[]>(this.Url).subscribe((promos) => {
      this.promotions=promos;
      this.promotions$.next(promos);
    });
  }

  getPromotion(promoId: string) {
    const urlWithId = this.Url+'/'+promoId ;
    this.http.get<Promotion>(urlWithId,this.httpOptions).subscribe((promo) => {
      this.promotion$.next(promo);
    });
  }

  addPromotion(promo: Promotion) {
    this.http.post<Promotion>(this.Url,promo,this.httpOptions).subscribe(() => this.getPromotions());
  }

  updatePromotion(promo: Promotion) {
    const url = this.Url + '/' + promo.id ;
    this.http.put<Promotion>(url,promo,this.httpOptions).subscribe(() => this.getPromotions());
  }

}
