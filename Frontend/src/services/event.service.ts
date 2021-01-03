import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, pipe, Subject} from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Shop} from '../models/shop.model';
import  {Event,Promotion} from "../models/event.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: `root`
})
export class EventService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list .
   */
  private events: Event[];
  private promotions: Promotion[];
  private notifications: Notification[];

  /**
   * Observables.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public events$: BehaviorSubject<Event[]>;
  public promotions$: BehaviorSubject<Promotion[]>;
  public notifications$: BehaviorSubject<Notification[]>;

  public event$: Subject<Event> = new Subject();
  public promotion$: Subject<Promotion> = new Subject();
  public notification$: Subject<Notification> = new Subject();

  private shopsUrl = serverUrl + '/shops';
  private eventsPath = 'events';
  private promosPath = 'promotions';
  private notifsPath = 'notifications';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
  this.events$ = new BehaviorSubject(this.events);
  this.promotions$ = new BehaviorSubject(this.promotions);
  this.notifications$ = new BehaviorSubject(this.notifications);
  }

  //............................................... Events ..............................................


  getShopEventsFromUrl(shopId: string) {
    const url = this.shopsUrl + '/' + shopId +'/'+ this.eventsPath ;
    return this.http.get<Event[]>(url).subscribe((eventList) => {
      this.events = eventList;
      this.events$.next(this.events);
    });
  }

  getEventFromUrl(shopId:string,eventId: string) {
    const urlWithId = this.shopsUrl + '/' + shopId + '/'+this.eventsPath + '/'+ eventId;
    return this.http.get<Event>(urlWithId).
    pipe(map((event) => {
      return event;
    }));

  }


  addEvent(event: Event) {
    const eventUrl = this.shopsUrl + '/' + event.shopId + '/' + this.eventsPath;
    return this.http.post<Event>(eventUrl, event, this.httpOptions)
      .pipe(map(EventCreated => {
      this.getShopEventsFromUrl(event.shopId+'');
      return EventCreated;
    } ));
  }

  deleteEvent(event: Event) {
    const eventUrl = this.shopsUrl + '/' + event.shopId + '/' + this.eventsPath +'/'+event.id;
    this.http.delete<Event>(eventUrl, this.httpOptions).subscribe(() => this.getShopEventsFromUrl(event.shopId+''));
  }

  updateEvent(shop: Shop, event: Event) {
    const eventUrl = this.shopsUrl + '/' + event.shopId + '/' + this.eventsPath +'/'+event.id;
    this.http.put<Event>(eventUrl, event, this.httpOptions).subscribe(() => this.getShopEventsFromUrl(event.shopId+''));
  }

  //............................................... Promotions ..............................................


  getPromotions(shopId:string,eventId: string) {
    const url = this.shopsUrl + '/' + shopId + '/'+this.eventsPath + '/'+ eventId + '/'+this.promosPath ;
    this.http.get<Promotion[]>(url).subscribe((promos) => {
      this.promotions=promos;
      this.promotions$.next(promos);
    });
  }

  getEvent(shopId:string,eventtitle:string)
  {
    const url = this.shopsUrl + '/' + shopId +'/'+ this.eventsPath ;
    return this.events.filter((event) => event.title === eventtitle)
  }

  getPromotion(shopId:string,eventId: string,promoId: string) {
    const urlWithId = this.shopsUrl + '/' + shopId +'/'+ this.eventsPath + '/'+ eventId + '/'+this.promosPath +'/'+promoId ;
    this.http.get<Promotion>(urlWithId).subscribe((promo) => {
      this.promotion$.next(promo);
    });
  }

  addPromotion(shopId:string,eventId: string,promo: Promotion) {
    const url = this.shopsUrl + '/' + shopId + '/'+this.eventsPath + '/'+ eventId + '/'+this.promosPath ;
    return this.http.post<Promotion>(url,promo, this.httpOptions).
      pipe(map(promoCreated => {
      this.getPromotions(shopId, eventId);
      return promoCreated;
    } ));

    //subscribe(() => this.getEventFromUrl(shopId,eventId));
  }

  updatePromotion(shopId:string, eventId: string, promo: Promotion) {
    const url = this.shopsUrl + '/' + shopId + this.eventsPath + '/'+ eventId + '/'+this.promosPath +'/'+ promo.id ;
    this.http.put<Promotion>(url,promo, this.httpOptions).subscribe(() => this.getEventFromUrl(shopId,eventId));
  }

}
