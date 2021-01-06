import {Injectable} from '@angular/core';
import {Inhabitant} from '../models/inhabitant.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from "rxjs";
import {Shop} from "../models/shop.model";

@Injectable({
  providedIn: 'root'
})

export class InhabitantService {

  public currentInhabitant: Inhabitant;
  public inhabitant$: BehaviorSubject<Inhabitant>;
  public currentInhabitant$: BehaviorSubject<Inhabitant>;


  /*public inhabitants: Inhabitant[];
  public inhabitants$: BehaviorSubject<Inhabitant[]>;*/

  private inhabitants: Inhabitant[]=[];
  public inhabitants$: BehaviorSubject<Inhabitant[]> = new BehaviorSubject(this.inhabitants);


  constructor(private http: HttpClient) {
    //this.currentInhabitant = JSON.parse(localStorage.getItem('currentInhabitant'));
    this.inhabitant$ = new BehaviorSubject<Inhabitant>(this.currentInhabitant);
    this.currentInhabitant$= new BehaviorSubject<Inhabitant>(this.currentInhabitant);

  }

  authenticateInhabitant(inhabitantNumber: number){
    return this.http.post<any>('http://localhost:9428/api/inhabitants/authenticate', { "id": inhabitantNumber })
      .pipe(map(inhabitant => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentInhabitant', JSON.stringify(inhabitant));
        this.currentInhabitant = inhabitant;
        this.inhabitant$.next(this.currentInhabitant);
        this.currentInhabitant$.next(this.currentInhabitant);
        return inhabitant;
      }));
  }

  isShopAlreadyRatedByInhabitantNumber(shopNumber: number){
    if (this.currentInhabitant.shopRated == undefined) {
      this.currentInhabitant.shopRated = [];
      return false;
    }
    const constante = this.currentInhabitant.shopRated.indexOf(shopNumber);
    return (constante != -1);
  }

  getAllInhabitants(){
    return this.http.get<any>('http://localhost:9428/api/inhabitants').pipe(map((inhabitantList => {
      return inhabitantList;
    })));
  }

  updateInhabitantRating(array: any[]){
    this.http.put<Inhabitant>('http://localhost:9428/api/inhabitants/' + this.currentInhabitant.id, {shopRated: array })
      .subscribe();
  }

  updateInhabitant(inhabitant: Inhabitant){
    this.http.put<Inhabitant>('http://localhost:9428/api/inhabitants/'+inhabitant.id, inhabitant).subscribe(inhab =>{
      this.currentInhabitant=inhab;
      this.currentInhabitant$.next(this.currentInhabitant)
    });
  }


  changeLocation(longitude: string, latitude: string) {
    this.http.put<Inhabitant>('http://localhost:9428/api/inhabitants/' + this.currentInhabitant.id, {longitude: longitude, latitude: latitude })
      .subscribe(
        (res) => {
          this.addPosition(res, longitude, latitude);
          this.currentInhabitant = res;
          localStorage.setItem('currentInhabitant', JSON.stringify(this.currentInhabitant));
          this.inhabitant$.next(this.currentInhabitant);
        },
      );
  }

  addPosition(inhabitant: Inhabitant,longitude: string, latitude: string){
    if (inhabitant.positions == undefined){
      inhabitant.positions = [];
    }
    const array = [];
    array.push(Number(longitude));
    array.push(Number(latitude));
    inhabitant.positions.push(array);
    this.updateInhabitantPositions(inhabitant.positions);
  }

  updateInhabitantPositions(array: any[]){
    this.http.put<Inhabitant>('http://localhost:9428/api/inhabitants/' + this.currentInhabitant.id, {positions: array })
      .subscribe();
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentInhabitant');
    this.inhabitant$.next(null);
  }

  getInhabitantsCloseTo(shop : Shop) {
    return this.http.get<any>('http://localhost:9428/api/inhabitants').pipe(map((inhabitantList => {
      return inhabitantList.filter((inhabitant) => inhabitant.longitude === shop.longitude && inhabitant.latitude === shop.latitude);
    })));
  }

  getInhabitantsFromUrl() {
    const url = 'http://localhost:9428/api/inhabitants' ;
    this.http.get<Inhabitant[]>(url).subscribe((IList) => {
      this.inhabitants= IList;
      this.inhabitants$.next(this.inhabitants);
    });
  }
}
