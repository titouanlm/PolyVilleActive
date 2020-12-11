import { Injectable } from '@angular/core';
import {Inhabitant} from '../models/inhabitant.model';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from "@angular/forms";
import { map } from 'rxjs/operators';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class InhabitantService {

  public Url =  'http://localhost:9428/api/';

  public inhabitantForm: FormGroup;
  public currentInhabitant: Inhabitant;
  public inhabitant$: BehaviorSubject<Inhabitant> ;

  constructor(public formBuilder: FormBuilder, private http: HttpClient) {
    this.currentInhabitant = JSON.parse(localStorage.getItem('currentInhabitant'));
    this.inhabitant$ = new BehaviorSubject<Inhabitant>(this.currentInhabitant);
    this.inhabitantForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      longitude: [],
      latitude: [],
      id: [],
    });
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

}
