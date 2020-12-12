import { Injectable } from '@angular/core';
import {Inhabitant} from '../models/inhabitant.model';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from "@angular/forms";
import { map } from 'rxjs/operators';
import {BehaviorSubject, Observable} from "rxjs";
import {Shop} from "../models/shop.model";

@Injectable({
  providedIn: 'root'
})

export class InhabitantService {

  public currentInhabitant: Inhabitant;
  public inhabitant$: BehaviorSubject<Inhabitant> ;

  constructor(private http: HttpClient) {
    this.currentInhabitant = JSON.parse(localStorage.getItem('currentInhabitant'));
    this.inhabitant$ = new BehaviorSubject<Inhabitant>(this.currentInhabitant);
  }

  authenticateInhabitant(inhabitantNumber: number){
    return this.http.post<any>('http://localhost:9428/api/inhabitants/authenticate', { "id": inhabitantNumber })
      .pipe(map(inhabitant => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentInhabitant', JSON.stringify(inhabitant));
        this.currentInhabitant = inhabitant;
        this.inhabitant$.next(this.currentInhabitant);
        return inhabitant;
      }));
  }

  getShopIfRatedByAnInhabitant(shopNumber: number){
    if (this.currentInhabitant.shopRated == undefined) {
      this.currentInhabitant.shopRated = [];
      return undefined;
    }
    return this.currentInhabitant.shopRated.find(element => element = shopNumber);
  }


  changeLocation(longitude: string, latitude: string) {
    this.http.put<Inhabitant>('http://localhost:9428/api/inhabitants/' + this.currentInhabitant.id, {longitude: longitude, latitude: latitude })
      .subscribe(
        (res) => {
          this.currentInhabitant = res;
          localStorage.setItem('currentInhabitant', JSON.stringify(this.currentInhabitant));
          this.inhabitant$.next(this.currentInhabitant);
        },
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentInhabitant');
    this.inhabitant$.next(null);
  }

  getInhabitantsCloseTo(shop : Shop) {
    return this.http.get<any>('http://localhost:9428/api/inhabitants').pipe(map((inhabitantList => {
      let test = inhabitantList.filter((inhabitant) => inhabitant.longitude === shop.longitude && inhabitant.latitude === shop.latitude)
      console.log(test);
      return test;
    })));
  }
}
