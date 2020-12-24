import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import  {ValidationRule} from "../models/validationRule.model";
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
  private employees : TownHallEmployee[];
  private rules : ValidationRule[];

  /**
   * Observables.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public employees$: BehaviorSubject<TownHallEmployee[]>;
  public rules$: BehaviorSubject<ValidationRule[]>;
  public employee: TownHallEmployee

  public employee$: Subject<TownHallEmployee> = new Subject();
  public rule$: Subject<ValidationRule> = new Subject();

  private employeesUrl = serverUrl + '/townHallEmployees';
  private rulePath = 'validationRules';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.employees$ = new BehaviorSubject(this.employees);
    this.rules$ = new BehaviorSubject(this.rules);
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


  getValidationRules(empId:string) {
    const url = this.employeesUrl + '/' +empId+ '/' +this.rulePath;
    this.http.get<ValidationRule[]>(url).subscribe((rules) => {
      this.rules=rules;
      this.rules$.next(rules);
    });
  }

  getCulturalEvent(empId:string,ruleId: string) {
    const url = this.employeesUrl + '/' +empId+ '/' +this.rulePath+'/'+ruleId;
    this.http.get<ValidationRule>(url).subscribe((rule) => {
      this.rule$.next(rule);
    });
  }

 /* addCulturalEvent(actorId:string,event: CulturalEvent) {
    const url = this.cActorsUrl + '/' +actorId+ '/' +this.cEventsPath;
    this.http.post<CulturalEvent>(url,event, this.httpOptions).subscribe(() => this.getCulturalEvents(actorId));
  }

  updateCulturalEvent(actorId:string,event: CulturalEvent) {
    const url = this.cActorsUrl + '/' +actorId+ '/' +this.cEventsPath;
    this.http.put<CulturalEvent>(url,event, this.httpOptions).subscribe(() => this.getCulturalEvents(actorId));
  }*/

}
