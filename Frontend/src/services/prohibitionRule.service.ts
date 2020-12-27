import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import  {ProhibitionRule} from "../models/prohibitionRule.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: `root`
})
export class ProhibitionRuleService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list .
   */
  private rules : ProhibitionRule[];
  /**
   * Observables.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public rules$: BehaviorSubject<ProhibitionRule[]>;

  public rule$: Subject<ProhibitionRule> = new Subject();

  private rulesPath = serverUrl + "/prohibitionRules";

  private httpOptions = httpOptionsBase;

  //Code source de la regle créée par l'employé de mairie
 // public static generatedCode: string = ''

  constructor(private http: HttpClient) {
    this.rules$ = new BehaviorSubject(this.rules);
    this.getProhibitionRulesFromUrl()
  }

  getProhibitionRulesFromUrl() {
    this.http.get<ProhibitionRule[]>(this.rulesPath).subscribe((prohibitionRules) => {
      this.rules = prohibitionRules;
      this.rules$.next(this.rules);
    });
  }

  getProhibitionRuleFromUrl(prohibitionRuleId: string) {
    const urlWithId = this.rulesPath + '/' + prohibitionRuleId ;
    this.http.get<ProhibitionRule>(urlWithId).subscribe((rule) => {
      this.rule$.next(rule);
    });
  }

  addProhibitionRule(rule: ProhibitionRule) {
    const currentEmployee = JSON.parse(localStorage.getItem('currentEmployee'));
    rule.employeeId = currentEmployee.id;
    return this.http.post<ProhibitionRule>(this.rulesPath, rule, this.httpOptions)
      .pipe(map(ruleCreated => {
        this.getProhibitionRulesFromUrl();
        return ruleCreated;
      }));
  }

  deleteRule(rule: ProhibitionRule) {
    const ruleUrl = this.rulesPath + '/' + rule.id;
    this.http.delete<ProhibitionRule>(ruleUrl, this.httpOptions).subscribe(() => this.getProhibitionRulesFromUrl());
  }

  updateRule(rule: ProhibitionRule) {
    const ruleUrl = this.rulesPath + '/' + rule.id;
    this.http.put<ProhibitionRule>(ruleUrl, rule, this.httpOptions).subscribe(() => this.getProhibitionRulesFromUrl());
  }

}
