import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {httpOptionsBase} from '../configs/server.config';
import {Promotion} from "../models/event.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: `root`
})
export class PromotionService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  private promotions: Promotion[];
  public promotions$: BehaviorSubject<Promotion[]>;

  public promotion$: Subject<Promotion> = new Subject();

  private Url : string;
  private httpOptions = httpOptionsBase;
  //private currentSeller : Seller;
  constructor(private http: HttpClient) {
    //this.currentSeller = JSON.parse(localStorage.getItem('currentSeller'));
    this.promotions$ = new BehaviorSubject(this.promotions);
    //this.Url = serverUrl + '/shops/' + this.currentSeller.shopId +'/promotions';
    //this.getPromotions()
  }


  //............................................... Promotions ..............................................

  getPublicPromotions(){
    return this.http.get<Promotion[]>('http://localhost:9428/api/promotions').pipe(map((promos) => {
      return promos.filter(promotion => promotion.public == true);
    }));
  }

  getPromotions() {
    this.http.get<Promotion[]>('http://localhost:9428/api/promotions').subscribe((promos) => {
      this.promotions=promos;
      this.promotions$.next(promos);
    });
  }

  getPromotion(promoId: number) {
    return this.http.get<Promotion>('http://localhost:9428/api/promotions/'+promoId,this.httpOptions)
      .pipe(map((promotion) => {
      return promotion;
    }));
  }

  addPromotion(promo: Promotion) {
    return this.http.post<Promotion>(this.Url,promo,this.httpOptions)
      .pipe(map(promoCreated => {
        this.getPromotions();
        return promoCreated;
      } ));
  }

  updatePromotion(promo: Promotion) {
    const url = 'http://localhost:9428/api/promotions' + '/' + promo.id ;
    this.http.put<Promotion>(url,promo,this.httpOptions).subscribe();
  }

}
