import { Injectable } from '@angular/core';
import {Inhabitant} from '../models/inhabitant.model';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class InhabitantService {

  public Url =  'http://localhost:9428/api/';

  public currentInhabitant: Inhabitant;

  public number: number;

  public inhabitantForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private http: HttpClient) {
    this.inhabitantForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      longitude: [],
      latitude: [],
      id: [],
    });
  }

  createInhabitant(inhabitantNumber: number) {
    let inhabitant = this.inhabitantForm.getRawValue() as Inhabitant;
    inhabitant.inhabitantId = inhabitantNumber;
    this.http.post<Inhabitant>( this.Url + 'inhabitants', inhabitant).subscribe(
      (res) => inhabitant.id  = res.id,
      (err) => console.log(err)
    );
  }

  getInhabitant(inhabitantNumber: number){
    this.http.get<Inhabitant>(this.Url + 'inhabitants/' + inhabitantNumber).subscribe((object) => {
      this.currentInhabitant = object;
    });
  }

}
