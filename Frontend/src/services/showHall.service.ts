import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShowHall} from "../models/showHall.model";
import {BehaviorSubject, Subject} from "rxjs";
import {httpOptionsBase, serverUrl} from "../configs/server.config";

@Injectable({
  providedIn: 'root'
})

export class ShowHallService {

  public showHalls: ShowHall[];
  public showHallSelected: ShowHall;

  public showHalls$: BehaviorSubject<ShowHall[]>;
  public showHallSelected$: Subject<ShowHall> = new Subject();

  private showHallUrl = serverUrl + "/showHalls";
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.showHalls$ = new BehaviorSubject(this.showHalls);
    this.getShowHalls();
  }

  getShowHallById(showHallId: string) {
    const urlWithId = this.showHallUrl + '/' + showHallId;
    this.http.get<ShowHall>(urlWithId, this.httpOptions).subscribe((showHall) => {
      this.showHallSelected = showHall;
      this.showHallSelected$.next(showHall);
    });
  }

  getShowHalls(){
    this.http.get<ShowHall[]>(this.showHallUrl, this.httpOptions).subscribe((showHalls) => {
      this.showHalls = showHalls;
      this.showHalls$.next(this.showHalls);
    });
  }

  addShowHall(showHall: ShowHall) {
    this.http.post<ShowHall>(this.showHallUrl, showHall, this.httpOptions).subscribe(() => this.getShowHalls());
  }

  deleteShowHall(showHall: ShowHall) {
    const showHallToDeleteUrl = this.showHallUrl + '/' + showHall.id;
    this.http.delete<ShowHall>(showHallToDeleteUrl, this.httpOptions).subscribe(() => this.getShowHalls());
  }

  updateShowHall(showHall: ShowHall) {
    const showHallToUpdateUrl = this.showHallUrl + '/' + showHall.id;
    this.http.put<ShowHall>(showHallToUpdateUrl, showHall, this.httpOptions).subscribe(() => this.getShowHalls());
  }

}
