import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import  {CulturalActor} from "../models/CulturalActor.model";
import  {CulturalEvent} from "../models/event.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: `root`
})
export class CulturalActorService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list .
   */
  private cactors : CulturalActor[];
  private cevents : CulturalEvent[];

  /**
   * Observables.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public cactors$: BehaviorSubject<CulturalActor[]>;
  public cevents$: BehaviorSubject<CulturalEvent[]>;

  public cactor$: Subject<CulturalActor> = new Subject();
  public cevent$: Subject<CulturalEvent> = new Subject();

  public cactor: CulturalActor

  private cActorsUrl = serverUrl + '/culturalActors';
  private cEventsPath = 'culturalEvents';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.cactors$ = new BehaviorSubject(this.cactors);
    this.cevents$ = new BehaviorSubject(this.cevents);
  }

  //............................................... Cultural Actors ..............................................


  getCulturalActorsFromUrl() {
    this.http.get<CulturalActor[]>(this.cActorsUrl).subscribe((cactorList) => {
      this.cactors = cactorList;
      this.cactors$.next(this.cactors);
    });
  }

  getCulturalActorFromUrl(cactortId: string) {
    const urlWithId = this.cActorsUrl + '/' +cactortId ;
    this.http.get<CulturalActor>(urlWithId).subscribe((actor) => {
      this.cactor$.next(actor);
    });
  }

  addEvent(actor: CulturalActor) {
    this.http.post<CulturalActor>(this.cActorsUrl, actor, this.httpOptions).subscribe(() => this.getCulturalActorsFromUrl());
  }

  deleteEvent(actor: CulturalActor) {
    const eventUrl = this.cActorsUrl + '/' + actor.id;
    this.http.delete<CulturalActor>(eventUrl, this.httpOptions).subscribe(() => this.getCulturalActorsFromUrl());
  }

  updateEvent(actor: CulturalActor) {
    const eventUrl = this.cActorsUrl + '/' + actor.id;
    this.http.put<CulturalActor>(eventUrl, actor, this.httpOptions).subscribe(() => this.getCulturalActorsFromUrl());
  }

  authenticateActor(actorId: number){
    return this.http.post<any>('http://localhost:9428/api/culturalActors/authenticate', { "id": actorId })
      .pipe(map(actor => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentActor', JSON.stringify(actor));
        this.cactor = actor;
        this.cactor$.next(this.cactor);
        return actor;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentActor');
    this.cactor$.next(null);
  }

  //............................................... Cultural events ..............................................


  getCulturalEvents(actorId:string) {
    const url = this.cActorsUrl + '/' +actorId+ '/' +this.cEventsPath;
    this.http.get<CulturalEvent[]>(url).subscribe((evnts) => {
      this.cevents=evnts;
      this.cevents$.next(evnts);
    });
  }

  getCulturalEvent(actorId:string,eventId: string) {
    const url = this.cActorsUrl + '/' +actorId+ '/' +this.cEventsPath+'/'+eventId;
    this.http.get<CulturalEvent>(url).subscribe((promo) => {
      this.cevent$.next(promo);
    });
  }

  addCulturalEvent(event: CulturalEvent) {
    const url = this.cActorsUrl + '/' +this.cactor.id+ '/' +this.cEventsPath;
    event.caId=this.cactor.id;
    this.http.post<CulturalEvent>(url,event, this.httpOptions).subscribe(() => this.getCulturalEvents(this.cactor.id+''));
  }

  updateCulturalEvent(actorId:string,event: CulturalEvent) {
    const url = this.cActorsUrl + '/' +actorId+ '/' +this.cEventsPath;
    this.http.put<CulturalEvent>(url,event, this.httpOptions).subscribe(() => this.getCulturalEvents(actorId));
  }

}
