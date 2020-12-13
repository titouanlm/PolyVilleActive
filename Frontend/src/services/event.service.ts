import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Shop} from '../models/shop.model';
import  {Event,Promotion,Notification} from "../models/event.model";

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
  public events$: BehaviorSubject<Event[]> = new BehaviorSubject(this.events);
  public promotions$: BehaviorSubject<Promotion[]> = new BehaviorSubject(this.promotions);
  public notifications$: BehaviorSubject<Notification[]> = new BehaviorSubject(this.notifications);

  public event$: Subject<Event> = new Subject();
  public promotion$: Subject<Promotion> = new Subject();
  public notification$: Subject<Notification> = new Subject();

  private shopsUrl = serverUrl + '/shops';
  private eventsPath = 'events';
  private promosPath = 'promotions';
  private notifsPath = 'notifications';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
  }

  //............................................... Events ..............................................


  getShopEventsFromUrl(shopId: string) {
    const url = this.shopsUrl + '/' + shopId +'/'+ this.eventsPath ;
    this.http.get<Event[]>(url).subscribe((eventList) => {
      this.events = eventList;
      this.events$.next(this.events);
    });
  }

  getEventFromUrl(shopId:string,eventId: string) {
    const urlWithId = this.shopsUrl + '/' + shopId + '/'+this.eventsPath + '/'+ eventId;
    this.http.get<Event>(urlWithId).subscribe((event) => {
      this.event$.next(event);
    });
  }

  addEvent(event: Event) {
    const eventUrl = this.shopsUrl + '/' + event.shopId + '/' + this.eventsPath;
    this.http.post<Event>(eventUrl, event, this.httpOptions).subscribe(() => this.getShopEventsFromUrl(event.shopId+''));
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

  getPromotion(shopId:string,eventId: string,promoId: string) {
    const urlWithId = this.shopsUrl + '/' + shopId +'/'+ this.eventsPath + '/'+ eventId + '/'+this.promosPath +'/'+promoId ;
    this.http.get<Promotion>(urlWithId).subscribe((promo) => {
      this.promotion$.next(promo);
    });
  }

  addPromotion(shopId:string,eventId: string,promo: Promotion) {
    const url = this.shopsUrl + '/' + shopId + this.eventsPath + '/'+ eventId + '/'+this.promosPath ;
    this.http.post<Promotion>(url,promo, this.httpOptions).subscribe(() => this.getEventFromUrl(shopId,eventId));
  }

  updatePromotion(shopId:string, eventId: string, promo: Promotion) {
    const url = this.shopsUrl + '/' + shopId + this.eventsPath + '/'+ eventId + '/'+this.promosPath +'/'+ promo.id ;
    this.http.put<Promotion>(url,promo, this.httpOptions).subscribe(() => this.getEventFromUrl(shopId,eventId));
  }

  //............................................... Notifications ..............................................

  getNotifications(shopId:string, eventId: string) {
    const url = this.shopsUrl + '/' + shopId + '/'+this.eventsPath + '/'+ eventId + '/'+this.notifsPath ;
    this.http.get<Notification[]>(url).subscribe((notifs) => {
      this.notifications=notifs;
      this.notifications$.next(notifs);
    });
  }

  getNotification(shopId:string, eventId: string, notifId: string) {
    const urlWithId = this.shopsUrl + '/' + shopId + '/'+this.eventsPath + '/'+ eventId + '/'+this.notifsPath +'/'+notifId ;
    this.http.get<Notification>(urlWithId).subscribe((notif) => {
      this.notification$.next(notif);
    });
  }

  addNotification(shopId:string, eventId: string, notif: Notification) {
    const url = this.shopsUrl + '/' + shopId +'/'+ this.eventsPath + '/'+ eventId + '/'+this.notifsPath ;
    this.http.post<Notification>(url,notif).subscribe(() => this.getEventFromUrl(shopId,eventId));
  }

  updateNotification(shopId:string, eventId: string, notif: Notification) {
    const url = this.shopsUrl + '/' + shopId +'/'+ this.eventsPath + '/'+ eventId + '/'+this.notifsPath +'/'+ notif.id ;
    this.http.put<Notification>(url,notif).subscribe(() => this.getEventFromUrl(shopId,eventId));
  }
}
