import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Shop} from '../models/shop.model';
import  {Niche} from "../models/niche.model";

@Injectable({
  providedIn: `root`
})
export class NicheService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list .
   */
  private niches: Niche[]=[];


  /**
   * Observables.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public niches$: BehaviorSubject<Niche[]> = new BehaviorSubject(this.niches);

  public niche$: Subject<Niche> = new Subject();


  private shopsUrl = serverUrl + '/shops';
  private nichesPath = 'niches';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
  }

  //............................................... Niches ..............................................


  getShopNichesFromUrl(shopId: string) {
    const url = this.shopsUrl + '/' + shopId + '/'+this.nichesPath ;
    this.http.get<Niche[]>(url).subscribe((nicheList) => {
      this.niches= nicheList;
      this.niches$.next(this.niches);
    });
  }

  getNicheFromUrl(shopId:string,nicheId: string) {
    const urlWithId = this.shopsUrl + '/' + shopId + '/'+ this.nichesPath + '/'+ nicheId;
    this.http.get<Niche>(urlWithId).subscribe((niche) => {
      this.niche$.next(niche);
    });
  }

  addEvent(niche: Niche) {
    const nicheUrl = this.shopsUrl + '/' + niche.shopId + '/' + this.nichesPath;
    this.http.post<Niche>(nicheUrl, niche, this.httpOptions).subscribe(() => this.getShopNichesFromUrl(niche.shopId+''));
  }

  deleteEvent(niche: Niche) {
    const nicheUrl = this.shopsUrl + '/' + niche.shopId + '/' + this.nichesPath +'/'+niche.id;
    this.http.delete<Niche>(nicheUrl, this.httpOptions).subscribe(() => this.getShopNichesFromUrl(niche.shopId+''));
  }

  updateEvent(shop: Shop, niche: Niche) {
    const nicheUrl = this.shopsUrl + '/' + niche.shopId + '/' + this.nichesPath +'/'+niche.id;
    this.http.put<Niche>(nicheUrl, niche, this.httpOptions).subscribe(() => this.getShopNichesFromUrl(niche.shopId+''));
  }

}
