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
  private currentInhabitantSubject: BehaviorSubject<Inhabitant>;
  public currentInhabitant: Observable<Inhabitant>;

  public inhabitantForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private http: HttpClient) {
    this.currentInhabitantSubject = new BehaviorSubject<Inhabitant>(JSON.parse(localStorage.getItem('currentInhabitant')));
    this.currentInhabitant = this.currentInhabitantSubject.asObservable();
    this.inhabitantForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      longitude: [],
      latitude: [],
      id: [],
    });
  }

  /*createInhabitant(inhabitantNumber: number) {
    let inhabitant = this.inhabitantForm.getRawValue() as Inhabitant;
    inhabitant.id = inhabitantNumber;
    this.http.post<Inhabitant>( this.Url + 'inhabitants', inhabitant).subscribe(
      (res) => inhabitant.id  = res.id,
      (err) => console.log(err)
    );
  }*/

  // getInhabitant(inhabitantNumber: number){
  //   this.http.get<Inhabitant>(this.Url + 'inhabitants/' + inhabitantNumber).subscribe((object) => {
  //     this.currentInhabitant = object;
  //   });
  // }


  public get currentInhabitantValue(): Inhabitant {
    return this.currentInhabitantSubject.value;
  }

  authenticateInhabitant(inhabitantNumber: number){
    return this.http.post<any>('http://localhost:9428/api/inhabitants/authenticate', { "id": inhabitantNumber })
      .pipe(map(inhabitant => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentInhabitant', JSON.stringify(inhabitant));
        this.currentInhabitantSubject.next(inhabitant);
        return inhabitant;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentInhabitant');
    this.currentInhabitantSubject.next(null);
  }

}
