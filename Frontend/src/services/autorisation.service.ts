import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Shop} from '../models/shop.model';
import  {Autorisation} from "../models/autorisation.model";
import {Inhabitant} from "../models/inhabitant.model";

@Injectable({
  providedIn: `root`
})
export class AutorisationService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list .
   */
  private autorisations: Autorisation[]=[];


  /**
   * Observables.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public autorisations$: BehaviorSubject<Autorisation[]> = new BehaviorSubject(this.autorisations);

  public autorisation$: Subject<Autorisation> = new Subject();


  private inhabitantsUrl = serverUrl + '/inhabitants';
  private autorisationsPath = 'autorisations';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
  }

  //............................................... Niches ..............................................


  getInhabitantAutorisationFromUrl(inhabitantId: number) {
    const url = this.inhabitantsUrl + '/' + inhabitantId + '/'+this.autorisationsPath ;
    this.http.get<Autorisation[]>(url).subscribe((AutorisationsList) => {
      this.autorisations= AutorisationsList;
      this.autorisations$.next(this.autorisations);
    });
  }

  getAutorisationFromUrl(autorisationId:number,inhabitantId: number) {
    const urlWithId = this.inhabitantsUrl + '/' + inhabitantId + '/'+ this.autorisationsPath + '/'+ autorisationId;
    this.http.get<Autorisation>(urlWithId).subscribe((autorisation) => {
      this.autorisation$.next(autorisation);
    });
  }

  addAutorisation(autorisation: Autorisation) {
    const autorisationUrl = this.inhabitantsUrl + '/' + autorisation.inhabitantId + '/' + this.autorisationsPath;
    this.http.post<Autorisation>(autorisationUrl, autorisation, this.httpOptions).subscribe(() => this.getInhabitantAutorisationFromUrl(autorisation.inhabitantId));
  }

  deleteAutorisation(autorisation: Autorisation) {
    const autorisationUrl = this.inhabitantsUrl + '/' + autorisation.inhabitantId + '/' + this.autorisationsPath +'/'+autorisation.id;
    this.http.delete<Autorisation>(autorisationUrl, this.httpOptions).subscribe(() => this.getInhabitantAutorisationFromUrl(autorisation.inhabitantId));
  }

  updateAutorisation(inhabitant: Inhabitant, autorisation: Autorisation) {
    const autorisationUrl = this.inhabitantsUrl + '/' + autorisation.inhabitantId + '/' + this.autorisationsPath +'/'+autorisation.id;
    this.http.put<Autorisation>(autorisationUrl, autorisation, this.httpOptions).subscribe(() => this.getInhabitantAutorisationFromUrl(autorisation.inhabitantId));
  }

}
