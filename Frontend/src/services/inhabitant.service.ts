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
      inhabitantId: [],
      id: [],
      firstName: [''],
      lastName: [''],
      longitude: [],
      latitude: [],
    });
  }

  createInhabitant(inhabitantNumber: number) {
    let inhabitant = this.inhabitantForm.getRawValue() as Inhabitant;
    inhabitant.inhabitantId = inhabitantNumber;
    this.http.post<Inhabitant>( this.Url + 'inhabitants', inhabitant).subscribe(
      (res) => inhabitant.inhabitantId  = res.inhabitantId,
      (err) => console.log(err)
    );
  }

  getInhabitant(inhabitantNumber: number){
    this.http.get<Inhabitant>(this.Url + 'inhabitants/' + inhabitantNumber).subscribe((object) => {
      this.currentInhabitant = object;
    });
  }

}
