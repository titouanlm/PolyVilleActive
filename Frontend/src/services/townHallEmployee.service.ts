import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import  {TownHallEmployee} from "../models/townHallEmployee.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: `root`
})
export class TownHallEmployeeService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list .
   */
  public employees : TownHallEmployee[];

  /**
   * Observables.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public employees$: BehaviorSubject<TownHallEmployee[]>;
  public employee: TownHallEmployee

  public employee$: Subject<TownHallEmployee> = new Subject();

  private employeesUrl = serverUrl + '/townHallEmployees';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.employees$ = new BehaviorSubject(this.employees);
    this.getTownHallEmployeesFromUrl();
  }

  //............................................... Town hall employee ..............................................


  getTownHallEmployeesFromUrl() {
    this.http.get<TownHallEmployee[]>(this.employeesUrl).subscribe((List) => {
      this.employees = List;
      this.employees$.next(this.employees);
    });
  }

  getTownHallEmployeeFromUrl(employeeId: string) {
    const urlWithId = this.employeesUrl + '/' +employeeId ;
    this.http.get<TownHallEmployee>(urlWithId).subscribe((emp) => {
      this.employee$.next(emp);
    });
  }

  addEvent(empl: TownHallEmployee) {
    this.http.post<TownHallEmployee>(this.employeesUrl, empl, this.httpOptions).subscribe(() => this.getTownHallEmployeesFromUrl());
  }


  authenticateEmployee(employeeId: number){
    return this.http.post<any>('http://localhost:9428/api/townHallEmployees/authenticate', { "id": employeeId })
      .pipe(map(employee => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentEmployee', JSON.stringify(employee));
        this.employee = employee;
        this.employee$.next(this.employee);
        return employee;
      }));
  }

  logout() {
    localStorage.removeItem('currentEmployee');
    this.employee$.next(null);
  }

/*
  deleteEvent(actor: CulturalActor) {
    const eventUrl = this.cActorsUrl + '/' + actor.id;
    this.http.delete<CulturalActor>(eventUrl, this.httpOptions).subscribe(() => this.getCulturalActorsFromUrl());
  }

  updateEvent(actor: CulturalActor) {
    const eventUrl = this.cActorsUrl + '/' + actor.id;
    this.http.put<CulturalActor>(eventUrl, actor, this.httpOptions).subscribe(() => this.getCulturalActorsFromUrl());
  }*/

  //............................................... Validation Rule ..............................................


 /* addCulturalEvent(actorId:string,event: CulturalEvent) {
    const url = this.cActorsUrl + '/' +actorId+ '/' +this.cEventsPath;
    this.http.post<CulturalEvent>(url,event, this.httpOptions).subscribe(() => this.getCulturalEvents(actorId));
  }

  updateCulturalEvent(actorId:string,event: CulturalEvent) {
    const url = this.cActorsUrl + '/' +actorId+ '/' +this.cEventsPath;
    this.http.put<CulturalEvent>(url,event, this.httpOptions).subscribe(() => this.getCulturalEvents(actorId));
  }*/

}
